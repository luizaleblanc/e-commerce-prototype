"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { PageTransition } from "@/components/page-transition"
import { Upload, FileText, Check, AlertCircle, X } from "lucide-react"
import { processImportFile } from "@/lib/import/import-service"
import type { ImportResult, ImportError } from "@/lib/import/types"

export default function ImportPage() {
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [uploadStatus, setUploadStatus] = useState<"idle" | "success" | "error" | "processing">("idle")
  const [importResult, setImportResult] = useState<ImportResult | null>(null)
  const [skipFirstRow, setSkipFirstRow] = useState(true)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
      setUploadStatus("idle")
      setImportResult(null)
    }
  }

  const handleUpload = async () => {
    if (!file) return

    setUploading(true)
    setUploadStatus("processing")

    try {
      const result = await processImportFile(file, { skipFirstRow })
      setImportResult(result)
      setUploadStatus(result.success ? "success" : "error")
    } catch (error) {
      console.error("Erro ao processar arquivo:", error)
      setUploadStatus("error")
    } finally {
      setUploading(false)
    }
  }

  const resetForm = () => {
    setFile(null)
    setUploadStatus("idle")
    setImportResult(null)
  }

  return (
    <PageTransition>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Importar Dados</h1>

        <Card>
          <CardContent className="p-6">
            <div className="text-center mb-6">
              <h2 className="text-xl font-semibold mb-2">Upload de Arquivo</h2>
              <p className="text-gray-500">
                Faça upload de um arquivo CSV ou Excel com os dados dos pontos a serem atribuídos
              </p>
            </div>

            <div className="border-2 border-dashed border-gray-300 rounded-md p-10 flex flex-col items-center justify-center mb-6">
              {uploadStatus === "idle" ? (
                <>
                  <Upload size={48} className="text-gray-400 mb-4" />
                  <p className="text-gray-500 text-center mb-2">
                    Arraste e solte seu arquivo aqui ou clique para selecionar
                  </p>
                  <p className="text-gray-400 text-sm">CSV, XLSX (máx. 10MB)</p>
                  <input
                    type="file"
                    id="file-upload"
                    className="hidden"
                    accept=".csv,.xlsx,.xls"
                    onChange={handleFileChange}
                  />
                  <Button
                    onClick={() => document.getElementById("file-upload")?.click()}
                    variant="outline"
                    className="mt-4"
                  >
                    Selecionar Arquivo
                  </Button>
                </>
              ) : uploadStatus === "processing" ? (
                <div className="flex flex-col items-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#1a237e] mb-4"></div>
                  <p className="text-[#1a237e] font-medium">Processando arquivo...</p>
                </div>
              ) : uploadStatus === "success" ? (
                <div className="flex flex-col items-center">
                  <div className="bg-green-100 p-3 rounded-full mb-4">
                    <Check className="text-green-600" size={32} />
                  </div>
                  <p className="text-green-600 font-medium">Importação concluída com sucesso!</p>
                  <Button onClick={resetForm} variant="outline" className="mt-4">
                    Importar outro arquivo
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <div className="bg-red-100 p-3 rounded-full mb-4">
                    <AlertCircle className="text-red-600" size={32} />
                  </div>
                  <p className="text-red-600 font-medium">Erro ao processar o arquivo.</p>
                  <Button onClick={resetForm} variant="outline" className="mt-4">
                    Tentar novamente
                  </Button>
                </div>
              )}
            </div>

            {file && uploadStatus === "idle" && (
              <div className="bg-gray-50 p-4 rounded-md flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <FileText className="text-gray-500 mr-3" />
                  <div>
                    <p className="font-medium">{file.name}</p>
                    <p className="text-sm text-gray-500">{(file.size / 1024).toFixed(2)} KB</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button onClick={() => setFile(null)} variant="ghost" size="icon">
                    <X size={18} />
                  </Button>
                  <Button onClick={handleUpload} className="bg-[#1a237e] hover:bg-[#303f9f]" disabled={uploading}>
                    {uploading ? "Enviando..." : "Importar Dados"}
                  </Button>
                </div>
              </div>
            )}

            {file && uploadStatus === "idle" && (
              <div className="mb-6">
                <div className="flex items-center mb-4">
                  <input
                    type="checkbox"
                    id="skip-first-row"
                    checked={skipFirstRow}
                    onChange={(e) => setSkipFirstRow(e.target.checked)}
                    className="mr-2"
                  />
                  <label htmlFor="skip-first-row">Ignorar primeira linha (cabeçalho)</label>
                </div>
              </div>
            )}

            {importResult && (
              <div className={`p-4 rounded-md mb-6 ${importResult.success ? "bg-green-50" : "bg-red-50"}`}>
                <h3 className="font-semibold mb-2">Resultado da importação:</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Total de registros processados: {importResult.totalProcessed}</li>
                  <li>Registros importados com sucesso: {importResult.successCount}</li>
                  <li>Registros com erro: {importResult.failedCount}</li>
                </ul>

                {importResult.errors.length > 0 && (
                  <div className="mt-4">
                    <h4 className="font-semibold mb-2">Erros encontrados:</h4>
                    <div className="max-h-60 overflow-y-auto">
                      <table className="min-w-full border border-red-200">
                        <thead className="bg-red-50">
                          <tr>
                            <th className="py-2 px-4 border-b text-left">Linha</th>
                            <th className="py-2 px-4 border-b text-left">ID do Usuário</th>
                            <th className="py-2 px-4 border-b text-left">Mensagem</th>
                          </tr>
                        </thead>
                        <tbody>
                          {importResult.errors.map((error: ImportError, index: number) => (
                            <tr key={index} className="border-b border-red-100">
                              <td className="py-2 px-4">{error.row}</td>
                              <td className="py-2 px-4">{error.userId}</td>
                              <td className="py-2 px-4">{error.message}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            )}

            <div className="mt-6">
              <h3 className="font-semibold mb-2">Instruções:</h3>
              <ul className="list-disc pl-5 space-y-1 text-gray-600">
                <li>O arquivo deve estar no formato CSV ou Excel (XLSX/XLS)</li>
                <li>As colunas devem seguir o padrão: ID do usuário, Pontos, Observação (opcional)</li>
                <li>O tamanho máximo do arquivo é de 10MB</li>
                <li>Certifique-se de que os IDs dos usuários estão corretos</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageTransition>
  )
}
