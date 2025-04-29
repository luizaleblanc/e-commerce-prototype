"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import PageTransition from "../../components/page-transition"
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
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  Star,
  StarHalf,
} from "lucide-react"

// Dados de exemplo para o músico
const musicianData = {
  id: "00000",
  name: "Marina Silva",
  email: "mail@email.com",
  phone: "(00) 00000-0000",
  uf: "BA",
  city: "Salvador",
}

// Dados de exemplo para as solicitações do músico
const requestsData = [
  {
    id: "00001",
    date: "00/00/00",
    type: "Sertanejo",
    user: "Nome do usuário",
    uf: "BA",
    city: "Salvador",
    value: "R$ 00,00",
    status: "Ativa",
  },
  {
    id: "00002",
    date: "00/00/00",
    type: "Sertanejo",
    user: "Nome do usuário",
    uf: "BA",
    city: "Salvador",
    value: "R$ 00,00",
    status: "Encerrada",
  },
  {
    id: "00003",
    date: "00/00/00",
    type: "Sertanejo",
    user: "Nome do usuário",
    uf: "BA",
    city: "Salvador",
    value: "R$ 00,00",
    status: "Ativa",
  },
  {
    id: "00004",
    date: "00/00/00",
    type: "Sertanejo",
    user: "Nome do usuário",
    uf: "BA",
    city: "Salvador",
    value: "R$ 00,00",
    status: "Encerrada",
  },
  {
    id: "00005",
    date: "00/00/00",
    type: "Sertanejo",
    user: "Nome do usuário",
    uf: "BA",
    city: "Salvador",
    value: "R$ 00,00",
    status: "Ativa",
  },
  {
    id: "00006",
    date: "00/00/00",
    type: "Sertanejo",
    user: "Nome do usuário",
    uf: "BA",
    city: "Salvador",
    value: "R$ 00,00",
    status: "Encerrada",
  },
  {
    id: "00007",
    date: "00/00/00",
    type: "Sertanejo",
    user: "Nome do usuário",
    uf: "BA",
    city: "Salvador",
    value: "R$ 00,00",
    status: "Ativa",
  },
  {
    id: "00008",
    date: "00/00/00",
    type: "Sertanejo",
    user: "Nome do usuário",
    uf: "BA",
    city: "Salvador",
    value: "R$ 00,00",
    status: "Encerrada",
  },
  {
    id: "00009",
    date: "00/00/00",
    type: "Sertanejo",
    user: "Nome do usuário",
    uf: "BA",
    city: "Salvador",
    value: "R$ 00,00",
    status: "Ativa",
  },
  {
    id: "00010",
    date: "00/00/00",
    type: "Sertanejo",
    user: "Nome do usuário",
    uf: "BA",
    city: "Salvador",
    value: "R$ 00,00",
    status: "Encerrada",
  },
]

// Dados de exemplo para as avaliações
const reviewsData = [
  {
    id: 1,
    rating: 4,
    date: "1 Semana atrás",
    text: "is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to",
    user: "Usuário",
  },
  {
    id: 2,
    rating: 5,
    date: "1 Semana atrás",
    text: "is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to",
    user: "Usuário",
  },
  {
    id: 3,
    rating: 4,
    date: "1 Semana atrás",
    text: "is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to",
    user: "Usuário",
  },
]

