import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

// Criando um cliente Supabase para componentes do lado do cliente
export const createClient = () => {
  return createClientComponentClient()
}

// Usando o padrão singleton para evitar múltiplas instâncias
let client: ReturnType<typeof createClient> | null = null

export const getSupabaseClient = () => {
  if (!client) {
    client = createClient()
  }
  return client
}
