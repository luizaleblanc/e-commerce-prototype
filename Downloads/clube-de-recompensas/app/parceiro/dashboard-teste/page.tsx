"use client"

import NextImage from "next/image"
import Link from "next/link"
import { PageTransition } from "@/components/page-transition"
import { Card, CardContent } from "@/components/ui/card"

export default function TestPartnerDashboard() {
  // Dados simplificados de histórico
  const historyItems = [
    {
      id: 1,
      name: "Maria Silva",
      points: 200,
    },
    {
      id: 2,
      name: "João Santos",
      points: 150,
    },
    {
      id: 3,
      name: "Ana Oliveira",
      points: 300,
    },
  ]

  return (
    <PageTransition>
      <div className="min-h-screen bg-white">
        {/* Header */}
        <header className="bg-[#1a237e] text-white py-3 px-6 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Link href="/parceiro/dashboard-teste">
              <NextImage src="/coin-logo.png" alt="Logo Clube de Recompensas" width={50} height={50} />
            </Link>
            <NextImage src="/clube-text.png" alt="Clube de Recompensas" width={150} height={45} className="mt-1" />
          </div>
          <div className="flex items-center gap-4">
            <Link href="#" className="text-white hover:text-gray-200 transition-colors">
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
                Usuário
                <br />
                Logado
              </span>
            </div>
          </div>
        </header>

        <div className="flex">
          {/* Sidebar - Mantendo em branco */}
          <aside className="w-[170px] bg-white border-r border-gray-200 text-gray-700 min-h-screen flex-shrink-0">
            <nav className="py-6">
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-[#3949ab]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                      <polyline points="9 22 9 12 15 12 15 22"></polyline>
                    </svg>
                    <span>Início</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 hover:text-[#3949ab] transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M3 3v18h18"></path>
                      <path d="m19 9-5 5-4-4-3 3"></path>
                    </svg>
                    <span>Histórico</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 hover:text-[#3949ab] transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M20 12V8h-4V4h-4v4H8v4H4v4h4v4h4v-4h4v-4h4v-4z"></path>
                    </svg>
                    <span>Recompensas</span>
                  </Link>
                </li>
              </ul>
            </nav>
          </aside>

          {/* Main content */}
          <main className="flex-1">
            {/* Banner - Preenchendo todo o espaço e colado ao header/navegação */}
            <div className="relative w-full h-[400px]">
              <NextImage
                src="/banner-recompensas-novo.png"
                alt="Banner Recompensas"
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Histórico de Resgate - Simplificado */}
            <div className="p-6 bg-gray-100">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-black">Histórico de resgate</h2>
                <Link href="/parceiro/historico" className="text-black hover:underline font-medium">
                  Ver todos
                </Link>
              </div>

              <div className="space-y-4">
                {historyItems.map((item) => (
                  <Card key={item.id} className="shadow-sm border-l-4 border-[#1a237e] bg-[#1a237e] text-white">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-medium text-white">{item.name}</h3>
                        </div>
                        <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg">
                          <span className="font-bold text-[#1a237e] text-lg">{item.points}</span>
                          <span className="text-[#1a237e]">pontos</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </main>
        </div>
      </div>
    </PageTransition>
  )
}
