"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Search, Filter, Edit, Trash2, Eye, ArrowUpDown, Download, UserPlus } from "lucide-react"
import Link from "next/link"

// Dados simulados de usuários
const users = [
  {
    id: 1,
    name: "João Silva",
    email: "joao.silva@example.com",
    role: "user",
    points: 1250,
    status: "active",
    joinDate: "2023-05-15",
  },
  {
    id: 2,
    name: "Maria Oliveira",
    email: "maria.oliveira@example.com",
    role: "user",
    points: 3500,
    status: "active",
    joinDate: "2023-06-22",
  },
  {
    id: 3,
    name: "Carlos Santos",
    email: "carlos.santos@example.com",
    role: "partner",
    points: 0,
    status: "active",
    joinDate: "2023-04-10",
  },
  {
    id: 4,
    name: "Ana Pereira",
    email: "ana.pereira@example.com",
    role: "user",
    points: 750,
    status: "inactive",
    joinDate: "2023-07-05",
  },
  {
    id: 5,
    name: "Roberto Almeida",
    email: "roberto.almeida@example.com",
    role: "partner",
    points: 0,
    status: "active",
    joinDate: "2023-03-18",
  },
]

export default function UsersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedRole, setSelectedRole] = useState<string | null>(null)
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null)
  const [sortBy, setSortBy] = useState<string | null>(null)
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc")
  const [showFilters, setShowFilters] = useState(false)

  // Filtrar usuários
  const filteredUsers = users.filter((user) => {
    // Filtro de busca
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())

    // Filtro de papel
    const matchesRole = !selectedRole || user.role === selectedRole

    // Filtro de status
    const matchesStatus = !selectedStatus || user.status === selectedStatus

    return matchesSearch && matchesRole && matchesStatus
  })

  // Ordenar usuários
  const sortedUsers = [...filteredUsers].sort((a, b) => {
    if (!sortBy) return 0

    let comparison = 0
    if (sortBy === "name") {
      comparison = a.name.localeCompare(b.name)
    } else if (sortBy === "points") {
      comparison = a.points - b.points
    } else if (sortBy === "joinDate") {
      comparison = new Date(a.joinDate).getTime() - new Date(b.joinDate).getTime()
    }

    return sortOrder === "asc" ? comparison : -comparison
  })

  const handleSort = (field: string) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc")
    } else {
      setSortBy(field)
      setSortOrder("asc")
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Gerenciamento de Usuários</h1>

        <div className="flex gap-3">
          <Button variant="outline" className="flex items-center gap-2" onClick={() => setShowFilters(!showFilters)}>
            <Filter size={16} />
            Filtros
          </Button>

          <Button variant="outline" className="flex items-center gap-2">
            <Download size={16} />
            Exportar
          </Button>

          <Link href="/parceiro/admin/usuarios/novo">
            <Button className="bg-[#1a237e] hover:bg-[#3949ab] flex items-center gap-2">
              <UserPlus size={16} />
              Novo Usuário
            </Button>
          </Link>
        </div>
      </div>

      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Buscar usuários por nome ou email..."
            className="w-full pl-10 pr-4 py-2 border rounded-md"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {showFilters && (
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de Usuário</label>
                <select
                  className="w-full p-2 border rounded-md"
                  value={selectedRole || ""}
                  onChange={(e) => setSelectedRole(e.target.value || null)}
                >
                  <option value="">Todos os tipos</option>
                  <option value="user">Usuário</option>
                  <option value="partner">Parceiro</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  className="w-full p-2 border rounded-md"
                  value={selectedStatus || ""}
                  onChange={(e) => setSelectedStatus(e.target.value || null)}
                >
                  <option value="">Todos os status</option>
                  <option value="active">Ativo</option>
                  <option value="inactive">Inativo</option>
                </select>
              </div>

              <div className="flex items-end">
                <Button
                  variant="outline"
                  className="mr-2"
                  onClick={() => {
                    setSelectedRole(null)
                    setSelectedStatus(null)
                    setSearchTerm("")
                  }}
                >
                  Limpar
                </Button>
                <Button className="bg-[#1a237e] hover:bg-[#3949ab]">Aplicar</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="bg-white rounded-md shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort("name")}
                >
                  <div className="flex items-center">
                    Nome
                    {sortBy === "name" && <ArrowUpDown size={14} className="ml-1" />}
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Email
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Tipo
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort("points")}
                >
                  <div className="flex items-center">
                    Pontos
                    {sortBy === "points" && <ArrowUpDown size={14} className="ml-1" />}
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort("joinDate")}
                >
                  <div className="flex items-center">
                    Data de Cadastro
                    {sortBy === "joinDate" && <ArrowUpDown size={14} className="ml-1" />}
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Status
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sortedUsers.map((user) => (
                <tr key={user.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{user.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{user.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        user.role === "partner" ? "bg-purple-100 text-purple-800" : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {user.role === "partner" ? "Parceiro" : "Usuário"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{user.points}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{new Date(user.joinDate).toLocaleDateString("pt-BR")}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        user.status === "active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                      }`}
                    >
                      {user.status === "active" ? "Ativo" : "Inativo"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Eye size={16} className="text-gray-500" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Edit size={16} className="text-blue-500" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Trash2 size={16} className="text-red-500" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {sortedUsers.length === 0 && (
          <div className="text-center py-10">
            <p className="text-gray-500">Nenhum usuário encontrado</p>
          </div>
        )}

        <div className="px-6 py-3 flex items-center justify-between border-t border-gray-200">
          <div className="text-sm text-gray-500">
            Mostrando <span className="font-medium">{sortedUsers.length}</span> de{" "}
            <span className="font-medium">{users.length}</span> usuários
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" disabled>
              Anterior
            </Button>
            <Button variant="outline" size="sm" disabled>
              Próximo
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
