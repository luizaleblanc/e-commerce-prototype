import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProductGrid } from "@/components/loja/product-grid"
import { CategoryFilter } from "@/components/loja/category-filter"

export default function StorePage() {
  return (
    <main className="min-h-screen flex flex-col">
      <Header />

      <div className="bg-[#1a237e] text-white py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold">Loja Oficial</h1>
          <p className="mt-2">Produtos exclusivos para membros ILB</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-6">
          <aside className="w-full md:w-64 flex-shrink-0">
            <CategoryFilter />
          </aside>

          <div className="flex-1">
            <ProductGrid />
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
