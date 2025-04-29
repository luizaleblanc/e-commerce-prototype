"use client"

import { useState } from "react"
import { Eye, EyeOff, User, Lock } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import AnimatedPage from "./components/animated-page"

export default function LoginPreview() {
  const [hidePassword, setHidePassword] = useState(true)

  return (
    <AnimatedPage>
      <div className="flex min-h-screen w-full flex-col lg:flex-row">
        {/* Login Form Section */}
        <div className="flex flex-1 flex-col items-center justify-center px-4 py-8 md:px-8 lg:px-16">
          <div className="w-full max-w-[400px]">
            {/* Circular user photo placeholder */}
            <div className="flex justify-center mb-6">
              <div className="h-24 w-24 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                {/* This is where a user photo would go */}
                <User size={40} className="text-gray-400" />
              </div>
            </div>

            <h1 className="text-2xl font-semibold text-center mb-1">Seja bem vindo(a)!</h1>
            <p className="text-sm text-gray-600 text-center mb-8">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua.
            </p>

            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-sm text-[#B8860B]">E-mail</label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#B8860B]">
                    <User size={16} />
                  </div>
                  <input
                    type="email"
                    placeholder="mail@email.com"
                    className="w-full rounded bg-gray-50 border border-gray-200 py-2.5 pl-10 pr-3 text-sm outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-sm text-[#B8860B]">Senha</label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#B8860B]">
                    <Lock size={16} />
                  </div>
                  <input
                    type={hidePassword ? "password" : "text"}
                    placeholder="••••••••"
                    className="w-full rounded bg-gray-50 border border-gray-200 py-2.5 pl-10 pr-10 text-sm outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setHidePassword(!hidePassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                  >
                    {hidePassword ? <Eye size={16} /> : <EyeOff size={16} />}
                  </button>
                </div>
              </div>

              <div className="text-sm">
                Esqueceu a senha?{" "}
                <Link href="/forgot-password" className="font-medium">
                  Clique aqui!
                </Link>
              </div>

              <button
                type="button"
                className="w-full bg-[#B8860B] text-white py-2.5 rounded font-medium hover:bg-[#a67719] transition-colors"
              >
                ENTRAR
              </button>
            </div>

            <div className="flex flex-col md:flex-row justify-between text-xs mt-auto pt-16 gap-4 md:gap-0">
              <a href="#" className="text-gray-700 text-center md:text-left">
                TERMOS DE USO
              </a>
              <a href="#" className="text-gray-700 text-center">
                POLÍTICAS DE PRIVACIDADE
              </a>
              <a href="#" className="text-gray-700 text-center md:text-right">
                CONTATO
              </a>
            </div>
          </div>
        </div>

        {/* Image Section - 720x1023 with guitar logo */}
        <div className="hidden lg:block relative" style={{ width: "720px", maxHeight: "100vh" }}>
          <div className="w-full h-full bg-white flex items-center justify-center" style={{ aspectRatio: "720/1023" }}>
            <div className="relative w-2/5 h-2/5 flex items-center justify-center">
              <Image
                src="/images/guitar-logo.png"
                alt="Logotipo de guitarra"
                width={200}
                height={200}
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </AnimatedPage>
  )
}
