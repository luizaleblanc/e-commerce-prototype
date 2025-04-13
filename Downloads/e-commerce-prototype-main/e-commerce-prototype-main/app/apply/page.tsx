"use client"

import Image from "next/image"
import Link from "next/link"
import { Check, ArrowLeft } from "lucide-react"
import { motion } from "framer-motion"

// Animation variants for staggered animations
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export default function ApplyPage() {
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
          <Link href="/" className="text-white hover:text-yellow-500 flex items-center transition-colors duration-300">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-4xl mx-auto text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">
              Unlimited Creative Services for Growing Businesses
            </h1>
            <p className="text-xl text-gray-300">
              At Dingus and Zazzy, we provide all the creative services you need with no hourly rates, no contracts, and
              no limits—just insane results.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="pb-16 md:pb-24">
        <div className="container mx-auto px-4">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants} className="bg-[#1a3246] rounded-2xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <span className="bg-[#7FB3D5] rounded-full p-2 mr-3 flex items-center justify-center">
                  <Check className="h-5 w-5 text-[#224058]" />
                </span>
                Our Services
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center">
                  <div className="bg-[#7FB3D5] rounded-full p-1 mr-3 flex-shrink-0">
                    <Check className="h-4 w-4 text-[#224058]" />
                  </div>
                  <span>Branding</span>
                </div>
                <div className="flex items-center">
                  <div className="bg-[#7FB3D5] rounded-full p-1 mr-3 flex-shrink-0">
                    <Check className="h-4 w-4 text-[#224058]" />
                  </div>
                  <span>Web Development</span>
                </div>
                <div className="flex items-center">
                  <div className="bg-[#7FB3D5] rounded-full p-1 mr-3 flex-shrink-0">
                    <Check className="h-4 w-4 text-[#224058]" />
                  </div>
                  <span>Social Media</span>
                </div>
                <div className="flex items-center">
                  <div className="bg-[#7FB3D5] rounded-full p-1 mr-3 flex-shrink-0">
                    <Check className="h-4 w-4 text-[#224058]" />
                  </div>
                  <span>Strategy</span>
                </div>
                <div className="flex items-center">
                  <div className="bg-[#7FB3D5] rounded-full p-1 mr-3 flex-shrink-0">
                    <Check className="h-4 w-4 text-[#224058]" />
                  </div>
                  <span>Newsletters</span>
                </div>
                <div className="flex items-center">
                  <div className="bg-[#7FB3D5] rounded-full p-1 mr-3 flex-shrink-0">
                    <Check className="h-4 w-4 text-[#224058]" />
                  </div>
                  <span>Graphic Design</span>
                </div>
                <div className="flex items-center">
                  <div className="bg-[#7FB3D5] rounded-full p-1 mr-3 flex-shrink-0">
                    <Check className="h-4 w-4 text-[#224058]" />
                  </div>
                  <span>Illustration</span>
                </div>
                <div className="flex items-center">
                  <div className="bg-[#7FB3D5] rounded-full p-1 mr-3 flex-shrink-0">
                    <Check className="h-4 w-4 text-[#224058]" />
                  </div>
                  <span>Media Buying</span>
                </div>
                <div className="flex items-center">
                  <div className="bg-[#7FB3D5] rounded-full p-1 mr-3 flex-shrink-0">
                    <Check className="h-4 w-4 text-[#224058]" />
                  </div>
                  <span>Copywriting</span>
                </div>
                <div className="flex items-center">
                  <div className="bg-[#7FB3D5] rounded-full p-1 mr-3 flex-shrink-0">
                    <Check className="h-4 w-4 text-[#224058]" />
                  </div>
                  <span>Video Editing</span>
                </div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="bg-[#1a3246] rounded-2xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold mb-6">How We Work</h2>
              <p className="mb-4">
                Unlike traditional agencies, we don't bill by the hour or limit revisions. Our subscription model gives
                you unlimited access to our creative team for a flat monthly fee.
              </p>
              <p className="mb-4">
                We become an extension of your team, working directly in your platforms and tools to deliver
                high-quality creative work without the usual agency headaches.
              </p>
              <p>
                No more surprise bills, scope creep, or endless approval processes—just great creative work when you
                need it.
              </p>
            </motion.div>
          </motion.div>

          {/* Featured Services */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.3 }}
          >
            <motion.div variants={itemVariants} className="bg-[#1a3246] rounded-2xl overflow-hidden shadow-lg">
              <div className="p-4 bg-[#224058]">
                <h3 className="text-xl font-bold text-center">Graphic Design</h3>
              </div>
              <div className="p-6">
                <p className="text-gray-300 text-center mb-4">
                  Transforming ideas into visually stunning designs that tell a compelling story and engage your
                  audience across multiple platforms.
                </p>
                <div className="flex flex-wrap gap-2 justify-center">
                  <span className="bg-[#2d5170] px-3 py-1 rounded-full text-sm">Packaging</span>
                  <span className="bg-[#2d5170] px-3 py-1 rounded-full text-sm">Brochures</span>
                  <span className="bg-[#2d5170] px-3 py-1 rounded-full text-sm">Digital Assets</span>
                </div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="bg-[#1a3246] rounded-2xl overflow-hidden shadow-lg">
              <div className="p-4 bg-[#224058]">
                <h3 className="text-xl font-bold text-center">Branding</h3>
              </div>
              <div className="p-6">
                <p className="text-gray-300 text-center mb-4">
                  Crafting memorable identities that reflect your vision and values, helping your brand stand out and
                  connect with your audience.
                </p>
                <div className="flex flex-wrap gap-2 justify-center">
                  <span className="bg-[#2d5170] px-3 py-1 rounded-full text-sm">Logo Design</span>
                  <span className="bg-[#2d5170] px-3 py-1 rounded-full text-sm">Brand Guidelines</span>
                  <span className="bg-[#2d5170] px-3 py-1 rounded-full text-sm">Visual Identity</span>
                </div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="bg-[#1a3246] rounded-2xl overflow-hidden shadow-lg">
              <div className="p-4 bg-[#224058]">
                <h3 className="text-xl font-bold text-center">Social Media</h3>
              </div>
              <div className="p-6">
                <p className="text-gray-300 text-center mb-4">
                  Managing and curating impactful content strategies that amplify your brand's presence, engage your
                  community, and boost online growth.
                </p>
                <div className="flex flex-wrap gap-2 justify-center">
                  <span className="bg-[#2d5170] px-3 py-1 rounded-full text-sm">Content Creation</span>
                  <span className="bg-[#2d5170] px-3 py-1 rounded-full text-sm">Analytics</span>
                  <span className="bg-[#2d5170] px-3 py-1 rounded-full text-sm">Paid Advertising</span>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Why Choose Us */}
          <motion.div
            className="bg-[#1a3246] rounded-2xl p-8 shadow-lg mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <h2 className="text-2xl font-bold mb-6 text-center">Why Choose Dingus and Zazzy?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-[#7FB3D5] rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-[#224058]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Predictable Pricing</h3>
                <p className="text-gray-300">
                  Flat monthly fee with no surprise costs, scope creep, or hourly billing.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-[#7FB3D5] rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-[#224058]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Fast Turnaround</h3>
                <p className="text-gray-300">
                  Quick delivery on all projects with our dedicated team of creative professionals.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-[#7FB3D5] rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-[#224058]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Dedicated Team</h3>
                <p className="text-gray-300">Work with the same team who understands your brand and business goals.</p>
              </div>
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <h2 className="text-3xl font-bold mb-6">Ready to transform your creative process?</h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Let's chat about how Dingus and Zazzy can help your business grow with unlimited creative services.
            </p>
            <Link
              href="/therapy"
              className="inline-flex items-center justify-center bg-yellow-500 hover:bg-yellow-600 text-[#224058] px-8 py-4 font-bold rounded-xl text-lg transition-colors duration-300"
            >
              Book a Therapy Sesh
            </Link>
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
