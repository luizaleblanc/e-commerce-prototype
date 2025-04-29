"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import PageTransition from "../components/page-transition"
import {
  Monitor,
  Users,
  Mic2,
  FileText,
  BarChart3,
  KeyRound,
  ChevronDown,
  Menu,
  X,
  Search,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"

// Dados de exemplo para a tabela de usuários
const usersData = [
  { id: "00001", name: "Anderson", email: "mail@gmail.com", phone: "(00) 00000-0000", uf: "BA", city: "Salvador" },
  { id: "00002", name: "Marina Silva", email: "mail@gmail.com", phone: "(00) 00000-0000", uf: "BA", city: "Salvador" },
  {
    id: "00003",
    name: "Carlos Oliveira",
    email: "mail@gmail.com",
    phone: "(00) 00000-0000",
    uf: "BA",
    city: "Salvador",
  },
  {
    id: "00004",
    name: "Juliana Santos",
    email: "mail@gmail.com",
    phone: "(00) 00000-0000",
    uf: "BA",
    city: "Salvador",
  },
  {
    id: "00005",
    name: "Roberto Almeida",
    email: "mail@gmail.com",
    phone: "(00) 00000-0000",
    uf: "BA",
    city: "Salvador",
  },
  {
    id: "00006",
    name: "Fernanda Costa",
    email: "mail@gmail.com",
    phone: "(00) 00000-0000",
    uf: "BA",
    city: "Salvador",
  },
  { id: "00007", name: "Paulo Mendes", email: "mail@gmail.com", phone: "(00) 00000-0000", uf: "BA", city: "Salvador" },
  {
    id: "00008",
    name: "Luciana Ferreira",
    email: "mail@gmail.com",
    phone: "(00) 00000-0000",
    uf: "BA",
    city: "Salvador",
  },
  { id: "00009", name: "Ricardo Souza", email: "mail@gmail.com", phone: "(00) 00000-0000", uf: "BA", city: "Salvador" },
  { id: "00010", name: "Amanda Lima", email: "mail@gmail.com", phone: "(00) 00000-0000", uf: "BA", city: "Salvador" },
]

export default function UsersPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const router = useRouter()

  const handleUserClick = (userId: string) => {
    router.push(`/users/${userId}`)
  }

  const handleNavigation = (path: string) => {
    router.push(path)
    setMobileMenuOpen(false)
  }

  return (
    <PageTransition>
      <div className="flex flex-col h-screen">
        {/* Header */}
        <header className="bg-black text-white py-3 px-4 md:px-6 flex justify-between items-center">
          <div className="flex items-center gap-2 md:gap-3">
            <div className="w-8 h-8 md:w-12 md:h-12 bg-gray-300 rounded-full"></div>
            <div>
              <h1 className="text-sm md:text-base font-medium">Nome do projeto</h1>
              <p className="text-[10px] md:text-xs text-gray-400">DESCRIÇÃO COMPLETA</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="md:flex items-center gap-3 hidden">
              <div className="w-9 h-9 bg-gray-300 rounded-full overflow-hidden">
                {/* Espaço vazio para foto do usuário */}
              </div>
              <div>
                <p className="text-xs text-gray-400">Seja bem vindo!</p>
                <p className="text-sm">Nome do usuário</p>
              </div>
            </div>
            <ChevronDown size={16} className="hidden md:block" />
            <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </header>

        <div className="flex flex-1 relative">
          {/* Mobile Menu Overlay */}
          {mobileMenuOpen && (
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
              onClick={() => setMobileMenuOpen(false)}
            ></div>
          )}

          {/* Sidebar */}
          <aside
            className={`${
              mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
            } fixed top-[57px] bottom-0 w-[200px] bg-gray-100 z-30 transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:z-0`}
          >
            <nav>
              <ul>
                <li>
                  <button
                    className="flex items-center gap-3 py-4 px-6 text-gray-700 font-medium hover:bg-[#B8860B] hover:text-white transition-colors w-full text-left"
                    onClick={() => handleNavigation("/dashboard")}
                  >
                    <Monitor size={20} />
                    DASHBOARD
                  </button>
                </li>
                <li>
                  <button
                    className="flex items-center gap-3 py-4 px-6 bg-[#B8860B] text-white font-medium hover:bg-[#a67719] transition-colors w-full text-left"
                    onClick={() => handleNavigation("/users")}
                  >
                    <Users size={20} />
                    USUÁRIOS
                  </button>
                </li>
                <li>
                  <button
                    className="flex items-center gap-3 py-4 px-6 text-gray-700 font-medium hover:bg-[#B8860B] hover:text-white transition-colors w-full text-left"
                    onClick={() => handleNavigation("/musicians")}
                  >
                    <Mic2 size={20} />
                    MÚSICOS
                  </button>
                </li>
                <li>
                  <button
                    className="flex items-center gap-3 py-4 px-6 text-gray-700 font-medium hover:bg-[#B8860B] hover:text-white transition-colors w-full text-left"
                    onClick={() => handleNavigation("/requests")}
                  >
                    <FileText size={20} />
                    SOLICITAÇÕES
                  </button>
                </li>
                <li>
                  <button
                    className="flex items-center gap-3 py-4 px-6 text-gray-700 font-medium hover:bg-[#B8860B] hover:text-white transition-colors w-full text-left"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <BarChart3 size={20} />
                    FINANCEIRO
                  </button>
                </li>
                <li>
                  <button
                    className="flex items-center gap-3 py-4 px-6 text-gray-700 font-medium hover:bg-[#B8860B] hover:text-white transition-colors w-full text-left"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <KeyRound size={20} />
                    ACESSOS
                  </button>
                </li>
              </ul>
            </nav>
          </aside>

          {/* Main Content */}
          <main className="flex-1 p-4 md:p-6 bg-white overflow-auto">
            {/* Breadcrumb */}
            <div className="mb-4">
              <h2 className="text-sm font-medium text-gray-500 uppercase">USUÁRIOS</h2>
            </div>

            {/* Page Title */}
            <div className="mb-6">
              <h1 className="text-2xl font-bold">Usuários</h1>
            </div>

            {/* Search and Filter */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Buscar"
                  className="w-full py-2 px-4 pr-10 bg-gray-100 border border-gray-200 rounded text-sm"
                />
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              </div>
              <div className="w-full md:w-[200px]">
                <div className="relative">
                  <select className="w-full appearance-none py-2 px-4 pr-10 bg-gray-100 border border-gray-200 rounded text-sm">
                    <option>Todos</option>
                    <option>Ativos</option>
                    <option>Inativos</option>
                  </select>
                  <ChevronDown
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={18}
                  />
                </div>
              </div>
            </div>

            {/* Users Table */}
            <div className="overflow-x-auto">
              <table className="w-full min-w-[800px] border-collapse">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">
                      <div className="flex items-center">
                        ID
                        <ChevronDown size={16} className="ml-1" />
                      </div>
                    </th>
                    <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">
                      <div className="flex items-center">
                        Nome do usuário
                        <ChevronDown size={16} className="ml-1" />
                      </div>
                    </th>
                    <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">
                      <div className="flex items-center">
                        Email
                        <ChevronDown size={16} className="ml-1" />
                      </div>
                    </th>
                    <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">
                      <div className="flex items-center">
                        Telefone
                        <ChevronDown size={16} className="ml-1" />
                      </div>
                    </th>
                    <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">
                      <div className="flex items-center">
                        UF
                        <ChevronDown size={16} className="ml-1" />
                      </div>
                    </th>
                    <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">
                      <div className="flex items-center">
                        Cidade
                        <ChevronDown size={16} className="ml-1" />
                      </div>
                    </th>
                    <th className="py-3 px-4 text-center text-sm font-medium text-gray-500"></th>
                  </tr>
                </thead>
                <tbody>
                  {usersData.map((user, index) => (
                    <tr
                      key={index}
                      className="border-b border-gray-200 hover:bg-gray-50 cursor-pointer"
                      onClick={() => handleUserClick(user.id)}
                    >
                      <td className="py-3 px-4 text-sm">{user.id}</td>
                      <td className="py-3 px-4 text-sm">{user.name}</td>
                      <td className="py-3 px-4 text-sm">{user.email}</td>
                      <td className="py-3 px-4 text-sm">{user.phone}</td>
                      <td className="py-3 px-4 text-sm">{user.uf}</td>
                      <td className="py-3 px-4 text-sm">{user.city}</td>
                      <td className="py-3 px-4 text-center" onClick={(e) => e.stopPropagation()}>
                        <button className="text-gray-500 hover:text-gray-700">
                          <MoreVertical size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex justify-end items-center mt-6">
              <div className="flex items-center space-x-2">
                <button className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-200 text-gray-500 hover:bg-gray-100">
                  <ChevronLeft size={16} />
                </button>
                <button className="w-8 h-8 flex items-center justify-center rounded-full bg-[#B8860B] text-white">
                  1
                </button>
                <button className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-200 text-gray-500 hover:bg-[#B8860B] hover:text-white transition-colors">
                  2
                </button>
                <button className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-200 text-gray-500 hover:bg-[#B8860B] hover:text-white transition-colors">
                  3
                </button>
                <button className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-200 text-gray-500 hover:bg-gray-100">
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </main>
        </div>
      </div>
    </PageTransition>
  )
}
