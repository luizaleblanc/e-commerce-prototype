import { createClient } from "@supabase/supabase-js"

// Esta função pode ser executada manualmente para corrigir perfis de usuários
export async function fixUserProfiles() {
  // Inicializar o cliente Supabase com as credenciais de serviço
  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL || "", process.env.SUPABASE_SERVICE_ROLE_KEY || "")

  try {
    // Buscar todos os usuários autenticados
    const { data: authUsers, error: authError } = await supabase.auth.admin.listUsers()

    if (authError) {
      console.error("Erro ao buscar usuários autenticados:", authError)
      return { success: false, error: authError }
    }

    // Para cada usuário autenticado, verificar se existe um perfil
    for (const user of authUsers.users) {
      // Verificar se o perfil existe
      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("id")
        .eq("id", user.id)
        .single()

      if (profileError && profileError.code === "PGRST116") {
        // Código para "não encontrado"
        // Criar perfil para o usuário
        const { error: insertError } = await supabase.from("profiles").insert({
          id: user.id,
          email: user.email,
          user_role: "user", // Usando user_role em vez de role
          created_at: new Date().toISOString(),
        })

        if (insertError) {
          console.error(`Erro ao criar perfil para o usuário ${user.id}:`, insertError)
        } else {
          console.log(`Perfil criado para o usuário ${user.id}`)
        }
      }
    }

    return { success: true }
  } catch (error) {
    console.error("Erro ao corrigir perfis de usuários:", error)
    return { success: false, error }
  }
}
