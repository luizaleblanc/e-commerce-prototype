"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/contexts/auth-context"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function Header() {
  const { user, signOut } = useAuth()

  return (
    <header className="bg-gradient-to-r from-[#1a237e] to-[#7b1fa2] py-2 px-6 flex justify-between items-center">
      <div className="flex items-center gap-3">
        <Link href="/">
          <Image src="/coin-logo.png" alt="Logo Clube de Recompensas" width={50} height={50} />
        </Link>
        <Image src="/clube-text.png" alt="Clube de Recompensas" width={150} height={45} className="mt-1" />
      </div>
      <div className="flex items-center gap-4">
        <Link href="/parceiro" className="text-white hover:text-gray-200 transition-colors text-sm">
          ÁREA DO PARCEIRO
        </Link>

        {user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="bg-white text-[#1a237e] hover:bg-gray-100 rounded-full flex items-center gap-2 py-1 px-3">
                <div className="bg-[#1a237e] rounded-full p-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                </div>
                <span className="text-xs">
                  Minha
                  <br />
                  Conta
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/perfil">Meu Perfil</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => signOut()}>Sair</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Link href="/login">
            <Button className="bg-white text-[#1a237e] hover:bg-gray-100 rounded-full flex items-center gap-2 py-1 px-3">
              <div className="bg-[#1a237e] rounded-full p-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </div>
              <span className="text-xs">
                Faça seu
                <br />
                Login ou Cadastro
              </span>
            </Button>
          </Link>
        )}
      </div>
    </header>
  )
}
