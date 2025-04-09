"use client"

import type React from "react"

import { Header } from "@/components/header"
import { Instagram, Mail, Phone } from "lucide-react"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export default function Contato() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Format the message for WhatsApp
    const message = `Olá, meu nome é ${formData.name}. ${formData.message} (Email: ${formData.email})`
    const encodedMessage = encodeURIComponent(message)

    // Open WhatsApp with the pre-filled message
    window.open(`https://wa.me/5583991429201?text=${encodedMessage}`, "_blank")
  }

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
            Contato
          </motion.h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: isLoaded ? 1 : 0, x: isLoaded ? 0 : -20 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <p className="mb-8">
                Para informações sobre aulas, apresentações ou colaborações, entre em contato através das informações
                abaixo.
              </p>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail size={20} className="text-gray-300" />
                  <a href="mailto:luizaa.fq@gmail.com" className="hover:underline">
                    luizaa.fq@gmail.com
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Phone size={20} className="text-gray-300" />
                  <a href="tel:+5583991429201" className="hover:underline">
                    (83) 99142-9201
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Instagram size={20} className="text-gray-300" />
                  <a
                    href="https://www.instagram.com/luizaleblanx?igsh=OTlncXMxN3libWh0&utm_source=qr"
                    className="hover:underline"
                  >
                    @luizaleblanx
                  </a>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: isLoaded ? 1 : 0, x: isLoaded ? 0 : 20 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-1">
                    Nome
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-700 rounded-sm bg-gray-900 text-white"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-700 rounded-sm bg-gray-900 text-white"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-1">
                    Mensagem
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-700 rounded-sm bg-gray-900 text-white"
                    required
                  ></textarea>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="px-4 py-2 bg-white text-black hover:bg-gray-200 transition-colors"
                >
                  Enviar Mensagem
                </motion.button>
              </form>
            </motion.div>
          </div>
        </div>
      </motion.main>
    </div>
  )
}
