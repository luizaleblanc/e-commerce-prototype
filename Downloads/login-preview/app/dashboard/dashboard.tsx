"use client"

import { useState } from "react"
import Image from "next/image"
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
  TrendingUp,
  TrendingDown,
  FileIcon,
  Menu,
  X,
} from "lucide-react"

export default function Dashboard() {
  const [dateRange, setDateRange] = useState("1 de Mar de 2023 a 9 de Mar de 2023")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const router = useRouter()

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
                    className="flex items-center gap-3 py-4 px-6 bg-[#B8860B] text-white font-medium hover:bg-[#a67719] transition-colors w-full text-left"
                    onClick={() => handleNavigation("/dashboard")}
                  >
                    <Monitor size={20} />
                    DASHBOARD
                  </button>
                </li>
                <li>
                  <button
                    className="flex items-center gap-3 py-4 px-6 text-gray-700 font-medium hover:bg-[#B8860B] hover:text-white transition-colors w-full text-left"
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
            {/* Date Range Selector */}
            <div className="flex justify-end mb-4 md:mb-6">
              <div className="relative">
                <button className="flex items-center gap-2 bg-gray-200 px-3 py-1.5 md:px-4 md:py-2 rounded text-xs md:text-sm">
                  {dateRange}
                  <ChevronDown size={16} />
                </button>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-4 md:mb-6">
              {/* Users Card */}
              <div className="bg-white rounded-lg shadow p-4 md:p-6 flex justify-between items-center">
                <div>
                  <h2 className="text-xl md:text-2xl font-bold">83.706</h2>
                  <p className="text-sm text-gray-500">Usuários</p>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-emerald-500 flex items-center text-xs md:text-sm gap-1">
                    <TrendingUp size={16} />
                    50,2%
                  </span>
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-[#B8860B] rounded-full flex items-center justify-center mt-1">
                    <Users size={16} className="text-white" />
                  </div>
                </div>
              </div>

              {/* Musicians Card */}
              <div className="bg-white rounded-lg shadow p-4 md:p-6 flex justify-between items-center">
                <div>
                  <h2 className="text-xl md:text-2xl font-bold">022</h2>
                  <p className="text-sm text-gray-500">Músicos</p>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-red-500 flex items-center text-xs md:text-sm gap-1">
                    <TrendingDown size={16} />
                    50,2%
                  </span>
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-black rounded-full flex items-center justify-center mt-1">
                    <Mic2 size={16} className="text-white" />
                  </div>
                </div>
              </div>

              {/* Financial Card */}
              <div className="bg-white rounded-lg shadow p-4 md:p-6 flex justify-between items-center">
                <div>
                  <h2 className="text-lg md:text-2xl font-bold">R$ 300000,00</h2>
                  <p className="text-sm text-gray-500">Total em caixa</p>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-red-500 flex items-center text-xs md:text-sm gap-1">
                    <TrendingDown size={16} />
                    50,2%
                  </span>
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-teal-500 rounded-full flex items-center justify-center mt-1">
                    <BarChart3 size={16} className="text-white" />
                  </div>
                </div>
              </div>
            </div>

            {/* Charts and Lists */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
              {/* Chart - Apenas a imagem sem card */}
              <div className="lg:col-span-2">
                <div className="relative w-full" style={{ height: "400px" }}>
                  <Image
                    src="/images/usuarios-financeiro-chart.png"
                    alt="Gráfico Usuários x Financeiro"
                    fill
                    style={{ objectFit: "contain" }}
                    priority
                  />
                </div>
              </div>

              {/* Latest Requests */}
              <div className="bg-white rounded-lg shadow p-4 md:p-6">
                <div className="flex justify-between items-center mb-4 md:mb-6">
                  <h3 className="text-base md:text-lg font-medium">Últimas solicitações</h3>
                  <button className="text-[10px] md:text-xs text-gray-500 hover:underline">Mostrar todos</button>
                </div>

                <div className="space-y-3 md:space-y-4">
                  {Array.from({ length: 2 }).map((_, index) => (
                    <div key={index} className="p-3 md:p-4 border rounded-lg">
                      <div className="flex items-start gap-2 md:gap-3">
                        <FileIcon className="text-gray-500 mt-1" size={18} />
                        <div>
                          <p className="font-medium text-sm md:text-base">#01201200</p>
                          <p className="text-xs md:text-sm">Nome do músico</p>
                          <p className="text-[10px] md:text-xs text-gray-500">00/00/00</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </PageTransition>
  )
}
