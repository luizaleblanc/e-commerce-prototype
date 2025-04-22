"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Search, Plus, Filter, Edit, Trash2, Eye, ArrowUpDown, Download } from "lucide-react"
import Link from "next/link"
import NextImage from "next/image"

// Dados simulados de produtos
const products = [
  {
    id: 1,
    name: "Mochila ILB",
    category: "Acessórios",
    points: 1500,
    stock: 25,
    status: "active",
    image: "/ilb-mochila.png",
  },
  {
    id: 2,
    name: "Jaqueta ILB",
    category: "Vestuário",
    points: 2000,
    stock: 15,
    status: "active",
    image: "/ilb-jaqueta.png",
  },
  {
    id: 3,
    name: "Camiseta ILB Modelo 1",
    category: "Vestuário",
    points: 1000,
    stock: 40,
    status: "active",
    image: "/ilb-camiseta1.png",
  },
  {
    id: 4,
    name: "Camiseta ILB Modelo 2",
    category: "Vestuário",
    points: 1000,
    stock: 35,
    status: "active",
    image: "/ilb-camiseta2.png",
  },
  {
    id: 5,
    name: "Boné ILB",
    category: "Acessórios",
    points: 800,
    stock: 0,
    status: "out_of_stock",
    image: "/ilb-bone.png",
  },
]

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null)
  const [sortBy, setSortBy] = useState<string | null>(null)
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc")
  const [showFilters, setShowFilters] = useState(false)

  // Filtrar produtos
  const filteredProducts = products.filter((product) => {
    // Filtro de busca
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase())

    // Filtro de categoria
    const matchesCategory = !selectedCategory || product.category === selectedCategory

    // Filtro de status
    const matchesStatus = !selectedStatus || product.status === selectedStatus

    return matchesSearch && matchesCategory && matchesStatus
  })

  // Ordenar produtos
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (!sortBy) return 0

    let comparison = 0
    if (sortBy === "name") {
      comparison = a.name.localeCompare(b.name)
    } else if (sortBy === "points") {
      comparison = a.points - b.points
    } else if (sortBy === "stock") {
      comparison = a.stock - b.stock
    }

    return sortOrder === "asc" ? comparison : -comparison
  })

  // Categorias únicas para o filtro
  const categories = Array.from(new Set(products.map((product) => product.category)))

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
        <h1 className="text-2xl font-bold">Gerenciamento de Produtos</h1>

        <div className="flex gap-3">
          <Button variant="outline" className="flex items-center gap-2" onClick={() => setShowFilters(!showFilters)}>
            <Filter size={16} />
            Filtros
          </Button>

          <Button variant="outline" className="flex items-center gap-2">
            <Download size={16} />
            Exportar
          </Button>

          <Link href="/parceiro/admin/produtos/novo">
            <Button className="bg-[#1a237e] hover:bg-[#3949ab] flex items-center gap-2">
              <Plus size={16} />
              Novo Produto
            </Button>
          </Link>
        </div>
      </div>

      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Buscar produtos..."
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
                <label className="block text-sm font-medium text-gray-700 mb-1">Categoria</label>
                <select
                  className="w-full p-2 border rounded-md"
                  value={selectedCategory || ""}
                  onChange={(e) => setSelectedCategory(e.target.value || null)}
                >
                  <option value="">Todas as categorias</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
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
                  <option value="out_of_stock">Sem estoque</option>
                  <option value="inactive">Inativo</option>
                </select>
              </div>

              <div className="flex items-end">
                <Button
                  variant="outline"
                  className="mr-2"
                  onClick={() => {
                    setSelectedCategory(null)
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
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Produto
                </th>
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
                  Categoria
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
                  onClick={() => handleSort("stock")}
                >
                  <div className="flex items-center">
                    Estoque
                    {sortBy === "stock" && <ArrowUpDown size={14} className="ml-1" />}
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
              {sortedProducts.map((product) => (
                <tr key={product.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="relative h-12 w-12">
                      <NextImage src={product.image} alt={product.name} fill className="object-contain" />
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{product.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{product.category}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{product.points}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{product.stock}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        product.status === "active"
                          ? "bg-green-100 text-green-800"
                          : product.status === "out_of_stock"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                      }`}
                    >
                      {product.status === "active"
                        ? "Ativo"
                        : product.status === "out_of_stock"
                          ? "Sem estoque"
                          : "Inativo"}
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

        {sortedProducts.length === 0 && (
          <div className="text-center py-10">
            <p className="text-gray-500">Nenhum produto encontrado</p>
          </div>
        )}

        <div className="px-6 py-3 flex items-center justify-between border-t border-gray-200">
          <div className="text-sm text-gray-500">
            Mostrando <span className="font-medium">{sortedProducts.length}</span> de{" "}
            <span className="font-medium">{products.length}</span> produtos
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
