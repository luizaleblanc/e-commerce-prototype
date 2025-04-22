import type { ImportData, ImportResult, ImportOptions } from "./types"
import { parseCSVFile } from "./csv-parser"
import { parseExcelFile } from "./excel-parser"
import { getSupabaseClient } from "@/lib/supabase/client"

/**
 * Processa um arquivo de importação e salva os dados no banco de dados
 */
export async function processImportFile(file: File, options: ImportOptions = {}): Promise<ImportResult> {
  const fileType = file.name.toLowerCase().endsWith(".csv") ? "csv" : "excel"

  try {
    let parseResult

    if (fileType === "csv") {
      parseResult = await parseCSVFile(file, options)
    } else {
      parseResult = await parseExcelFile(file, options)
    }

    const { data, errors: parseErrors } = parseResult

    // Processar os dados e salvar no banco de dados
    const importResult = await saveImportData(data)

    return {
      success: importResult.failedCount === 0,
      totalProcessed: data.length,
      successCount: importResult.successCount,
      failedCount: importResult.failedCount,
      errors: [...parseErrors, ...importResult.errors],
    }
  } catch (error) {
    console.error("Erro ao processar arquivo de importação:", error)
    return {
      success: false,
      totalProcessed: 0,
      successCount: 0,
      failedCount: 1,
      errors: [{ row: 0, userId: "unknown", message: `Erro ao processar arquivo: ${error.message}` }],
    }
  }
}

/**
 * Salva os dados de importação no banco de dados
 */
async function saveImportData(data: ImportData[]): Promise<{
  successCount: number
  failedCount: number
  errors: { row: number; userId: string; message: string }[]
}> {
  const supabase = getSupabaseClient()
  let successCount = 0
  let failedCount = 0
  const errors = []

  for (let i = 0; i < data.length; i++) {
    const item = data[i]

    try {
      // Verificar se o usuário existe
      const { data: userData, error: userError } = await supabase
        .from("users")
        .select("id")
        .eq("id", item.userId)
        .single()

      if (userError || !userData) {
        failedCount++
        errors.push({
          row: i + 1,
          userId: item.userId,
          message: "Usuário não encontrado",
        })
        continue
      }

      // Inserir os pontos
      const { error: pointsError } = await supabase.from("points_transactions").insert({
        user_id: item.userId,
        points: item.points,
        observation: item.observation || "",
        transaction_type: "import",
        created_at: new Date().toISOString(),
      })

      if (pointsError) {
        failedCount++
        errors.push({
          row: i + 1,
          userId: item.userId,
          message: `Erro ao salvar pontos: ${pointsError.message}`,
        })
        continue
      }

      // Atualizar o saldo de pontos do usuário
      const { error: updateError } = await supabase.rpc("update_user_points", {
        p_user_id: item.userId,
        p_points: item.points,
      })

      if (updateError) {
        failedCount++
        errors.push({
          row: i + 1,
          userId: item.userId,
          message: `Erro ao atualizar saldo: ${updateError.message}`,
        })
        continue
      }

      successCount++
    } catch (error) {
      failedCount++
      errors.push({
        row: i + 1,
        userId: item.userId,
        message: `Erro inesperado: ${error.message}`,
      })
    }
  }

  return { successCount, failedCount, errors }
}
