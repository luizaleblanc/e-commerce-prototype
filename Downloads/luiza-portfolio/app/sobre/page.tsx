"use client"

import { Header } from "@/components/header"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export default function Sobre() {
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
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
            <div>
              <motion.img
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: isLoaded ? 1 : 0, scale: isLoaded ? 1 : 0.9 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/luiza%20cantando-sfIOnFNu9proEIeSZfWQxuhjGjcanp.jpeg"
                alt="Luiza cantando em performance ao vivo"
                className="w-full h-auto rounded-md"
              />
            </div>
            <div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-3xl font-medium mb-6"
              >
                Sobre
              </motion.h1>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="space-y-4"
              >
                <p>
                  Luiza LeBlanc é uma multiartista com mais de cinco anos de atuação na área musical, com reconhecimento
                  internacional por instituições como a AMDA (EUA) e o Conservatório de Málaga (Espanha).
                </p>
                <p>
                  Há mais de três anos atua como professora de música, com foco em canto e musicalização infantil, na
                  cidade de João Pessoa.
                </p>
                <p>
                  Tem como referência uma escuta musical ampla, transitando por diversos estilos, do jazz ao rock. Entre
                  as maiores inspirações artísticas -além dos seus pais, também artistas-, destaca-se a cantora Amy
                  Winehouse.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.main>
    </div>
  )
}
