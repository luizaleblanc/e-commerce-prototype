// Tipos
export interface ILB {
  id: string
  name: string
  email: string
  joinDate: Date
  points: number
  level: "Bronze" | "Prata" | "Ouro" | "Platina"
}

export interface Reward {
  id: string
  title: string
  description: string
  pointsCost: number
  available: boolean
  imageUrl: string
}

// Serviços simulados
export async function getILBProfile(id: string): Promise<ILB | null> {
  // Simulação de chamada à API
  return {
    id,
    name: "João Silva",
    email: "joao@example.com",
    joinDate: new Date(),
    points: 1250,
    level: "Ouro",
  }
}

export async function getAvailableRewards(): Promise<Reward[]> {
  // Simulação de chamada à API
  return [
    {
      id: "1",
      title: "Ingresso para Evento",
      description: "Ingresso para evento exclusivo",
      pointsCost: 500,
      available: true,
      imageUrl: "/placeholder.svg?height=200&width=300",
    },
    {
      id: "2",
      title: "Desconto em Produtos",
      description: "20% de desconto em produtos selecionados",
      pointsCost: 300,
      available: true,
      imageUrl: "/placeholder.svg?height=200&width=300",
    },
    {
      id: "3",
      title: "Experiência VIP",
      description: "Acesso VIP a eventos especiais",
      pointsCost: 1000,
      available: true,
      imageUrl: "/placeholder.svg?height=200&width=300",
    },
  ]
}
