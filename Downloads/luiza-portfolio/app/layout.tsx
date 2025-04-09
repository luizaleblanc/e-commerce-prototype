import type React from "react"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Luiza LeBlanc | Multiartista e Educadora Musical",
  description:
    "Portfolio de Luiza LeBlanc, multiartista com experiência em teatro musical e performance vocal, atua como docente em canto e musicalização infantil.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.className} bg-black text-white`}>{children}</body>
    </html>
  )
}


import './globals.css'