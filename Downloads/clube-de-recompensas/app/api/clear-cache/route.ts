import { NextResponse } from "next/server"
import { revalidatePath, revalidateTag } from "next/cache"

export async function POST() {
  try {
    // Revalidar todas as rotas principais
    revalidatePath("/", "layout")
    revalidatePath("/login")
    revalidatePath("/parceiro/recompensas")
    revalidatePath("/ilb/dashboard")

    // Revalidar tags comuns
    revalidateTag("user-data")
    revalidateTag("rewards")
    revalidateTag("profiles")

    return NextResponse.json({ success: true, message: "Cache limpo com sucesso" })
  } catch (error) {
    console.error("Erro ao limpar cache:", error)
    return NextResponse.json({ success: false, error: "Falha ao limpar cache" }, { status: 500 })
  }
}
