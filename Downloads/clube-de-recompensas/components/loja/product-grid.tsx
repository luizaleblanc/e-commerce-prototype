"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

// Dados simulados de produtos
const products = [
  {
    id: 1,
    name: "Camiseta Oficial",
    price: 149.9,
    image: "/placeholder.svg?height=300&width=300",
    category: "vestuario",
  },
  {
    id: 2,
    name: "Boné Exclusivo",
    price: 89.9,
    image: "/placeholder.svg?height=300&width=300",
    category: "acessorios",
  },
  {
    id: 3,
    name: "Caneca Premium",
    price: 59.9,
    image: "/placeholder.svg?height=300&width=300",
    category: "acessorios",
  },
  {
    id: 4,
    name: "Moletom Oficial",
    price: 249.9,
    image: "/placeholder.svg?height=300&width=300",
    category: "vestuario",
  },
  {
    id: 5,
    name: "Chaveiro Colecionável",
    price: 29.9,
    image: "/placeholder.svg?height=300&width=300",
    category: "acessorios",
  },
  {
    id: 6,
    name: "Mousepad Gamer",
    price: 79.9,
    image: "/placeholder.svg?height=300&width=300",
    category: "acessorios",
  },
]

export function ProductGrid() {
  const [cart, setCart] = useState<number[]>([])

  const addToCart = (productId: number) => {
    setCart([...cart, productId])
  }

  const formatPrice = (price: number) => {
    return price.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    })
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Produtos</h2>
        <div className="flex items-center gap-2">
          <span className="text-sm">Ordenar por:</span>
          <select className="border rounded px-2 py-1 text-sm">
            <option>Mais recentes</option>
            <option>Menor preço</option>
            <option>Maior preço</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <Card key={product.id} className="overflow-hidden">
            <div className="relative h-64 w-full">
              <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
            </div>
            <CardContent className="pt-4">
              <h3 className="font-semibold text-lg">{product.name}</h3>
              <p className="text-xl font-bold text-[#7b1fa2] mt-1">{formatPrice(product.price)}</p>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Link href={`/loja/produto/${product.id}`} className="text-[#1a237e] hover:underline">
                Ver detalhes
              </Link>
              <Button onClick={() => addToCart(product.id)} className="bg-[#7b1fa2] hover:bg-[#6a1b9a]">
                Adicionar
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
