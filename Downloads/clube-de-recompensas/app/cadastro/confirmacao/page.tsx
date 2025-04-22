import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function ConfirmationPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <div className="flex-1 flex items-center justify-center bg-gray-100 dark:bg-gray-900 py-12">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Cadastro Realizado!</CardTitle>
            <CardDescription className="text-center">Verifique seu email para confirmar sua conta</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-[#7b1fa2] rounded-full flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
              </div>
            </div>
            <p className="mb-4">
              Enviamos um email de confirmação para o endereço fornecido. Por favor, verifique sua caixa de entrada e
              clique no link de confirmação para ativar sua conta.
            </p>
            <p className="text-sm text-gray-500">
              Se você não receber o email em alguns minutos, verifique sua pasta de spam ou lixo eletrônico.
            </p>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Link href="/login">
              <Button className="bg-[#7b1fa2] hover:bg-[#6a1b9a]">Ir para o Login</Button>
            </Link>
          </CardFooter>
        </Card>
      </div>

      <Footer />
    </div>
  )
}
