"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function DebugRedirect() {
  const router = useRouter()

  useEffect(() => {
    router.push("/debug-supabase")
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-lg">Redirecionando para a página de debug...</p>
    </div>
  )
}
