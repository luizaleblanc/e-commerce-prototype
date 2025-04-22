import { NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase/server"

export async function POST() {
  try {
    const supabase = createServerClient()

    // Verificar autenticação
    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (!session) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 })
    }

    // Executar o script SQL para corrigir a estrutura do banco de dados
    await supabase
      .rpc("execute_sql", {
        sql_query: `
        -- Criar tabela de perfis se não existir
        CREATE TABLE IF NOT EXISTS profiles (
          id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
          email TEXT,
          name TEXT,
          role TEXT DEFAULT 'user',
          created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
        );

        -- Adicionar a coluna role se não existir
        DO $$
        BEGIN
          IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                        WHERE table_name = 'profiles' AND column_name = 'role') THEN
            ALTER TABLE profiles ADD COLUMN role TEXT DEFAULT 'user';
          END IF;
        END $$;
      `,
      })
      .catch((error) => {
        console.error("Erro ao executar SQL:", error)
      })

    // Buscar usuários sem perfil
    const { data: authUsers, error: authError } = await supabase.auth.admin.listUsers()

    if (authError) {
      return NextResponse.json({ error: "Erro ao buscar usuários" }, { status: 500 })
    }

    let fixedCount = 0

    // Para cada usuário, verificar e criar perfil se necessário
    for (const user of authUsers.users) {
      const { data: existingProfile } = await supabase.from("profiles").select("id").eq("id", user.id).single()

      if (!existingProfile) {
        await supabase.from("profiles").insert({
          id: user.id,
          email: user.email || "",
          role: "user",
          created_at: new Date().toISOString(),
        })

        fixedCount++
      }
    }

    return NextResponse.json({
      success: true,
      message: `${fixedCount} perfis de usuários foram corrigidos`,
    })
  } catch (error) {
    console.error("Erro ao corrigir perfis:", error)
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}