export default function MusicianDetails({ musicianId }: { musicianId: string }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isActive, setIsActive] = useState(true)
  const [activeTab, setActiveTab] = useState("solicitacoes") // solicitacoes ou avaliacao
  const router = useRouter()

  const handleNavigation = (path: string) => {
    router.push(path)
    setMobileMenuOpen(false)
  }

  // Componente para renderizar as estrelas de avaliação
  const RatingStars = ({ rating }: { rating: number }) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 !== 0

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`star-${i}`} className="fill-[#B8860B] text-[#B8860B]" size={16} />)
    }

    if (hasHalfStar) {
      stars.push(<StarHalf key="half-star" className="fill-[#B8860B] text-[#B8860B]" size={16} />)
    }

    const emptyStars = 5 - stars.length
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-star-${i}`} className="text-gray-300" size={16} />)
    }

    return <div className="flex">{stars}</div>
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
                    className="flex items-center gap-3 py-4 px-6 text-gray-700 font-medium hover:bg-[#B8860B] hover:text-white transition-colors w-full text-left"
                    onClick={() => handleNavigation("/users")}
                  >
                    <Users size={20} />
                    USUÁRIOS
                  </button>
                </li>
                <li>
                  <button
                    className="flex items-center gap-3 py-4 px-6 bg-[#B8860B] text-white font-medium hover:bg-[#a67719] transition-colors w-full text-left"
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
          <main className="flex-1 overflow-auto">
            <div className="p-4 md:p-6 bg-white">
              {/* Breadcrumb */}
              <div className="mb-4">
                <h2 className="text-sm font-medium text-gray-500 uppercase">MÚSICOS</h2>
              </div>

              {/* Page Title */}
              <div className="mb-6">
                <h1 className="text-2xl font-bold">Detalhes do músico</h1>
              </div>

              {/* Musician Details Card */}
              <div className="bg-white rounded-lg shadow mb-8 relative">
                <div className="absolute right-6 top-6">
                  <div className="flex items-center">
                    <label className="switch">
                      <input type="checkbox" checked={isActive} onChange={() => setIsActive(!isActive)} />
                      <span className="slider"></span>
                    </label>
                  </div>
                </div>

                <div className="p-6 flex flex-col md:flex-row items-start md:items-center gap-6">
                  {/* Musician Avatar */}
                  <div className="w-24 h-24 bg-gray-200 rounded-full flex-shrink-0"></div>

                  {/* Musician Info */}
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-6 w-full">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Nome</h3>
                      <p>{musicianData.name}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Email</h3>
                      <p>{musicianData.email}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Telefone</h3>
                      <p>{musicianData.phone}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Estado</h3>
                      <p>{musicianData.uf}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Cidade</h3>
                      <p>{musicianData.city}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tabs and Content with Background */}
            <div className="bg-[#f1f1f1] min-h-[calc(100%-300px)] -ml-[200px] pl-[200px] md:pl-[200px] flex-1">
              <div className="px-4 md:px-6 pt-6">
                {/* Tabs */}
                <div className="mb-6">
                  <div className="flex border-b border-gray-200">
                    <button
                      className={`py-2 px-4 text-lg font-bold font-montserrat transition-colors ${
                        activeTab === "solicitacoes"
                          ? "border-b-2 border-[#B8860B] text-[#B8860B]"
                          : "text-gray-500 hover:text-[#B8860B]"
                      }`}
                      onClick={() => setActiveTab("solicitacoes")}
                    >
                      Solicitações
                    </button>
                    <button
                      className={`py-2 px-4 text-lg font-bold font-montserrat transition-colors ${
                        activeTab === "avaliacao"
                          ? "border-b-2 border-[#B8860B] text-[#B8860B]"
                          : "text-gray-500 hover:text-[#B8860B]"
                      }`}
                      onClick={() => setActiveTab("avaliacao")}
                    >
                      Avaliação
                    </button>
                  </div>
                </div>

                {/* Solicitações Tab Content */}
                {activeTab === "solicitacoes" && (
                  <>
                    {/* Requests Table */}
                    <div className="overflow-x-auto mb-6">
                      <div className="bg-white rounded-lg p-4">
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
                                  Data
                                  <ChevronDown size={16} className="ml-1" />
                                </div>
                              </th>
                              <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">
                                <div className="flex items-center">
                                  Tipo
                                  <ChevronDown size={16} className="ml-1" />
                                </div>
                              </th>
                              <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">
                                <div className="flex items-center">
                                  Usuário
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
                              <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">
                                <div className="flex items-center">
                                  Valor
                                  <ChevronDown size={16} className="ml-1" />
                                </div>
                              </th>
                              <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">
                                <div className="flex items-center">
                                  Status
                                  <ChevronDown size={16} className="ml-1" />
                                </div>
                              </th>
                              <th className="py-3 px-4 text-center text-sm font-medium text-gray-500"></th>
                            </tr>
                          </thead>
                          <tbody>
                            {requestsData.map((request, index) => (
                              <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
                                <td className="py-3 px-4 text-sm">{request.id}</td>
                                <td className="py-3 px-4 text-sm">{request.date}</td>
                                <td className="py-3 px-4 text-sm">{request.type}</td>
                                <td className="py-3 px-4 text-sm">{request.user}</td>
                                <td className="py-3 px-4 text-sm">{request.uf}</td>
                                <td className="py-3 px-4 text-sm">{request.city}</td>
                                <td className="py-3 px-4 text-sm">{request.value}</td>
                                <td className="py-3 px-4 text-sm">
                                  <span
                                    className={`px-4 py-1 rounded-full text-xs ${
                                      request.status === "Ativa"
                                        ? "bg-[#C5D69D] text-gray-800"
                                        : "bg-gray-200 text-gray-800"
                                    }`}
                                  >
                                    {request.status}
                                  </span>
                                </td>
                                <td className="py-3 px-4 text-center">
                                  <button className="text-gray-500 hover:text-gray-700">
                                    <MoreVertical size={18} />
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* Pagination */}
                    <div className="flex justify-end items-center pb-6">
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
                  </>
                )}

                {/* Avaliação Tab Content */}
                {activeTab === "avaliacao" && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-6">
                    {reviewsData.map((review) => (
                      <div key={review.id} className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                        <div className="flex justify-between items-start mb-3">
                          <RatingStars rating={review.rating} />
                          <span className="text-xs text-gray-500">{review.date}</span>
                        </div>
                        <p className="text-sm text-gray-700 mb-4">{review.text}</p>
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                          <span className="text-sm font-medium">{review.user}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </main>
        </div>
      </div>
    </PageTransition>
  )
}
