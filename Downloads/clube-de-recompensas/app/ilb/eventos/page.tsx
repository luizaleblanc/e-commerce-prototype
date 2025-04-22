import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"

// Dados simulados de eventos
const events = [
  {
    id: 1,
    title: "Campeonato Nacional",
    date: "24/05/2025",
    location: "São Paulo, SP",
    image: "/placeholder.svg?height=300&width=500",
    description: "O maior campeonato nacional com os melhores jogadores do país.",
  },
  {
    id: 2,
    title: "Encontro de Fãs",
    date: "12/06/2025",
    location: "Rio de Janeiro, RJ",
    image: "/placeholder.svg?height=300&width=500",
    description: "Encontro exclusivo para membros ILB com jogadores profissionais.",
  },
  {
    id: 3,
    title: "Torneio Regional",
    date: "30/06/2025",
    location: "Belo Horizonte, MG",
    image: "/placeholder.svg?height=300&width=500",
    description: "Competição regional com equipes de todo o estado.",
  },
  {
    id: 4,
    title: "Workshop de Estratégias",
    date: "15/07/2025",
    location: "Brasília, DF",
    image: "/placeholder.svg?height=300&width=500",
    description: "Aprenda estratégias avançadas com os melhores treinadores.",
  },
]

export default function EventsPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <Header />

      <div className="bg-[#1a237e] text-white py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold">Eventos Exclusivos</h1>
          <p className="mt-2">Confira os próximos eventos para membros ILB</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {events.map((event) => (
            <Card key={event.id} className="overflow-hidden">
              <div className="relative h-48 w-full">
                <Image src={event.image || "/placeholder.svg"} alt={event.title} fill className="object-cover" />
              </div>
              <CardHeader>
                <CardTitle>{event.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4 mb-4">
                  <div className="flex items-center gap-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect width="18" height="18" x="3" y="4" rx="2" ry="2"></rect>
                      <line x1="16" x2="16" y1="2" y2="6"></line>
                      <line x1="8" x2="8" y1="2" y2="6"></line>
                      <line x1="3" x2="21" y1="10" y2="10"></line>
                    </svg>
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                    <span>{event.location}</span>
                  </div>
                </div>
                <p className="text-gray-600">{event.description}</p>
              </CardContent>
              <CardFooter>
                <Button className="bg-[#7b1fa2] hover:bg-[#6a1b9a] w-full">Garantir Ingresso</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      <Footer />
    </main>
  )
}
