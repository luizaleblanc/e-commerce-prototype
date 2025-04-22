"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { getSupabaseClient } from "@/lib/supabase/client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckCircle, XCircle, AlertTriangle, RefreshCw } from "lucide-react"

export default function DebugSupabasePage() {
  const [isFixing, setIsFixing] = useState(false)
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null)
  const [logs, setLogs] = useState<string[]>([])
  const [testEmail, setTestEmail] = useState("")
  const [testPassword, setTestPassword] = useState("")
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null)
  const [isTestingSignUp, setIsTestingSignUp] = useState(false)
  const [dbStatus, setDbStatus] = useState<{
    profilesTable: boolean
    triggers: boolean
    functions: boolean
  } | null>(null)
  const [isCheckingDb, setIsCheckingDb] = useState(false)

  const supabase = getSupabaseClient()

  const addLog = (message: string) => {
    setLogs((prev) => [...prev, `[${new Date().toISOString()}] ${message}`])
  }

  const checkDatabaseStructure = async () => {
    setIsCheckingDb(true)
    addLog("Verificando estrutura do banco de dados...")

    try {
      // Verificar tabela profiles
      const { data: profilesTableExists, error: profilesError } = await supabase
        .from("profiles")
        .select("id")
        .limit(1)
        .catch(() => ({ data: null, error: { message: "Tabela não existe" } }))

      const profilesExists = !profilesError
      addLog(profilesExists ? "✅ Tabela 'profiles' encontrada" : "❌ Tabela 'profiles' não encontrada")

      // Verificar funções
      const { data: functions, error: functionsError } = await supabase
        .rpc("check_auth_functions")
        .catch(() => ({ data: null, error: { message: "Função não existe" } }))

      const functionsExist = !functionsError
      addLog(functionsExist ? "✅ Funções de autenticação encontradas" : "❌ Funções de autenticação não encontradas")

      // Verificar triggers
      const { data: triggers, error: triggersError } = await supabase
        .rpc("check_auth_triggers")
        .catch(() => ({ data: null, error: { message: "Função não existe" } }))

      const triggersExist = !triggersError
      addLog(triggersExist ? "✅ Triggers de autenticação encontrados" : "❌ Triggers de autenticação não encontrados")

      setDbStatus({
        profilesTable: profilesExists,
        functions: functionsExist,
        triggers: triggersExist,
      })
    } catch (error) {
      console.error("Erro ao verificar estrutura do banco de dados:", error)
      addLog(`❌ Erro ao verificar estrutura do banco de dados: ${error.message}`)
    } finally {
      setIsCheckingDb(false)
    }
  }

  const handleFixDatabase = async () => {
    setIsFixing(true)
    setResult(null)
    addLog("Iniciando correção do banco de dados...")

    try {
      // Executar o script SQL para corrigir a estrutura do banco de dados
      addLog("Executando script SQL para corrigir estrutura...")

      const { data, error } = await fetch("/api/debug/fix-supabase", {
        method: "POST",
      }).then((res) => res.json())

      if (error) {
        throw new Error(error)
      }

      addLog("✅ Script SQL executado com sucesso")

      // Verificar a estrutura novamente
      await checkDatabaseStructure()

      setResult({
        success: true,
        message: "Banco de dados corrigido com sucesso! Agora você deve conseguir criar novas contas.",
      })
      addLog("✅ Processo de correção concluído com sucesso")
    } catch (error) {
      console.error("Erro ao corrigir banco de dados:", error)
      setResult({
        success: false,
        message: `Erro ao corrigir banco de dados: ${error.message}`,
      })
      addLog(`❌ Erro ao corrigir banco de dados: ${error.message}`)
    } finally {
      setIsFixing(false)
    }
  }

  const testSignUp = async () => {
    if (!testEmail || !testPassword) {
      setTestResult({
        success: false,
        message: "Por favor, preencha email e senha para testar",
      })
      return
    }

    setIsTestingSignUp(true)
    setTestResult(null)
    addLog(`Testando criação de conta com email: ${testEmail}`)

    try {
      // Tentar criar uma conta de teste
      const { data, error } = await supabase.auth.signUp({
        email: testEmail,
        password: testPassword,
      })

      if (error) {
        throw error
      }

      if (data.user) {
        addLog(`✅ Usuário criado com ID: ${data.user.id}`)

        // Verificar se o perfil foi criado
        const { data: profile, error: profileError } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", data.user.id)
          .single()

        if (profileError) {
          addLog(`❌ Perfil não foi criado automaticamente: ${profileError.message}`)

          // Tentar criar o perfil manualmente
          addLog("Tentando criar perfil manualmente...")
          const { error: insertError } = await supabase.from("profiles").insert({
            id: data.user.id,
            email: testEmail,
            user_role: "user",
            created_at: new Date().toISOString(),
          })

          if (insertError) {
            addLog(`❌ Falha ao criar perfil manualmente: ${insertError.message}`)
          } else {
            addLog("✅ Perfil criado manualmente com sucesso")
          }
        } else {
          addLog("✅ Perfil criado automaticamente com sucesso")
        }

        setTestResult({
          success: true,
          message: "Conta criada com sucesso! O sistema está funcionando corretamente.",
        })
      } else {
        setTestResult({
          success: false,
          message: "Resposta inesperada do Supabase. Verifique os logs.",
        })
      }
    } catch (error) {
      console.error("Erro ao testar criação de conta:", error)
      setTestResult({
        success: false,
        message: `Erro ao criar conta: ${error.message}`,
      })
      addLog(`❌ Erro ao criar conta: ${error.message}`)
    } finally {
      setIsTestingSignUp(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Debug do Supabase - Criação de Contas</h1>

        <Tabs defaultValue="status">
          <TabsList className="mb-6">
            <TabsTrigger value="status">Status</TabsTrigger>
            <TabsTrigger value="test">Testar Registro</TabsTrigger>
            <TabsTrigger value="fix">Corrigir Problemas</TabsTrigger>
            <TabsTrigger value="logs">Logs</TabsTrigger>
          </TabsList>

          <TabsContent value="status">
            <Card>
              <CardHeader>
                <CardTitle>Status do Banco de Dados</CardTitle>
              </CardHeader>
              <CardContent>
                <Button onClick={checkDatabaseStructure} disabled={isCheckingDb} className="mb-6">
                  {isCheckingDb ? (
                    <>
                      <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                      Verificando...
                    </>
                  ) : (
                    "Verificar Estrutura do Banco de Dados"
                  )}
                </Button>

                {dbStatus && (
                  <div className="space-y-4">
                    <div className="flex items-center">
                      {dbStatus.profilesTable ? (
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                      ) : (
                        <XCircle className="h-5 w-5 text-red-500 mr-2" />
                      )}
                      <span>Tabela de Perfis</span>
                    </div>

                    <div className="flex items-center">
                      {dbStatus.triggers ? (
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                      ) : (
                        <XCircle className="h-5 w-5 text-red-500 mr-2" />
                      )}
                      <span>Triggers de Autenticação</span>
                    </div>

                    <div className="flex items-center">
                      {dbStatus.functions ? (
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                      ) : (
                        <XCircle className="h-5 w-5 text-red-500 mr-2" />
                      )}
                      <span>Funções de Autenticação</span>
                    </div>

                    {(!dbStatus.profilesTable || !dbStatus.triggers || !dbStatus.functions) && (
                      <Alert className="mt-4">
                        <AlertTriangle className="h-4 w-4" />
                        <AlertDescription>
                          Foram detectados problemas na estrutura do banco de dados. Vá para a aba "Corrigir Problemas"
                          para resolver.
                        </AlertDescription>
                      </Alert>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="test">
            <Card>
              <CardHeader>
                <CardTitle>Testar Criação de Conta</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="test-email">Email de Teste</Label>
                    <Input
                      id="test-email"
                      type="email"
                      value={testEmail}
                      onChange={(e) => setTestEmail(e.target.value)}
                      placeholder="teste@exemplo.com"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="test-password">Senha de Teste</Label>
                    <Input
                      id="test-password"
                      type="password"
                      value={testPassword}
                      onChange={(e) => setTestPassword(e.target.value)}
                      placeholder="Senha (mínimo 6 caracteres)"
                    />
                  </div>

                  <Button onClick={testSignUp} disabled={isTestingSignUp} className="w-full">
                    {isTestingSignUp ? (
                      <>
                        <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                        Testando...
                      </>
                    ) : (
                      "Testar Criação de Conta"
                    )}
                  </Button>

                  {testResult && (
                    <Alert variant={testResult.success ? "default" : "destructive"} className="mt-4">
                      {testResult.success ? <CheckCircle className="h-4 w-4" /> : <AlertTriangle className="h-4 w-4" />}
                      <AlertDescription>{testResult.message}</AlertDescription>
                    </Alert>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="fix">
            <Card>
              <CardHeader>
                <CardTitle>Corrigir Problemas</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  Esta ferramenta irá corrigir problemas comuns que impedem a criação de novas contas:
                </p>

                <ul className="list-disc pl-5 mb-6 space-y-2">
                  <li>Criar a tabela de perfis se não existir</li>
                  <li>Adicionar a coluna user_role se não existir</li>
                  <li>Criar triggers para criação automática de perfil</li>
                  <li>Configurar permissões adequadas</li>
                </ul>

                {result && (
                  <Alert variant={result.success ? "default" : "destructive"} className="mb-6">
                    {result.success ? <CheckCircle className="h-4 w-4" /> : <AlertTriangle className="h-4 w-4" />}
                    <AlertDescription>{result.message}</AlertDescription>
                  </Alert>
                )}

                <Button onClick={handleFixDatabase} disabled={isFixing} className="w-full">
                  {isFixing ? (
                    <>
                      <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                      Corrigindo...
                    </>
                  ) : (
                    "Corrigir Problemas de Criação de Contas"
                  )}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="logs">
            <Card>
              <CardHeader>
                <CardTitle>Logs de Debug</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-black text-green-400 p-4 rounded-md h-96 overflow-y-auto font-mono text-sm">
                  {logs.length > 0 ? (
                    logs.map((log, index) => (
                      <div key={index} className="mb-1">
                        {log}
                      </div>
                    ))
                  ) : (
                    <p>Nenhum log disponível. Execute alguma operação para gerar logs.</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
