"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Upload, ArrowLeft } from "lucide-react"
import NextImage from "next/image"
import { Switch } from "@/components/ui/switch"

export default function NewProductPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    points: "",
    stock: "",
    description: "",
    isActive: true,
    isFeatured: false,
  })
  const [productImage, setProductImage] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSwitchChange = (name: string, checked: boolean) => {
    setFormData((prev) => ({ ...prev, [name]: checked }))
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Aqui você implementaria a lógica para salvar o produto
      // Simulando um delay para demonstração
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Redirecionar para a lista de produtos
      router.push("/parceiro/admin/produtos")
    } catch (error) {
      console.error("Erro ao salvar produto:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0"
          onClick={() => router.push("/parceiro/admin/produtos")}
        >
          <ArrowLeft size={18} />
        </Button>
        <h1 className="text-2xl font-bold">Novo Produto</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Informações do Produto</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Nome do Produto</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Ex: Camiseta ILB"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Categoria</Label>
                <select
                  id="category"
                  name="category"
                  className="w-full p-2 border rounded-md"
                  value={formData.category}
                  onChange={handleChange}
                  required
                >
                  <option value="">Selecione uma categoria</option>
                  <option value="Vestuário">Vestuário</option>
                  <option value="Acessórios">Acessórios</option>
                  <option value="Ingressos">Ingressos</option>
                  <option value="Eletrônicos">Eletrônicos</option>
                  <option value="Outros">Outros</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="points">Valor em Pontos</Label>
                <Input
                  id="points"
                  name="points"
                  type="number"
                  value={formData.points}
                  onChange={handleChange}
                  placeholder="Ex: 1000"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="stock">Estoque</Label>
                <Input
                  id="stock"
                  name="stock"
                  type="number"
                  value={formData.stock}
                  onChange={handleChange}
                  placeholder="Ex: 50"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Descrição</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Descreva o produto detalhadamente..."
                rows={5}
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Imagem do Produto</Label>
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="isActive" className="text-base">
                    Produto Ativo
                  </Label>
                  <p className="text-sm text-gray-500">Produtos ativos ficam visíveis para os usuários</p>
                </div>
                <Switch
                  id="isActive"
                  checked={formData.isActive}
                  onCheckedChange={(checked) => handleSwitchChange("isActive", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="isFeatured" className="text-base">
                    Produto Destacado
                  </Label>
                  <p className="text-sm text-gray-500">Produtos destacados aparecem em primeiro lugar</p>
                </div>
                <Switch
                  id="isFeatured"
                  checked={formData.isFeatured}
                  onCheckedChange={(checked) => handleSwitchChange("isFeatured", checked)}
                />
              </div>
            </div>

            <div className="flex justify-end gap-4 pt-4">
              <Button type="button" variant="outline" onClick={() => router.push("/parceiro/admin/produtos")}>
                Cancelar
              </Button>
              <Button type="submit" className="bg-[#1a237e] hover:bg-[#3949ab]" disabled={isSubmitting}>
                {isSubmitting ? "Salvando..." : "Salvar Produto"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
