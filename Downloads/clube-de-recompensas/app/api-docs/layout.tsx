import type { ReactNode } from "react"

export const metadata = {
  title: "API Documentation - Clube de Recompensas",
  description: "API documentation for Clube de Recompensas",
}

export default function ApiDocsLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen bg-white">
          <header className="bg-[#1a237e] text-white py-4 px-6">
            <div className="container mx-auto">
              <h1 className="text-2xl font-bold">Clube de Recompensas API</h1>
            </div>
          </header>
          <main>{children}</main>
        </div>
      </body>
    </html>
  )
}
