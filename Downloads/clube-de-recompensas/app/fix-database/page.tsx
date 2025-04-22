"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { getSupabaseClient } from "@/lib/supabase/client"

export default function FixDatabasePage() {
  const [isFixing, setIsFixing] = useState(false)
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null)
  const supabase = getSupabaseClient()

  const handleFixDatabase = async () => {
    setIsFixing(true)
    setResult(null)

    try {
      // Executar o script SQL para corrigir a estrutura do banco de dados
      const { error } = await supabase.rpc("execute_sql", {
        sql_query: `
          -- Verificar se a tabela profiles existe, se não, criar
          CREATE TABLE IF NOT EXISTS profiles (
            id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
            email TEXT,
            name TEXT,
            user_role TEXT DEFAULT 'user',
            created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
            updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
          );

          -- Verificar se a coluna user_role existe, se não, criar
          DO $$
          BEGIN
            IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                          WHERE table_name = 'profiles' AND column_name = 'user_role') THEN
              ALTER TABLE profiles ADD COLUMN user_role TEXT DEFAULT 'user';
            END IF;
          END $$;

          -- Criar perfis para usuários que não têm
          INSERT INTO profiles (id, email, user_role, created_at)
          SELECT 
            auth.users.id, 
            auth.users.email, 
            'user', 
            NOW()
          FROM auth.users
          LEFT JOIN profiles ON auth.users.id = profiles.id
          WHERE profiles.id IS NULL;
        `,
      })

      if (error) {
        throw error
      }

      setResult({
        success: true,
        message: "Banco de dados corrigido com sucesso!",
      })
    } catch (error) {
      console.error("Erro ao corrigir banco de dados:", error)
      setResult({
        success: false,
        message: "Erro ao corrigir banco de dados. Verifique os logs para mais detalhes.",
      })
    } finally {
      setIsFixing(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center">Corrigir Banco de Dados</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-center">
            Esta ferramenta irá corrigir problemas no banco de dados relacionados aos perfis de usuários.
          </p>

          {result && (
            <Alert variant={result.success ? "default" : "destructive"}>
              <AlertDescription>{result.message}</AlertDescription>
            </Alert>
          )}

          <Button onClick={handleFixDatabase} disabled={isFixing} className="w-full bg-[#1a237e] hover:bg-[#3949ab]">
            {isFixing ? "Corrigindo..." : "Corrigir Banco de Dados"}
          </Button>

          <p className="text-sm text-gray-500 text-center">Após a correção, tente fazer login novamente.</p>
        </CardContent>
      </Card>
    </div>
  )
}
