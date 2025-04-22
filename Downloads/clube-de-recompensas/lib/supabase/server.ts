import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"

// Criando um cliente Supabase para componentes do lado do servidor
export const createServerClient = () => {
  return createServerComponentClient({ cookies })
}
