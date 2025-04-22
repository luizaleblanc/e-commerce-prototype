import Image from "next/image"
import { Button } from "@/components/ui/button"

export default function ILBPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Seja um ILB</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Benefícios de ser um ILB</h2>
          <ul className="space-y-2 mb-6">
            <li className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-purple-600"></div>
              <span>Acesso a eventos exclusivos</span>
            </li>
            <li className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-purple-600"></div>
              <span>Recompensas especiais</span>
            </li>
            <li className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-purple-600"></div>
              <span>Descontos em produtos parceiros</span>
            </li>
            <li className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-purple-600"></div>
              <span>Suporte prioritário</span>
            </li>
          </ul>
          <Button className="bg-[#7b1fa2] hover:bg-[#6a1b9a] text-white font-bold py-2 px-6">Inscreva-se agora</Button>
        </div>
        <div className="relative h-[400px]">
          <Image
            src="/placeholder.svg?height=400&width=500"
            alt="ILB Benefits"
            fill
            className="object-cover rounded-lg"
          />
        </div>
      </div>
    </div>
  )
}
