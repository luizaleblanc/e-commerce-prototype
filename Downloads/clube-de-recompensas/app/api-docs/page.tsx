"use client"

import { useEffect, useState } from "react"
import SwaggerUI from "swagger-ui-react"
import "swagger-ui-react/swagger-ui.css"

export default function ApiDocs() {
  const [spec, setSpec] = useState<Record<string, any>>({})

  useEffect(() => {
    fetch("/api/swagger")
      .then((response) => response.json())
      .then((data) => setSpec(data))
      .catch((error) => console.error("Error loading API docs:", error))
  }, [])

  return (
    <div className="swagger-container">
      <SwaggerUI spec={spec} />
      <style jsx global>{`
        .swagger-ui .topbar {
          display: none;
        }
        .swagger-container {
          margin: 0;
          padding: 0;
        }
        .swagger-ui {
          background-color: white;
          padding: 20px;
        }
      `}</style>
    </div>
  )
}
