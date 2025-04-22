import { NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase/server"
import { checkAndFixRegistrationIssues } from "@/lib/supabase/debug-helpers"

export async function GET() {
  try {
    const supabase = createServerClient()

    // Verificar se o usuário está autenticado
    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (!session) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 })
    }

    // Verificar e corrigir problemas com o registro
    const result = await checkAndFixRegistrationIssues()

    return NextResponse.json(result)
  } catch (error) {
    console.error("Erro ao verificar status do registro:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
