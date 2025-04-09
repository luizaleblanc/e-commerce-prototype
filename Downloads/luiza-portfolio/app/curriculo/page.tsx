"use client"

import { Header } from "@/components/header"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export default function Curriculo() {
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
        <div className="max-w-3xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-3xl font-medium mb-8"
          >
            Currículo
          </motion.h1>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-10"
          >
            <h2 className="text-2xl font-medium mb-4">Formação</h2>
            <ul className="space-y-3 list-disc pl-5">
              <li>Pós-Graduação em Educação Inclusiva - FACVEST (SC)</li>
              <li>Pós-Graduação em Psicomotricidade - FACVEST (SC)</li>
            </ul>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-10"
          >
            <h2 className="text-2xl font-medium mb-4">Currículo Artístico e Vivências</h2>
            <ul className="space-y-3 list-disc pl-5">
              <li>Sala de Aula Invertida (Teatro Musical) - 2020, com Caio Nunes, Helga Nemezyck e Carlos Leça</li>
              <li>On Broadway Experience (Salvador) - 2020</li>
              <li>Admitida e aprovada com bolsa de mérito na American Music and Dramatic Academy (New York)</li>
              <li>Canto com Saulo Vasconcellos e Paula Capovilla - SP (2018)</li>
              <li>Canto com Tadeu Mathias (2023)</li>
              <li>Aprovação do projeto "Minha Vida em Arte" no Conservatório de Málaga, Espanha (2025)</li>
            </ul>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mb-10"
          >
            <h2 className="text-2xl font-medium mb-4">Participações como Solista e Cantora Principal</h2>
            <ul className="space-y-3 list-disc pl-5">
              <li>
                Festivais de Encerramento da Jazz & Cia - Espaço de Artes:
                <ul className="space-y-1 mt-2 pl-5">
                  <li>2016 - A Bela e a Fera - Bela Camponesa (Teatro Musical)</li>
                  <li>2017 - Malévola (Dança e Canto)</li>
                  <li>2018 - Aladdin (Canto)</li>
                  <li>2019 - Viva, A Vida É Uma Festa (Canto, Dança e teatro)</li>
                  <li>2021 - Cruella (Canto, Dança e teatro)</li>
                  <li>2023 - A Pequena Sereia - Ariel (Teatro Musical)</li>
                </ul>
              </li>
              <li>V Festival da Paraíba (Semifinalista)</li>
              <li>Musical Síndroma - Audição para Corina Gore (Protagonista) no RJ - Final</li>
              <li>Formação na escola Wellington Fagner de atuação para TV e Audiovisual (com certificação)</li>
            </ul>
          </motion.section>
        </div>
      </motion.main>
    </div>
  )
}
