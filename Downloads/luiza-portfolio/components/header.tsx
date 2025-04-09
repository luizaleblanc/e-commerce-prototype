"use client"

import Link from "next/link"
import { Instagram, Youtube } from "lucide-react"
import { useEffect, useState } from "react"

export function Header() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Check if we're on the client side
    if (typeof window !== "undefined") {
      // Initial check
      setIsMobile(window.innerWidth < 768)

      // Add resize listener
      const handleResize = () => {
        setIsMobile(window.innerWidth < 768)
      }

      window.addEventListener("resize", handleResize)

      // Cleanup
      return () => {
        window.removeEventListener("resize", handleResize)
      }
    }
  }, [])

  return (
    <header
      className={`container mx-auto px-4 py-8 ${isMobile ? "flex flex-col items-center gap-6" : "flex justify-between items-center"}`}
    >
      <div className={`h-24 relative ${isMobile ? "w-96" : "w-64"} flex ${isMobile ? "justify-center" : ""}`}>
        <Link href="/">
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Captura%20de%20tela%202025-04-05%20220847-vmzmWeQYs9JExayekiFCaW7VUpvyWC.png"
            alt="Luiza LeBlanc"
            className="object-contain h-full w-full"
          />
        </Link>
      </div>
      <nav className={`flex ${isMobile ? "flex-row items-center gap-8" : "items-center gap-6"}`}>
        <Link href="/sobre" className="text-sm hover:underline text-white">
          Sobre
        </Link>
        <Link href="/curriculo" className="text-sm hover:underline text-white">
          Currículo
        </Link>
        <Link href="/contato" className="text-sm hover:underline text-white">
          Contato
        </Link>
        <div className="flex items-center gap-4">
          <Link
            href="https://www.instagram.com/luizaleblanx?igsh=OTlncXMxN3libWh0&utm_source=qr"
            aria-label="Instagram"
            className="text-white hover:text-gray-300 transition-colors"
          >
            <Instagram size={20} />
          </Link>
          <Link
            href="https://www.youtube.com/@luizaleblanc"
            aria-label="YouTube"
            className="text-white hover:text-gray-300 transition-colors"
          >
            <Youtube size={20} />
          </Link>
        </div>
      </nav>
    </header>
  )
}
