import { createClient } from "@supabase/supabase-js"

// Função para verificar e corrigir problemas com o registro
export async function checkAndFixRegistrationIssues() {
  // Inicializar o cliente Supabase com as credenciais de serviço
  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL || "", process.env.SUPABASE_SERVICE_ROLE_KEY || "")

  const issues = {
    profilesTableMissing: false,
    userRoleColumnMissing: false,
    triggersMissing: false,
    functionsMissing: false,
  }

  const fixes = {
    profilesTableCreated: false,
    userRoleColumnAdded: false,
    triggersCreated: false,
    functionsCreated: false,
  }

  try {
    // 1. Verificar se a tabela profiles existe
    try {
      await supabase.from("profiles").select("id").limit(1)
    } catch (error) {
      issues.profilesTableMissing = true

      // Criar tabela profiles
      await supabase.rpc("execute_sql", {
        sql_query: `
          CREATE TABLE IF NOT EXISTS profiles (
            id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
            email TEXT,
            name TEXT,
            user_role TEXT DEFAULT 'user',
            created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
            updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
          );
        `,
      })

      fixes.profilesTableCreated = true
    }

    // 2. Verificar se a coluna user_role existe
    const { error: columnError } = await supabase.rpc("execute_sql", {
      sql_query: `
        DO $$
        DECLARE
          column_exists BOOLEAN;
        BEGIN
          SELECT EXISTS (
            SELECT 1 FROM information_schema.columns 
            WHERE table_name = 'profiles' AND column_name = 'user_role'
          ) INTO column_exists;
          
          IF NOT column_exists THEN
            ALTER TABLE profiles ADD COLUMN user_role TEXT DEFAULT 'user';
            RAISE NOTICE 'Column user_role added';
          ELSE
            RAISE NOTICE 'Column user_role already exists';
          END IF;
        END $$;
      `,
    })

    if (columnError) {
      issues.userRoleColumnMissing = true
    } else {
      fixes.userRoleColumnAdded = true
    }

    // 3. Verificar e criar triggers
    const { error: triggerError } = await supabase.rpc("execute_sql", {
      sql_query: `
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
      `,
    })

    if (triggerError) {
      issues.triggersMissing = true
    } else {
      fixes.triggersCreated = true
    }

    return {
      success: true,
      issues,
      fixes,
    }
  } catch (error) {
    console.error("Erro ao verificar e corrigir problemas de registro:", error)
    return {
      success: false,
      error: error.message,
      issues,
      fixes,
    }
  }
}
