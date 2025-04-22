import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, ShoppingBag, Package, TrendingUp, AlertCircle } from "lucide-react"
import Link from "next/link"
import { createServerClient } from "@/lib/supabase/server"

export default async function AdminDashboard() {
  const supabase = createServerClient()

  // Buscar estatísticas (simuladas por enquanto)
  const stats = {
    totalUsers: 1245,
    activeUsers: 876,
    totalProducts: 58,
    pendingOrders: 23,
    totalRevenue: "R$ 45.678,00",
  }

  // Buscar alertas recentes
  const { data: alerts } = await supabase
    .from("system_alerts")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(5)
    .catch(() => ({ data: [] }))

  // Buscar atividades recentes
  const { data: activities } = await supabase
    .from("admin_activities")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(5)
    .catch(() => ({ data: [] }))

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard Administrativo</h1>

      {/* Cards de estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total de Usuários</CardTitle>
            <Users className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalUsers}</div>
            <p className="text-xs text-gray-500">{stats.activeUsers} ativos</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Produtos</CardTitle>
            <Package className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalProducts}</div>
            <p className="text-xs text-gray-500">Cadastrados no sistema</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Pedidos Pendentes</CardTitle>
            <ShoppingBag className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pendingOrders}</div>
            <p className="text-xs text-gray-500">Aguardando processamento</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Receita Total</CardTitle>
            <TrendingUp className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalRevenue}</div>
            <p className="text-xs text-gray-500">Último mês</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Alertas do Sistema */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-medium">Alertas do Sistema</CardTitle>
          </CardHeader>
          <CardContent>
            {alerts && alerts.length > 0 ? (
              <div className="space-y-4">
                {alerts.map((alert: any) => (
                  <div key={alert.id} className="flex items-start gap-3 pb-3 border-b">
                    <div
                      className={`p-2 rounded-full ${alert.severity === "high" ? "bg-red-100" : alert.severity === "medium" ? "bg-yellow-100" : "bg-blue-100"}`}
                    >
                      <AlertCircle
                        className={`h-4 w-4 ${alert.severity === "high" ? "text-red-500" : alert.severity === "medium" ? "text-yellow-500" : "text-blue-500"}`}
                      />
                    </div>
                    <div>
                      <h4 className="font-medium">{alert.title}</h4>
                      <p className="text-sm text-gray-500">{alert.message}</p>
                      <p className="text-xs text-gray-400 mt-1">
                        {new Date(alert.created_at).toLocaleDateString("pt-BR", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6 text-gray-500">
                <p>Nenhum alerta recente</p>
              </div>
            )}
            <div className="mt-4 text-right">
              <Link href="/parceiro/admin/notificacoes" className="text-sm text-[#1a237e] hover:underline">
                Ver todos os alertas
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Atividades Recentes */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-medium">Atividades Recentes</CardTitle>
          </CardHeader>
          <CardContent>
            {activities && activities.length > 0 ? (
              <div className="space-y-4">
                {activities.map((activity: any) => (
                  <div key={activity.id} className="flex items-start gap-3 pb-3 border-b">
                    <div className="p-2 rounded-full bg-gray-100">
                      <Users className="h-4 w-4 text-gray-500" />
                    </div>
                    <div>
                      <h4 className="font-medium">{activity.action}</h4>
                      <p className="text-sm text-gray-500">{activity.description}</p>
                      <p className="text-xs text-gray-400 mt-1">
                        {new Date(activity.created_at).toLocaleDateString("pt-BR", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6 text-gray-500">
                <p>Nenhuma atividade recente</p>
              </div>
            )}
            <div className="mt-4 text-right">
              <Link href="/parceiro/admin/logs" className="text-sm text-[#1a237e] hover:underline">
                Ver todas as atividades
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
