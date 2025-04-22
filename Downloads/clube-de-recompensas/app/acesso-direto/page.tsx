"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"

export default function DirectAccess() {
  const router = useRouter()
  const [status, setStatus] = useState("Limpando cache...")

  useEffect(() => {
    const clearCacheAndRedirect = async () => {
      try {
        // Limpar localStorage
        localStorage.clear()
        setStatus("Limpando cookies...")

        // Limpar cookies de sessão
        document.cookie.split(";").forEach((c) => {
          document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/")
        })

        setStatus("Limpando cache da aplicação...")

        // Limpar cache da aplicação
        try {
          await fetch("/api/clear-cache", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          })
        } catch (error) {
          console.error("Erro ao limpar cache da aplicação:", error)
          // Continuar mesmo se houver erro na API
        }

        setStatus("Redirecionando...")

        // Redirecionar para a página de recompensas
        setTimeout(() => {
          router.push("/parceiro/recompensas")
        }, 1000)
      } catch (error) {
        console.error("Erro ao limpar cache:", error)
        setStatus("Erro ao limpar cache. Redirecionando...")

        // Redirecionar mesmo em caso de erro
        setTimeout(() => {
          router.push("/parceiro/recompensas")
        }, 1000)
      }
    }

    clearCacheAndRedirect()
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <h1 className="text-2xl font-bold mb-4">Acessando o sistema...</h1>
        <p className="mb-4">{status}</p>
        <div className="mt-4">
          <Loader2 className="animate-spin h-8 w-8 text-[#7b1fa2] mx-auto" />
        </div>
      </div>
    </div>
  )
}
