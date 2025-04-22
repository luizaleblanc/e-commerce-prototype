import type { ImportData, ImportOptions, ImportError } from "./types"

/**
 * Analisa um arquivo CSV e retorna um array de dados de importação
 */
export async function parseCSVFile(
  file: File,
  options: ImportOptions = {},
): Promise<{
  data: ImportData[]
  errors: ImportError[]
}> {
  const { skipFirstRow = true, delimiter = "," } = options

  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = (e) => {
      try {
        const content = e.target?.result as string
        const lines = content.split("\n")

        const startIndex = skipFirstRow ? 1 : 0
        const data: ImportData[] = []
        const errors: ImportError[] = []

        for (let i = startIndex; i < lines.length; i++) {
          const line = lines[i].trim()
          if (!line) continue

          const fields = line.split(delimiter)

          if (fields.length < 2) {
            errors.push({
              row: i + 1,
              userId: fields[0] || "unknown",
              message: "Formato de linha inválido",
            })
            continue
          }

          const userId = fields[0].trim()
          const pointsStr = fields[1].trim()
          const observation = fields.length > 2 ? fields[2].trim() : undefined

          const points = Number(pointsStr)

          if (isNaN(points)) {
            errors.push({
              row: i + 1,
              userId,
              message: "Pontos deve ser um número válido",
            })
            continue
          }

          data.push({
            userId,
            points,
            observation,
          })
        }

        resolve({ data, errors })
      } catch (error) {
        reject(error)
      }
    }

    reader.onerror = () => {
      reject(new Error("Erro ao ler o arquivo"))
    }

    reader.readAsText(file)
  })
}
