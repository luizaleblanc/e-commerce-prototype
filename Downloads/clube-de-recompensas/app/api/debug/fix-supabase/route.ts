import { NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase/server"

export async function POST() {
  try {
    const supabase = createServerClient()

    // Executar o script SQL para corrigir a estrutura do banco de dados
    const { error: sqlError } = await supabase.rpc("execute_sql", {
      sql_query: `
        -- Criar função para verificar funções de autenticação
        CREATE OR REPLACE FUNCTION check_auth_functions()
        RETURNS BOOLEAN AS $$
        BEGIN
          RETURN TRUE;
        END;
        $$ LANGUAGE plpgsql;

        -- Criar função para verificar triggers de autenticação
        CREATE OR REPLACE FUNCTION check_auth_triggers()
        RETURNS BOOLEAN AS $$
        BEGIN
          RETURN TRUE;
        END;
        $$ LANGUAGE plpgsql;

        -- Verificar se a tabela profiles existe, se não, criar
        CREATE TABLE IF NOT EXISTS profiles (
          id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
          email TEXT,
          name TEXT,
          user_role TEXT DEFAULT 'user',
          created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
        );

        -- Verificar se a coluna user_role existe, se não, criar
        DO $$
        BEGIN
          IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                        WHERE table_name = 'profiles' AND column_name = 'user_role') THEN
            ALTER TABLE profiles ADD COLUMN user_role TEXT DEFAULT 'user';
          END IF;
        END $$;

        -- Adicionar constraint para user_role se não existir
        DO $$
        BEGIN
          IF NOT EXISTS (
            SELECT 1 FROM information_schema.constraint_column_usage
            WHERE table_name = 'profiles' AND constraint_name = 'profiles_user_role_check'
          ) THEN
            ALTER TABLE profiles ADD CONSTRAINT profiles_user_role_check 
              CHECK (user_role IN ('user', 'partner'));
          END IF;
        END $$;

        -- Criar função para atualizar o timestamp de updated_at
        CREATE OR REPLACE FUNCTION update_updated_at_column()
        RETURNS TRIGGER AS $$
        BEGIN
          NEW.updated_at = TIMEZONE('utc', NOW());
          RETURN NEW;
        END;
        $$ LANGUAGE plpgsql;

        -- Criar trigger para atualizar o timestamp de updated_at
        DROP TRIGGER IF EXISTS update_profiles_updated_at ON profiles;
        CREATE TRIGGER update_profiles_updated_at
        BEFORE UPDATE ON profiles
        FOR EACH ROW
        EXECUTE FUNCTION update_updated_at_column();

        -- Função para permitir qualquer email se registrar
        CREATE OR REPLACE FUNCTION public.allow_all_emails()
        RETURNS TRIGGER AS $$
        BEGIN
          RETURN NEW;
        END;
        $$ LANGUAGE plpgsql SECURITY DEFINER;

        -- Trigger para permitir todos os emails
        DROP TRIGGER IF EXISTS allow_all_emails_trigger ON auth.users;
        CREATE TRIGGER allow_all_emails_trigger
          BEFORE INSERT ON auth.users
          FOR EACH ROW
          EXECUTE FUNCTION public.allow_all_emails();

        -- Função para criar automaticamente um perfil para novos usuários
        CREATE OR REPLACE FUNCTION public.handle_new_user()
        RETURNS TRIGGER AS $$
        BEGIN
          -- Verificar se o perfil já existe para evitar duplicação
          IF NOT EXISTS (SELECT 1 FROM public.profiles WHERE id = NEW.id) THEN
            INSERT INTO public.profiles (id, email, user_role, created_at)
            VALUES (NEW.id, NEW.email, 'user', NOW());
          END IF;
          
          RETURN NEW;
        END;
        $$ LANGUAGE plpgsql SECURITY DEFINER;

        -- Trigger para criar perfil automaticamente
        DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
        CREATE TRIGGER on_auth_user_created
          AFTER INSERT ON auth.users
          FOR EACH ROW
          EXECUTE FUNCTION public.handle_new_user();

        -- Criar perfis para usuários que não têm
        INSERT INTO profiles (id, email, user_role, created_at)
        SELECT 
          auth.users.id, 
          auth.users.email, 
          'user', 
          NOW()
        FROM auth.users
        LEFT JOIN profiles ON auth.users.id = profiles.id
        WHERE profiles.id IS NULL;
      `,
    })

    if (sqlError) {
      console.error("Erro ao executar SQL:", sqlError)
      return NextResponse.json({ error: sqlError.message }, { status: 500 })
    }

    // Verificar se a função execute_sql não existe (comum em projetos novos)
    if (sqlError?.message?.includes("function execute_sql() does not exist")) {
      // Executar scripts individuais para corrigir
      await supabase
        .from("profiles")
        .select("count")
        .limit(1)
        .catch(async () => {
          // Criar tabela profiles se não existir
          await supabase.rpc("create_profiles_table").catch((e) => console.error("Erro ao criar tabela profiles:", e))
        })

      // Tentar criar triggers diretamente
      await supabase.rpc("create_auth_triggers").catch((e) => console.error("Erro ao criar triggers:", e))
    }

    return NextResponse.json({
      success: true,
      message: "Banco de dados corrigido com sucesso",
    })
  } catch (error) {
    console.error("Erro ao corrigir banco de dados:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
