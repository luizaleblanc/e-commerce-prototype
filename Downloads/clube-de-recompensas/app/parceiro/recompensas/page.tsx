"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { PageTransition } from "@/components/page-transition"
import { Search, Trash2, Edit, Tag, Package, Upload, Plus } from "lucide-react"
import Link from "next/link"
import NextImage from "next/image"
import { useAuth } from "@/contexts/auth-context"
import { getSupabaseClient } from "@/lib/supabase/client"

export default function RewardsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [newProductImage, setNewProductImage] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [userRole, setUserRole] = useState<"partner" | "user" | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const { user } = useAuth()
  const supabase = getSupabaseClient()

  // Verificar o tipo de usuário ao carregar a página
  useEffect(() => {
    async function checkUserRole() {
      if (!user) {
        setIsLoading(false)
        return
      }

      try {
        const { data, error } = await supabase.from("profiles").select("role").eq("id", user.id).single()

        if (error) {
          console.error("Erro ao buscar perfil:", error)
          setUserRole("user") // Default para usuário normal em caso de erro
        } else {
          setUserRole((data?.role as "partner" | "user") || "user")
        }
      } catch (error) {
        console.error("Erro ao verificar tipo de usuário:", error)
        setUserRole("user")
      } finally {
        setIsLoading(false)
      }
    }

    checkUserRole()
  }, [user, supabase])

  // Dados de recompensas usando as imagens do carrossel
  const rewards = [
    {
      id: 1,
      name: "Mochila ILB",
      category: "Acessórios",
      points: "1500",
      image: "/ilb-mochila.png",
      stock: 25,
    },
    {
      id: 2,
      name: "Jaqueta ILB",
      category: "Vestuário",
      points: "2000",
      image: "/ilb-jaqueta.png",
      stock: 15,
    },
    {
      id: 4,
      name: "Camiseta ILB Modelo 1",
      category: "Vestuário",
      points: "1000",
      image: "/ilb-camiseta1.png",
      stock: 40,
    },
    {
      id: 5,
      name: "Camiseta ILB Modelo 2",
      category: "Vestuário",
      points: "1000",
      image: "/ilb-camiseta2.png",
      stock: 35,
    },
  ]

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setNewProductImage(file)

      // Criar URL para preview
      const fileUrl = URL.createObjectURL(file)
      setPreviewUrl(fileUrl)
    }
  }

  const handleUploadModalClose = () => {
    setShowUploadModal(false)
    setNewProductImage(null)
    setPreviewUrl(null)
  }

  const filteredRewards = rewards.filter(
    (reward) =>
      reward.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reward.category.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#1a237e]"></div>
      </div>
    )
  }

  return (
    <PageTransition>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Minhas Recompensas</h1>

          {user && userRole === "partner" && (
            <div className="flex gap-3">
              <Button
                className="bg-[#3949ab] hover:bg-[#5c6bc0] flex items-center gap-2"
                onClick={() => setShowUploadModal(true)}
              >
                <Plus size={18} />
                NOVO PRODUTO
              </Button>
              <Link href="/parceiro/recompensas/cadastrar">
                <Button className="bg-[#3949ab] hover:bg-[#5c6bc0]">CADASTRAR PRODUTOS</Button>
              </Link>
            </div>
          )}
        </div>

        <div className="relative mb-6">
          <input
            type="text"
            placeholder="O QUE VOCÊ PROCURA?"
            className="w-full p-3 pl-10 border rounded-md bg-gray-100"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        </div>

        {/* Estilo global para inputs de formulário */}
        <style jsx global>{`
          input, textarea, select, .form-text {
            color: black !important;
          }
        `}</style>

        <div className="flex flex-col gap-6">
          {filteredRewards.map((reward) => (
            <Card key={reward.id} className="shadow-md overflow-hidden">
              <CardContent className="p-0">
                <div className="flex flex-col md:flex-row">
                  <div className="relative h-64 md:h-auto md:w-1/3 bg-transparent">
                    <NextImage src={reward.image} alt={reward.name} fill className="object-cover" />
                  </div>
                  <div className="p-5 bg-gray-100 text-black md:w-2/3">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-bold text-xl">{reward.name}</h3>
                      <span className="inline-block bg-gray-200 text-gray-800 px-2 py-0.5 rounded-full text-xs">
                        {reward.category}
                      </span>
                    </div>
                    <div className="flex items-center justify-between mb-3 text-gray-700">
                      <div className="flex items-center gap-1">
                        <Tag size={16} />
                        <span className="font-bold text-black">{reward.points}</span> pontos
                      </div>
                      <div className="flex items-center gap-1">
                        <Package size={16} />
                        <span>Estoque: {reward.stock}</span>
                      </div>
                    </div>
                    {userRole === "partner" ? (
                      <div className="flex items-center gap-2 mt-4">
                        <Button
                          variant="secondary"
                          className="flex-1 flex items-center justify-center gap-1 bg-white text-black hover:bg-gray-100"
                        >
                          <Edit size={16} />
                          Editar
                        </Button>
                        <Button
                          variant="secondary"
                          className="flex-1 flex items-center justify-center gap-1 bg-white text-red-500 hover:bg-gray-100"
                        >
                          <Trash2 size={16} />
                          Excluir
                        </Button>
                      </div>
                    ) : (
                      <Button className="w-full bg-white text-black hover:bg-gray-100">Resgatar</Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Modal para upload de novo produto - apenas para parceiros */}
      {showUploadModal && userRole === "partner" && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-6">Adicionar Novo Produto</h2>

              <div className="space-y-4">
                <div>
                  <label htmlFor="product-name" className="block text-gray-700 mb-1">
                    Nome do Produto
                  </label>
                  <input
                    id="product-name"
                    type="text"
                    className="w-full p-2 border rounded-md bg-gray-50"
                    placeholder="Ex: Camiseta ILB"
                  />
                </div>

                <div>
                  <label htmlFor="product-category" className="block text-gray-700 mb-1">
                    Categoria
                  </label>
                  <select id="product-category" className="w-full p-2 border rounded-md bg-gray-50">
                    <option value="">Selecione uma categoria</option>
                    <option value="Vestuário">Vestuário</option>
                    <option value="Acessórios">Acessórios</option>
                    <option value="Ingressos">Ingressos</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="product-points" className="block text-gray-700 mb-1">
                    Pontos
                  </label>
                  <input
                    id="product-points"
                    type="number"
                    className="w-full p-2 border rounded-md bg-gray-50"
                    placeholder="Ex: 1000"
                  />
                </div>

                <div>
                  <label htmlFor="product-stock" className="block text-gray-700 mb-1">
                    Estoque
                  </label>
                  <input
                    id="product-stock"
                    type="number"
                    className="w-full p-2 border rounded-md bg-gray-50"
                    placeholder="Ex: 20"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-1">Imagem do Produto</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-md p-6 flex flex-col items-center justify-center">
                    {previewUrl ? (
                      <div className="relative h-48 w-full mb-4">
                        <NextImage src={previewUrl} alt="Preview" fill className="object-contain" />
                      </div>
                    ) : (
                      <Upload size={24} className="text-gray-400 mb-2" />
                    )}

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
                      className="mt-2"
                    >
                      {previewUrl ? "Trocar imagem" : "Selecionar imagem"}
                    </Button>

                    {previewUrl && <p className="text-sm text-gray-500 mt-2">{newProductImage?.name}</p>}
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-4 mt-8">
                <Button type="button" variant="outline" onClick={handleUploadModalClose}>
                  Cancelar
                </Button>
                <Button type="button" className="bg-[#3949ab] hover:bg-[#5c6bc0]">
                  Salvar Produto
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </PageTransition>
  )
}
