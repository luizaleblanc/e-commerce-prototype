"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { PageTransition } from "@/components/page-transition"
import { Upload } from "lucide-react"
import { useRouter } from "next/navigation"
import NextImage from "next/image"
import { useAuth } from "@/contexts/auth-context"

export default function CreateRewardPage() {
  const router = useRouter()
  const { user, userRole, loading } = useAuth()
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    quantity: "",
    price: "",
    description: "",
  })
  const [productImage, setProductImage] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  // Verificar se o usuário é parceiro
  useEffect(() => {
    if (!loading && (!user || userRole !== "partner")) {
      router.push("/parceiro/recompensas")
    }
  }, [user, userRole, loading, router])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setProductImage(file)

      // Criar URL para preview
      const fileUrl = URL.createObjectURL(file)
      setPreviewUrl(fileUrl)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Aqui você implementaria a lógica para salvar a recompensa
    router.push("/parceiro/recompensas")
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#1a237e]"></div>
      </div>
    )
  }

  // Se não for parceiro, não renderizar o conteúdo
  if (!user || userRole !== "partner") {
    return null
  }

  return (
    <PageTransition>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Cadastrar produtos</h1>

        <Card>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="title" className="block text-gray-700 mb-1">
                    Título
                  </label>
                  <input
                    id="title"
                    name="title"
                    type="text"
                    className="w-full p-2 border rounded-md bg-gray-50"
                    placeholder="Nome do produto"
                    value={formData.title}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="category" className="block text-gray-700 mb-1">
                    Categoria
                  </label>
                  <select
                    id="category"
                    name="category"
                    className="w-full p-2 border rounded-md bg-gray-50 appearance-none"
                    value={formData.category}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Selecione uma categoria</option>
                    <option value="Vestuário">Vestuário</option>
                    <option value="Acessórios">Acessórios</option>
                    <option value="Ingressos">Ingressos</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="quantity" className="block text-gray-700 mb-1">
                    Quantidade
                  </label>
                  <input
                    id="quantity"
                    name="quantity"
                    type="number"
                    className="w-full p-2 border rounded-md bg-gray-50"
                    placeholder="000"
                    value={formData.quantity}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="price" className="block text-gray-700 mb-1">
                    Valor em pontos
                  </label>
                  <input
                    id="price"
                    name="price"
                    type="text"
                    className="w-full p-2 border rounded-md bg-gray-50"
                    placeholder="Ex: 1000"
                    value={formData.price}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="description" className="block text-gray-700 mb-1">
                  Descrição
                </label>
                <textarea
                  id="description"
                  name="description"
                  className="w-full p-2 border rounded-md bg-gray-50 h-32"
                  placeholder="Descreva o produto"
                  value={formData.description}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>

              <div>
                <label className="block text-gray-700 mb-1">Imagem</label>
                <div className="border-2 border-dashed border-gray-300 rounded-md p-6 flex flex-col items-center justify-center">
                  {previewUrl ? (
                    <div className="relative h-64 w-full mb-4">
                      <NextImage src={previewUrl} alt="Preview" fill className="object-contain" />
                    </div>
                  ) : (
                    <Upload size={24} className="text-gray-400 mb-2" />
                  )}

                  <p className="text-gray-500 text-center mb-2">
                    {previewUrl ? "Clique para trocar a imagem" : "Faça upload da imagem do produto"}
                  </p>
                  <p className="text-gray-400 text-sm">JPG, PNG (recomendado: 800x800px)</p>

                  <input
                    type="file"
                    id="product-image"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageChange}
                  />

                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => document.getElementById("product-image")?.click()}
                    className="mt-4"
                  >
                    {previewUrl ? "Trocar imagem" : "Selecionar imagem"}
                  </Button>
                </div>
              </div>

              <div className="flex justify-end gap-4 pt-4">
                <Button type="button" variant="outline" onClick={() => router.push("/parceiro/recompensas")}>
                  CANCELAR
                </Button>
                <Button type="submit" className="bg-[#3949ab] hover:bg-[#5c6bc0]">
                  SALVAR
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </PageTransition>
  )
}
