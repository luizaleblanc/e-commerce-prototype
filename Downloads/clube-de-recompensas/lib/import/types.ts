// Tipos para importação de dados
export interface ImportData {
  userId: string
  points: number
  observation?: string
}

export interface ImportResult {
  success: boolean
  totalProcessed: number
  successCount: number
  failedCount: number
  errors: ImportError[]
}

export interface ImportError {
  row: number
  userId: string
  message: string
}

export interface ImportOptions {
  skipFirstRow?: boolean
  delimiter?: string
  encoding?: string
}
