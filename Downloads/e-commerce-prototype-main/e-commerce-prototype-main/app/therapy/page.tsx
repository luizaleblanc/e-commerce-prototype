"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export default function TherapyPage() {
  return (
    <main className="min-h-screen bg-[#224058] text-white">
      {/* Header */}
      <header className="bg-[#224058] text-white border-b border-[#2d5170]">
        <div className="container mx-auto px-4 flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Captura%20de%20tela%202025-03-16%20142653-Xl7ITJPPfcozVcS49FdESVi7yMDymo.png"
              alt="Dingus and Zazzy Logo"
              width={180}
              height={60}
              className="h-10 w-auto"
            />
          </Link>
          <Link
            href="/apply"
            className="text-white hover:text-yellow-500 flex items-center transition-colors duration-300"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Services
          </Link>
        </div>
      </header>

      {/* Content */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-2xl mx-auto bg-[#1a3246] rounded-2xl p-8 shadow-lg"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl font-bold mb-6 text-center">Book Your Creative Therapy Session</h1>
            <p className="text-gray-300 mb-6">
              Let's chat about your creative needs and how Dingus and Zazzy can help your business grow. Fill out the
              form below to schedule a no-obligation consultation with our team.
            </p>

            <motion.form
              className="space-y-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              onSubmit={(e) => {
                e.preventDefault()

                // Get form data
                const formData = new FormData(e.currentTarget)
                const name = formData.get("name")
                const email = formData.get("email")
                const company = formData.get("company")
                const services = formData.get("services")
                const message = formData.get("message")

                // Create mailto link with form data
                const subject = `Therapy Session Request from ${name} - ${company}`
                const body = `
Name: ${name}
Email: ${email}
Company: ${company}
Services Interested In: ${services}
Message: ${message}
              `

                // Open email client with pre-filled data
                window.location.href = `mailto:hi@dingusandzazzy.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
              }}
            >
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full px-4 py-2 bg-[#2d5170] border border-[#3d6180] rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all duration-300"
                  placeholder="John Doe"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-4 py-2 bg-[#2d5170] border border-[#3d6180] rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all duration-300"
                  placeholder="john@example.com"
                  required
                />
              </div>

              <div>
                <label htmlFor="company" className="block text-sm font-medium mb-1">
                  Company Name
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  className="w-full px-4 py-2 bg-[#2d5170] border border-[#3d6180] rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all duration-300"
                  placeholder="Your Company"
                  required
                />
              </div>

              <div>
                <label htmlFor="services" className="block text-sm font-medium mb-1">
                  Services You're Interested In
                </label>
                <select
                  id="services"
                  name="services"
                  className="w-full px-4 py-2 bg-[#2d5170] border border-[#3d6180] rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all duration-300"
                  required
                >
                  <option value="">Select a service</option>
                  <option value="branding">Branding</option>
                  <option value="web-development">Web Development</option>
                  <option value="social-media">Social Media</option>
                  <option value="graphic-design">Graphic Design</option>
                  <option value="copywriting">Copywriting</option>
                  <option value="video-editing">Video Editing</option>
                  <option value="all">All Services</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-1">
                  Tell us about your project
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  className="w-full px-4 py-2 bg-[#2d5170] border border-[#3d6180] rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all duration-300"
                  placeholder="What are your creative needs and goals?"
                  required
                ></textarea>
              </div>

              <Button
                type="submit"
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-[#224058] py-3 font-bold rounded-xl transition-all duration-300"
              >
                Schedule Your Therapy Sesh
              </Button>
            </motion.form>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#224058] text-white py-8 text-center">
        <div className="container mx-auto px-4">
          <div className="mb-4">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Captura%20de%20tela%202025-03-16%20142653-Xl7ITJPPfcozVcS49FdESVi7yMDymo.png"
              alt="Dingus and Zazzy Logo"
              width={120}
              height={40}
              className="mx-auto"
            />
          </div>
          <div className="flex justify-center space-x-6 mb-4">
            <a
              href="https://www.linkedin.com/company/dingus-zazzy/posts/?feedView=all"
              className="text-white hover:text-yellow-500 transition-colors duration-300"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>
            <a
              href="https://www.instagram.com/dingusandzazzy/"
              className="text-white hover:text-yellow-500 transition-colors duration-300"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 max-w-3xl mx-auto">
            <div className="text-center">
              <h3 className="text-sm font-semibold mb-1">Contact</h3>
              <p className="text-gray-300 text-xs">(780) 701-3390</p>
              <p className="text-gray-300 text-xs">hi@dingusandzazzy.com</p>
            </div>

            <div className="text-center">
              <h3 className="text-sm font-semibold mb-1">Address</h3>
              <p className="text-gray-300 text-xs">4721 50 Ave</p>
              <p className="text-gray-300 text-xs">Leduc, Alberta T9E 6Y5</p>
            </div>
          </div>

          <div className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} Dingus and Zazzy. All rights reserved.
          </div>
        </div>
      </footer>
    </main>
  )
}
