"use client"

import { Header } from "@/components/header"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
        transition={{ duration: 0.6 }}
        className="container mx-auto px-4 py-16"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: isLoaded ? 1 : 0, x: isLoaded ? 0 : -20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-xl"
          >
            <h1 className="text-4xl md:text-5xl font-medium leading-tight mb-6">
              Luiza LeBlanc, multiartista com experiência em teatro musical e performance vocal, atua como docente em
              canto e musicalização infantil.
            </h1>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: isLoaded ? 1 : 0, x: isLoaded ? 0 : 20 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative aspect-square w-full"
          >
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-04-05%20at%2021.58.48-fbYmqt9fP32fz6UWOvJM1nPsPs1PRI.jpeg"
              alt="Luiza LeBlanc cantando em performance ao vivo com a banda School of Rock"
              className="w-full h-full object-cover rounded-md"
            />
          </motion.div>
        </div>
      </motion.main>
    </div>
  )
}
