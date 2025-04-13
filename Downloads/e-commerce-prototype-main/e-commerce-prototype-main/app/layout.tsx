import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Poppins, Playfair_Display } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import PageTransition from "@/components/page-transition"

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
})

export const metadata: Metadata = {
  title: "D&Z - Unlimited marketing for growing businesses",
  description: "No hourly rates, tokens, or contracts—just insane results.",
  icons: {
    icon: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/dg%20logo-D3UpEGaUfDkgYBNorf72kp9xkcxlZp.jpeg",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${poppins.className} ${playfair.variable}`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <PageTransition>{children}</PageTransition>
        </ThemeProvider>
      </body>
    </html>
  )
}


import './globals.css'