"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ArrowLeft, RefreshCw, Database, UserCheck, ShieldAlert } from "lucide-react"
import { useRouter } from "next/navigation"

export default function IntegrationPage() {
  const router = useRouter()
  const [isFixingProfiles, setIsFixingProfiles] = useState(false)
  const [fixProfilesResult, setFixProfilesResult] = useState<{ success: boolean; message: string } | null>(null)

  const handleFixProfiles = async () => {
    setIsFixingProfiles(true)
    setFixProfilesResult(null)

    try {
      const response = await fetch("/api/fix-profiles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      })

      const result = await response.json()

      if (response.ok) {
        setFixProfilesResult({
          success: true,
          message: result.message || "Perfis de usuários corrigidos com sucesso",
        })
      } else {
        setFixProfilesResult({
          success: false,
          message: result.error || "Erro ao corrigir perfis de usuários",
        })
      }
    } catch (error) {
      setFixProfilesResult({
        success: false,
        message: "Erro ao conectar com o servidor",
      })
    } finally {
      setIsFixingProfiles(false)
    }
  }

  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => router.push("/parceiro/admin")}>
          <ArrowLeft size={18} />
        </Button>
        <h1 className="text-2xl font-bold">Manutenção de Integração</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserCheck className="h-5 w-5" />
              Corrigir Perfis de Usuários
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              Esta ferramenta verifica todos os usuários registrados e cria perfis para aqueles que não possuem. Use
              esta opção se estiver tendo problemas com usuários sem perfis.
            </p>

            {fixProfilesResult && (
              <Alert variant={fixProfilesResult.success ? "default" : "destructive"} className="mb-4">
                <AlertDescription>{fixProfilesResult.message}</AlertDescription>
              </Alert>
            )}

            <Button
              onClick={handleFixProfiles}
              disabled={isFixingProfiles}
              className="bg-[#1a237e] hover:bg-[#3949ab] w-full"
            >
              {isFixingProfiles ? (
                <>
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  Corrigindo...
                </>
              ) : (
                <>
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Corrigir Perfis de Usuários
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              Verificar Integridade do Banco de Dados
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              Esta ferramenta verifica a integridade do banco de dados e corrige problemas comuns. Use esta opção se
              estiver tendo problemas com dados inconsistentes.
            </p>

            <Button className="bg-[#1a237e] hover:bg-[#3949ab] w-full">
              <ShieldAlert className="mr-2 h-4 w-4" />
              Verificar Integridade
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Logs de Integração</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-gray-900 text-gray-100 p-4 rounded-md h-64 overflow-y-auto font-mono text-sm">
            <p>[{new Date().toISOString()}] Sistema de integração inicializado</p>
            <p>[{new Date().toISOString()}] Verificando conexão com o banco de dados...</p>
            <p>[{new Date().toISOString()}] Conexão estabelecida com sucesso</p>
            <p>[{new Date().toISOString()}] Verificando triggers do banco de dados...</p>
            <p>[{new Date().toISOString()}] Triggers verificados: OK</p>
            {/* Logs simulados */}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
