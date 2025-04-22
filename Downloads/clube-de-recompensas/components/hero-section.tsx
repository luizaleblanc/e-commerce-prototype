import NextImage from "next/image"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="flex-1 relative overflow-hidden">
      {/* Full background image */}
      <NextImage src="/hero-background.png" alt="Hero Background" fill className="object-cover" priority />

      <div className="container mx-auto h-full relative z-10 py-20">
        {/* Botão posicionado abaixo do texto CLUBE DE RECOMPENSAS na imagem */}
        <div className="flex justify-end mr-10 mt-40">
          <div className="flex flex-col items-end">
            {/* Espaço para o texto que já está na imagem */}
            <div className="h-24"></div>
            {/* Botão abaixo do texto */}
            <Button className="bg-[#7b1fa2] hover:bg-[#6a1b9a] text-white font-bold py-3 px-8 rounded-md text-lg mt-4">
              SEJA UM ILB
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
