import Link from "next/link"
import NextImage from "next/image"
import { Button } from "@/components/ui/button"

export function Footer() {
  return (
    <footer className="bg-[#1a237e] text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center md:items-start">
            <div className="flex justify-center mb-4">
              <NextImage src="/coin-logo.png" alt="Logo" width={60} height={60} className="filter brightness-150" />
            </div>
            <Button className="bg-transparent border border-white hover:bg-[#7b1fa2] transition-colors text-white">
              Fale Conosco
            </Button>
          </div>

          <div className="text-center md:text-left">
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-sm text-gray-300 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/ilb" className="text-sm text-gray-300 hover:text-white transition-colors">
                  Seja um ILB
                </Link>
              </li>
              <li>
                <Link href="/parceiro" className="text-sm text-gray-300 hover:text-white transition-colors">
                  Área do Parceiro
                </Link>
              </li>
              <li>
                <Link href="/contato" className="text-sm text-gray-300 hover:text-white transition-colors">
                  Contato
                </Link>
              </li>
              <li>
                <Link href="/api-docs" className="text-sm text-gray-300 hover:text-white transition-colors">
                  API Docs
                </Link>
              </li>
            </ul>
          </div>

          <div className="flex flex-col items-center md:items-end justify-center h-full">
            <ul className="space-y-2 text-sm text-gray-300">
              <li>Email: contato@clubederecompensas.com</li>
              <li>Telefone: (11) 1234-5678</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-4 text-center">
          <p className="text-sm text-white">&copy; {new Date().getFullYear()} Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
