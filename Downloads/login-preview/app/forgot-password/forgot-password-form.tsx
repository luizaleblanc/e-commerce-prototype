"use client"
import { User } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function ForgotPasswordForm() {
  const router = useRouter()

  return (
    <div className="flex min-h-screen w-full flex-col lg:flex-row">
      {/* Form Section */}
      <div className="flex flex-1 flex-col items-center justify-center px-4 py-8 md:px-8 lg:px-16">
        <div className="w-full max-w-[400px]">
          {/* Circular logo placeholder */}
          <div className="flex justify-center mb-6">
            <div className="h-20 w-20 md:h-24 md:w-24 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
              {/* This is where a logo would go */}
              <User size={32} className="text-gray-400" />
            </div>
          </div>

          <h1 className="text-xl md:text-2xl font-semibold text-center mb-1">Esqueceu sua senha?</h1>
          <p className="text-xs md:text-sm text-gray-600 text-center mb-6 md:mb-8 px-2 md:px-0">
            Digite seu e-mail para que possamos enviar um código de verificação.
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

            <button
              type="button"
              className="w-full bg-[#B8860B] text-white py-2.5 rounded font-medium hover:bg-[#a67719] transition-colors"
              onClick={() => router.push("/reset-password")}
            >
              CONTINUAR
            </button>

            <div className="text-sm text-center">
              <Link href="/" className="text-gray-700 hover:underline">
                Voltar para o login
              </Link>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between text-xs mt-auto pt-8 md:pt-16 gap-4 md:gap-0">
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

      {/* Image Section - 720x1023 with circle logo */}
      <div className="hidden lg:block relative" style={{ width: "720px", maxHeight: "100vh" }}>
        <div className="w-full h-full bg-white flex items-center justify-center" style={{ aspectRatio: "720/1023" }}>
          <div className="relative w-2/5 h-2/5 flex items-center justify-center">
            <Image
              src="/images/logo-circle.png"
              alt="Logotipo circular"
              width={200}
              height={200}
              className="object-contain"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  )
}
