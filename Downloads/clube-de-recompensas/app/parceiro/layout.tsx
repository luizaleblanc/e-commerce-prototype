import type { ReactNode } from "react"
import NextImage from "next/image"
import Link from "next/link"
import { Home, History, Gift, Settings } from "lucide-react"
import { createServerClient } from "@/lib/supabase/server"

export default async function PartnerLayout({ children }: { children: ReactNode }) {
  const supabase = createServerClient()
  const {
    data: { session },
  } = await supabase.auth.getSession()

  // Verificar se o usuário é um parceiro
  let isPartner = false

  if (session?.user?.id) {
    try {
      const { data: profile } = await supabase
        .from("profiles")
        .select("user_role") // Usando user_role em vez de role
        .eq("id", session.user.id)
        .single()
        .catch(() => ({ data: null }))

      isPartner = profile?.user_role === "partner"
    } catch (error) {
      console.error("Erro ao verificar perfil do usuário:", error)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-[#1a237e] text-white py-3 px-6 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Link href="/parceiro/recompensas">
            <NextImage src="/coin-logo.png" alt="Logo Clube de Recompensas" width={50} height={50} />
          </Link>
          <NextImage src="/clube-text.png" alt="Clube de Recompensas" width={150} height={45} className="mt-1" />
        </div>
        <div className="flex items-center gap-4">
          <Link href="/parceiro" className="text-white hover:text-gray-200 transition-colors">
            ÁREA DO PARCEIRO
          </Link>
          <div className="flex items-center gap-2 bg-white text-[#1a237e] rounded-full py-1 px-3">
            <div className="bg-[#1a237e] rounded-full p-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </div>
            <span className="text-xs">
              Faça seu
              <br />
              Login ou Cadastro
            </span>
          </div>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar - Agora em branco */}
        <aside className="w-[170px] bg-white border-r border-gray-200 flex-shrink-0">
          <nav className="py-6">
            <ul className="space-y-2">
              <li>
                <Link
                  href="/parceiro/recompensas"
                  className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-[#7b1fa2] hover:text-white transition-colors"
                >
                  <Home size={18} />
                  <span>Início</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/parceiro/historico"
                  className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-[#7b1fa2] hover:text-white transition-colors"
                >
                  <History size={18} />
                  <span>Histórico</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/parceiro/recompensas"
                  className="flex items-center gap-2 px-4 py-2 bg-[#7b1fa2] text-white hover:bg-[#6a1b9a] transition-colors"
                >
                  <Gift size={18} />
                  <span>Recompensas</span>
                </Link>
              </li>

              {/* Link para área administrativa apenas para parceiros */}
              {isPartner && (
                <li>
                  <Link
                    href="/parceiro/admin"
                    className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-[#7b1fa2] hover:text-white transition-colors"
                  >
                    <Settings size={18} />
                    <span>Administração</span>
                  </Link>
                </li>
              )}
            </ul>
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 bg-white">{children}</main>
      </div>
    </div>
  )
}
