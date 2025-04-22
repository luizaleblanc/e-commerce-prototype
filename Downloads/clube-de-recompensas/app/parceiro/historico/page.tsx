"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { PageTransition } from "@/components/page-transition"
import { QrCode, Calendar, User, Clock, Search, Filter } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function HistoryPage() {
  const [searchTerm, setSearchTerm] = useState("")

  // Dados simulados de histórico
  const historyItems = [
    {
      id: 1,
      points: 200,
      clientName: "Maria Silva",
      date: "28/12/2024",
      time: "14:35",
    },
    {
      id: 2,
      points: 150,
      clientName: "João Santos",
      date: "27/12/2024",
      time: "10:22",
    },
    {
      id: 3,
      points: 300,
      clientName: "Ana Oliveira",
      date: "26/12/2024",
      time: "16:45",
    },
    {
      id: 4,
      points: 100,
      clientName: "Carlos Mendes",
      date: "25/12/2024",
      time: "09:15",
    },
    {
      id: 5,
      points: 250,
      clientName: "Fernanda Costa",
      date: "24/12/2024",
      time: "11:30",
    },
    {
      id: 6,
      points: 175,
      clientName: "Ricardo Almeida",
      date: "23/12/2024",
      time: "15:20",
    },
    {
      id: 7,
      points: 320,
      clientName: "Juliana Pereira",
      date: "22/12/2024",
      time: "13:45",
    },
  ]

  return (
    <PageTransition>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Histórico de resgate</h1>

          <div className="flex gap-3">
            <Link href="/parceiro/qr-code">
              <Button className="bg-[#3949ab] hover:bg-[#5c6bc0] flex items-center gap-2">
                <QrCode size={18} />
                QR CODE
              </Button>
            </Link>

            <Button
              onClick={() => document.getElementById("atribuir-pontos-modal")?.showModal()}
              className="bg-[#3949ab] hover:bg-[#5c6bc0]"
            >
              ATRIBUIR PONTO MANUAL
            </Button>

            <Link href="/parceiro/importar">
              <Button className="bg-[#3949ab] hover:bg-[#5c6bc0]">IMPORTAR</Button>
            </Link>
          </div>
        </div>

        {/* Barra de pesquisa e filtros */}
        <div className="mb-6 flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Buscar por nome ou ID..."
              className="w-full p-3 pl-10 border rounded-md"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          </div>

          {/* Botão de filtros em preto sem hover */}
          <button className="px-4 py-2 bg-black text-white rounded-md flex items-center gap-2">
            <Filter size={18} />
            Filtros
          </button>
        </div>

        {/* Lista de histórico */}
        <div className="space-y-4">
          {historyItems.map((item) => (
            <Card key={item.id} className="shadow-md border-l-4 border-[#3949ab]">
              <CardContent className="p-5">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-[#3949ab] text-white p-3 rounded-full">
                      <User size={24} />
                    </div>
                    <div>
                      <h3 className="font-medium text-lg text-gray-400">{item.clientName}</h3>
                      <p className="text-gray-400">ID: #{item.id.toString().padStart(6, "0")}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-lg">
                    <span className="font-bold text-[#3949ab] text-lg">{item.points}</span>
                    <span className="text-gray-600">pontos</span>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Calendar size={16} />
                      <span>{item.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Clock size={16} />
                      <span>{item.time}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Modal para atribuir pontos */}
      <dialog id="atribuir-pontos-modal" className="modal">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6">Atribuir pontos</h2>

          <form className="space-y-4">
            <div>
              <label htmlFor="user-id" className="block text-gray-700 mb-1">
                ID do usuário
              </label>
              <input
                id="user-id"
                type="text"
                className="w-full p-2 border rounded-md"
                placeholder="Exemplo Preenchido"
              />
            </div>

            <div>
              <label htmlFor="points" className="block text-gray-700 mb-1">
                Pontos
              </label>
              <input id="points" type="number" className="w-full p-2 border rounded-md" placeholder="000000" />
            </div>

            <div>
              <label htmlFor="observation" className="block text-gray-700 mb-1">
                Observação
              </label>
              <textarea
                id="observation"
                className="w-full p-2 border rounded-md h-24"
                placeholder="Exemplo Preenchido"
              ></textarea>
            </div>

            <div className="flex justify-between pt-4">
              <button
                type="button"
                onClick={() => document.getElementById("atribuir-pontos-modal")?.close()}
                className="px-6 py-2 border border-gray-300 rounded-md"
              >
                CANCELAR
              </button>
              <button type="submit" className="px-6 py-2 bg-[#3949ab] text-white rounded-md">
                SALVAR
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </PageTransition>
  )
}
