import Image from "next/image"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Simulação de dados do produto
const product = {
  id: 1,
  name: "Camiseta Oficial",
  price: 149.9,
  description: "Camiseta oficial do Clube de Recompensas, feita com material de alta qualidade e design exclusivo.",
  features: ["100% Algodão", "Estampa de alta durabilidade", "Disponível em vários tamanhos", "Edição limitada"],
  images: [
    "/placeholder.svg?height=600&width=600",
    "/placeholder.svg?height=600&width=600",
    "/placeholder.svg?height=600&width=600",
  ],
  sizes: ["P", "M", "G", "GG"],
  colors: ["Preto", "Branco", "Azul"],
}

export default function ProductPage({ params }: { params: { id: string } }) {
  const formatPrice = (price: number) => {
    return price.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    })
  }

  return (
    <main className="min-h-screen flex flex-col">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Imagens do produto */}
          <div className="md:w-1/2">
            <div className="relative h-96 w-full mb-4 rounded-lg overflow-hidden">
              <Image src={product.images[0] || "/placeholder.svg"} alt={product.name} fill className="object-contain" />
            </div>
            <div className="grid grid-cols-3 gap-2">
              {product.images.map((image, index) => (
                <div key={index} className="relative h-24 rounded-md overflow-hidden">
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`${product.name} - Imagem ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Detalhes do produto */}
          <div className="md:w-1/2">
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            <p className="text-2xl font-bold text-[#7b1fa2] mb-4">{formatPrice(product.price)}</p>

            <p className="text-gray-600 mb-6">{product.description}</p>

            <div className="mb-6">
              <h3 className="font-semibold mb-2">Tamanho:</h3>
              <div className="flex gap-2">
                {product.sizes.map((size) => (
                  <Button key={size} variant="outline" className="w-12 h-12">
                    {size}
                  </Button>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <h3 className="font-semibold mb-2">Cor:</h3>
              <div className="flex gap-2">
                {product.colors.map((color) => (
                  <Button key={color} variant="outline">
                    {color}
                  </Button>
                ))}
              </div>
            </div>

            <div className="flex gap-4 mb-8">
              <div className="w-24">
                <select className="w-full border rounded-md p-2">
                  {[1, 2, 3, 4, 5].map((num) => (
                    <option key={num} value={num}>
                      {num}
                    </option>
                  ))}
                </select>
              </div>
              <Button className="flex-1 bg-[#7b1fa2] hover:bg-[#6a1b9a] text-lg">Adicionar ao Carrinho</Button>
            </div>

            <Tabs defaultValue="description">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="description">Descrição</TabsTrigger>
                <TabsTrigger value="features">Características</TabsTrigger>
                <TabsTrigger value="shipping">Envio</TabsTrigger>
              </TabsList>
              <TabsContent value="description" className="p-4">
                <p>{product.description}</p>
              </TabsContent>
              <TabsContent value="features" className="p-4">
                <ul className="list-disc pl-5 space-y-1">
                  {product.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </TabsContent>
              <TabsContent value="shipping" className="p-4">
                <p>Entrega para todo o Brasil. Prazo de envio de 5 a 10 dias úteis após a confirmação do pagamento.</p>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
