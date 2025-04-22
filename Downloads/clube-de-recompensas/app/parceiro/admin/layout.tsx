import type { ReactNode } from "react"
import Link from "next/link"
import { redirect } from "next/navigation"
import {
  LayoutDashboard,
  Package,
  Users,
  BarChart,
  Settings,
  ShoppingBag,
  FileText,
  Bell,
  Database,
} from "lucide-react"
import { createServerClient } from "@/lib/supabase/server"

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const supabase = createServerClient()
  const {
    data: { session },
  } = await supabase.auth.getSession()

  // Verificar se o usuário está autenticado
  if (!session) {
    redirect("/login")
  }

  // Verificar se o usuário é um administrador
  let isPartner = false

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

  // Se não for parceiro, redirecionar para a área de usuário
  if (!isPartner) {
    redirect("/ilb/dashboard")
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md">
        <div className="p-4 border-b">
          <h2 className="text-xl font-bold text-[#1a237e]">Área Administrativa</h2>
        </div>
        <nav className="p-2">
          <ul className="space-y-1">
            <li>
              <Link
                href="/parceiro/admin"
                className="flex items-center gap-3 px-4 py-2 text-gray-700 rounded-md hover:bg-gray-100"
              >
                <LayoutDashboard size={18} />
                <span>Dashboard</span>
              </Link>
            </li>
            <li>
              <Link
                href="/parceiro/admin/produtos"
                className="flex items-center gap-3 px-4 py-2 text-gray-700 rounded-md hover:bg-gray-100"
              >
                <Package size={18} />
                <span>Produtos</span>
              </Link>
            </li>
            <li>
              <Link
                href="/parceiro/admin/usuarios"
                className="flex items-center gap-3 px-4 py-2 text-gray-700 rounded-md hover:bg-gray-100"
              >
                <Users size={18} />
                <span>Usuários</span>
              </Link>
            </li>
            <li>
              <Link
                href="/parceiro/admin/pedidos"
                className="flex items-center gap-3 px-4 py-2 text-gray-700 rounded-md hover:bg-gray-100"
              >
                <ShoppingBag size={18} />
                <span>Pedidos</span>
              </Link>
            </li>
            <li>
              <Link
                href="/parceiro/admin/relatorios"
                className="flex items-center gap-3 px-4 py-2 text-gray-700 rounded-md hover:bg-gray-100"
              >
                <BarChart size={18} />
                <span>Relatórios</span>
              </Link>
            </li>
            <li>
              <Link
                href="/parceiro/admin/notificacoes"
                className="flex items-center gap-3 px-4 py-2 text-gray-700 rounded-md hover:bg-gray-100"
              >
                <Bell size={18} />
                <span>Notificações</span>
              </Link>
            </li>
            <li>
              <Link
                href="/parceiro/admin/logs"
                className="flex items-center gap-3 px-4 py-2 text-gray-700 rounded-md hover:bg-gray-100"
              >
                <FileText size={18} />
                <span>Logs do Sistema</span>
              </Link>
            </li>
            <li>
              <Link
                href="/parceiro/admin/configuracoes"
                className="flex items-center gap-3 px-4 py-2 text-gray-700 rounded-md hover:bg-gray-100"
              >
                <Settings size={18} />
                <span>Configurações</span>
              </Link>
            </li>
            <li>
              <Link
                href="/parceiro/admin/integracao"
                className="flex items-center gap-3 px-4 py-2 text-gray-700 rounded-md hover:bg-gray-100"
              >
                <Database size={18} />
                <span>Integração</span>
              </Link>
            </li>
          </ul>
        </nav>
        <div className="absolute bottom-0 w-64 p-4 border-t">
          <Link
            href="/parceiro/recompensas"
            className="flex items-center justify-center w-full px-4 py-2 text-sm text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
          >
            Voltar para Área do Parceiro
          </Link>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto">
        <div className="p-6">{children}</div>
      </main>
    </div>
  )
}
