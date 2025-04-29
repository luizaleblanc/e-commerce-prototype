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
  Printer,
  Clock,
  CheckCircle2,
  ThumbsUp,
} from "lucide-react"

// Dados de exemplo para a solicitação
const requestData = {
  id: "000000000",
  date: "00/00/00",
  value: "R$ 00,00",
  type: "Banda",
  status: "Pendente",
  category: "Sertanejo",
  time: "00:00",
  duration: "1 hora",
  description:
    "Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,",
}

// Dados de exemplo para o solicitante
const requesterData = {
  name: "Marina Silva",
  email: "mail@email.com",
  phone: "(00) 00000-0000",
  state: "BA",
  city: "Salvador",
}

export default function RequestDetails({ requestId }: { requestId: string }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("solicitante") // solicitante, musico, desistencia, avaliacao
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
                    className="flex items-center gap-3 py-4 px-6 text-gray-700 font-medium hover:bg-[#B8860B] hover:text-white transition-colors w-full text-left"
                    onClick={() => handleNavigation("/musicians")}
                  >
                    <Mic2 size={20} />
                    MÚSICOS
                  </button>
                </li>
                <li>
                  <button
                    className="flex items-center gap-3 py-4 px-6 bg-[#B8860B] text-white font-medium hover:bg-[#a67719] transition-colors w-full text-left"
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
          <main className="flex-1 overflow-auto bg-white">
            <div className="p-4 md:p-6">
              {/* Breadcrumb */}
              <div className="mb-4">
                <h2 className="text-sm font-medium text-gray-500 uppercase">SOLICITAÇÕES</h2>
              </div>

              {/* Page Title */}
              <div className="mb-6">
                <h1 className="text-2xl font-bold">Detalhes da solicitação</h1>
              </div>

              {/* Request Details Card */}
              <div className="bg-white rounded-lg shadow mb-8 relative">
                <div className="absolute right-6 top-6 flex items-center gap-2">
                  <button className="text-gray-500 hover:text-gray-700">
                    <Printer size={20} />
                  </button>
                  <div className="flex items-center">
                    <label className="switch">
                      <input type="checkbox" />
                      <span className="slider"></span>
                    </label>
                  </div>
                </div>

                <div className="p-6">
                  <h2 className="text-lg font-semibold mb-4">Dados da solicitação</h2>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Número</h3>
                      <p>{requestData.id}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Data</h3>
                      <p>{requestData.date}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Valor</h3>
                      <p>{requestData.value}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Tipo</h3>
                      <p>{requestData.type}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Status</h3>
                      <p className="flex items-center">
                        <span className="inline-block w-2 h-2 rounded-full bg-yellow-500 mr-2"></span>
                        {requestData.status}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Categoria</h3>
                      <p>{requestData.category}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Horário</h3>
                      <p>{requestData.time}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Duração</h3>
                      <p>{requestData.duration}</p>
                    </div>
                  </div>

                  <div className="mb-8">
                    <h3 className="text-sm font-medium text-gray-500 mb-2">Categoria</h3>
                    <p className="text-sm text-gray-700">{requestData.description}</p>
                  </div>

                  {/* Status Timeline */}
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 rounded-full bg-[#B8860B] flex items-center justify-center mb-2">
                        <Clock className="text-white" size={24} />
                      </div>
                      <p className="text-xs text-center">
                        Aguardando
                        <br />
                        Músico
                      </p>
                    </div>
                    <div className="flex-1 h-[2px] bg-gray-300"></div>
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center mb-2">
                        <Mic2 className="text-gray-500" size={24} />
                      </div>
                      <p className="text-xs text-center">
                        Serviço em
                        <br />
                        andamento
                      </p>
                    </div>
                    <div className="flex-1 h-[2px] bg-gray-300"></div>
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center mb-2">
                        <CheckCircle2 className="text-gray-500" size={24} />
                      </div>
                      <p className="text-xs text-center">
                        Serviço
                        <br />
                        concluído
                      </p>
                    </div>
                    <div className="flex-1 h-[2px] bg-gray-300"></div>
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center mb-2">
                        <ThumbsUp className="text-gray-500" size={24} />
                      </div>
                      <p className="text-xs text-center">
                        Serviço
                        <br />
                        avaliado
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tabs */}
              <div className="mb-6">
                <div className="flex border-b border-gray-200">
                  <button
                    className={`py-2 px-4 text-lg font-bold font-montserrat transition-colors ${
                      activeTab === "solicitante"
                        ? "border-b-2 border-[#B8860B] text-[#B8860B]"
                        : "text-gray-500 hover:text-[#B8860B]"
                    }`}
                    onClick={() => setActiveTab("solicitante")}
                  >
                    Solicitante
                  </button>
                  <button
                    className={`py-2 px-4 text-lg font-bold font-montserrat transition-colors ${
                      activeTab === "musico"
                        ? "border-b-2 border-[#B8860B] text-[#B8860B]"
                        : "text-gray-500 hover:text-[#B8860B]"
                    }`}
                    onClick={() => setActiveTab("musico")}
                  >
                    Músico
                  </button>
                  <button
                    className={`py-2 px-4 text-lg font-bold font-montserrat transition-colors ${
                      activeTab === "desistencia"
                        ? "border-b-2 border-[#B8860B] text-[#B8860B]"
                        : "text-gray-500 hover:text-[#B8860B]"
                    }`}
                    onClick={() => setActiveTab("desistencia")}
                  >
                    Desistência
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

              {/* Solicitante Tab Content */}
              {activeTab === "solicitante" && (
                <div className="bg-white rounded-lg shadow p-6 mb-6">
                  <div className="flex flex-col md:flex-row items-start gap-6">
                    <div className="w-24 h-24 bg-gray-200 rounded-full flex-shrink-0"></div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">Nome</h3>
                        <p>{requesterData.name}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">Email</h3>
                        <p>{requesterData.email}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">Telefone</h3>
                        <p>{requesterData.phone}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">Estado</h3>
                        <p>{requesterData.state}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">Cidade</h3>
                        <p>{requesterData.city}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Músico Tab Content */}
              {activeTab === "musico" && (
                <div className="bg-white rounded-lg shadow p-6 mb-6">
                  <p className="text-gray-500">Nenhum músico atribuído a esta solicitação ainda.</p>
                </div>
              )}

              {/* Desistência Tab Content */}
              {activeTab === "desistencia" && (
                <div className="bg-white rounded-lg shadow p-6 mb-6">
                  <p className="text-gray-500">Não há informações de desistência para esta solicitação.</p>
                </div>
              )}

              {/* Avaliação Tab Content */}
              {activeTab === "avaliacao" && (
                <div className="bg-white rounded-lg shadow p-6 mb-6">
                  <p className="text-gray-500">Esta solicitação ainda não foi avaliada.</p>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </PageTransition>
  )
}
