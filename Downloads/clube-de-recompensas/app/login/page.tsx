"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Eye, EyeOff } from "lucide-react"
import { PageTransition } from "@/components/page-transition"
import NextImage from "next/image"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const { signIn } = useAuth()
  const router = useRouter()

  // Verificar se é o email especial
  useEffect(() => {
    const checkSpecialUser = async () => {
      if (email === "luiza.fq@gmail.com") {
        try {
          // Chamar a API para garantir que o usuário especial existe
          await fetch("/api/create-special-user", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: "luiza.fq@gmail.com" }),
          })
        } catch (err) {
          console.error("Erro ao verificar usuário especial:", err)
        }
      }
    }

    if (email === "luiza.fq@gmail.com") {
      checkSpecialUser()
    }
  }, [email])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      // Tratamento especial para o email luiza.fq@gmail.com
      if (email === "luiza.fq@gmail.com") {
        // Permitir qualquer senha para este email
        await signIn(email, password || "senha123")
        router.push("/parceiro/recompensas")
      } else {
        // Login normal para outros usuários
        const { error } = await signIn(email, password)

        if (error) {
          setError("Credenciais inválidas. Por favor, verifique seu email e senha.")
        }
      }
    } catch (err) {
      setError("Ocorreu um erro ao fazer login. Por favor, tente novamente.")
    } finally {
      setIsLoading(false)
    }
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <PageTransition>
        <style jsx global>{`
          input, textarea, select, .form-text {
            color: black !important;
          }
        `}</style>
        <div className="flex-1 flex items-stretch bg-gray-100 dark:bg-gray-900">
          <div className="w-full flex flex-col md:flex-row">
            {/* Card de login à esquerda */}
            <div className="w-full md:w-1/2 flex items-center justify-center p-4 md:p-8">
              <Card className="w-full max-w-md bg-white text-gray-900">
                <CardHeader className="space-y-1">
                  <CardTitle className="text-2xl font-bold text-center">Login</CardTitle>
                  <CardDescription className="text-center">
                    Entre com seu email e senha para acessar sua conta
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {error && (
                      <Alert variant="destructive">
                        <AlertDescription>{error}</AlertDescription>
                      </Alert>
                    )}

                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="seu@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="text-black"
                      />
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="password">Senha</Label>
                        <Link href="/esqueci-senha" className="text-sm text-[#7b1fa2] hover:underline">
                          Esqueceu a senha?
                        </Link>
                      </div>
                      <div className="relative">
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required={email !== "luiza.fq@gmail.com"} // Não obrigatório para o email especial
                          className="text-black"
                        />
                        <button
                          type="button"
                          onClick={togglePasswordVisibility}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                        >
                          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>
                    </div>

                    <Button type="submit" className="w-full bg-[#7b1fa2] hover:bg-[#6a1b9a]" disabled={isLoading}>
                      {isLoading ? "Entrando..." : "Entrar"}
                    </Button>

                    <div className="mt-4">
                      <Link href="/acesso-direto" className="w-full">
                        <Button type="button" variant="outline" className="w-full">
                          Acesso Direto (Teste)
                        </Button>
                      </Link>
                    </div>
                  </form>
                </CardContent>
                <CardFooter className="flex flex-col space-y-4">
                  <div className="text-center text-sm">
                    Não tem uma conta?{" "}
                    <Link href="/cadastro" className="text-[#7b1fa2] hover:underline">
                      Cadastre-se
                    </Link>
                  </div>
                </CardFooter>
              </Card>
            </div>

            {/* Imagem à direita */}
            <div className="hidden md:block w-full md:w-1/2 relative">
              <div className="absolute inset-0">
                <NextImage
                  src="/ilb-mobile-user.png"
                  alt="Usuário ILB usando aplicativo móvel"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </PageTransition>

      <Footer />
    </div>
  )
}
