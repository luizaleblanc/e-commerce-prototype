import { NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase/server"

export async function POST(request: Request) {
  try {
    const supabase = createServerClient()
    const { email } = await request.json()

    if (email !== "luiza.fq@gmail.com") {
      return NextResponse.json({ error: "Usuário não autorizado" }, { status: 403 })
    }

    // Verificar se o usuário já existe
    const { data: existingUser } = await supabase.auth.admin.getUserByEmail(email)

    if (!existingUser) {
      // Criar o usuário se não existir
      const { data: newUser, error: createError } = await supabase.auth.admin.createUser({
        email: "luiza.fq@gmail.com",
        password: "senha123",
        email_confirm: true,
      })

      if (createError) {
        return NextResponse.json({ error: createError.message }, { status: 500 })
      }

      // Criar perfil para o usuário - usando user_role em vez de role
      if (newUser?.user) {
        await supabase.from("profiles").insert({
          id: newUser.user.id,
          email: "luiza.fq@gmail.com",
          name: "Luiza",
          user_role: "user",
          created_at: new Date().toISOString(),
        })
      }

      return NextResponse.json({ success: true, message: "Usuário criado com sucesso" })
    }

    return NextResponse.json({ success: true, message: "Usuário já existe" })
  } catch (error) {
    console.error("Erro ao criar usuário especial:", error)
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}
