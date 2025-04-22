import { createSwaggerSpec } from "next-swagger-doc"

export const getApiDocs = () => {
  const spec = createSwaggerSpec({
    apiFolder: "app/api", // Path to API routes
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Clube de Recompensas API",
        version: "1.0.0",
        description: "API documentation for Clube de Recompensas",
        contact: {
          name: "Support",
          email: "support@clubederecompensas.com",
        },
      },
      components: {
        securitySchemes: {
          BearerAuth: {
            type: "http",
            scheme: "bearer",
            bearerFormat: "JWT",
          },
        },
        schemas: {
          Address: {
            type: "object",
            properties: {
              cep: { type: "string", example: "12345-678" },
              address: { type: "string", example: "Rua das Flores, 123" },
              number: { type: "string", example: "Apto 301" },
              district: { type: "string", example: "Jardim das Rosas" },
              city: { type: "string", example: "São Paulo" },
              state: { type: "string", example: "SP" },
            },
            required: ["cep", "address", "city", "state"],
          },
          SocialMedia: {
            type: "object",
            properties: {
              type: { type: "string", example: "Instagram" },
              account: { type: "string", example: "@username" },
            },
            required: ["type", "account"],
          },
          UserRegistration: {
            type: "object",
            properties: {
              name: { type: "string", example: "João Silva" },
              email: { type: "string", format: "email", example: "user.example03@email.com" },
              birthDate: { type: "string", format: "date", example: "2000-01-01" },
              phone: { type: "string", example: "11999999219" },
              document: { type: "string", example: "145.416.789-00" },
              fileUrl: { type: "string", format: "uri", example: "https://s3.amazonaws.com/meu-bucket/arquivo.png" },
              fileKey: { type: "string", example: "admin_arquivo.png" },
              gender: { type: "string", enum: ["Male", "Female", "Other"], example: "Male" },
              address: { $ref: "#/components/schemas/Address" },
              socialMedias: {
                type: "array",
                items: { $ref: "#/components/schemas/SocialMedia" },
              },
              password: { type: "string", format: "password", example: "Senha@123" },
              confirmPassword: { type: "string", format: "password", example: "Senha@123" },
            },
            required: ["name", "email", "password", "confirmPassword"],
          },
          User: {
            type: "object",
            properties: {
              id: { type: "string", format: "uuid" },
              name: { type: "string" },
              email: { type: "string", format: "email" },
              birthDate: { type: "string", format: "date" },
              phone: { type: "string" },
              document: { type: "string" },
              fileUrl: { type: "string", format: "uri" },
              fileKey: { type: "string" },
              gender: { type: "string" },
              address: { $ref: "#/components/schemas/Address" },
              socialMedias: {
                type: "array",
                items: { $ref: "#/components/schemas/SocialMedia" },
              },
              createdAt: { type: "string", format: "date-time" },
              updatedAt: { type: "string", format: "date-time" },
            },
          },
          PartnerRegistration: {
            type: "object",
            properties: {
              name: { type: "string", example: "João da Silva" },
              partnerName: { type: "string", example: "João Lives" },
              email: { type: "string", format: "email", example: "user.example01@email.com" },
              document: { type: "string", example: "(12) 99204-1263" },
              partnerDocument: { type: "string", example: "12.315.628/0001-90" },
              birthDate: { type: "string", format: "date", example: "1985-08-15" },
              gender: { type: "string", enum: ["Male", "Female", "Other"], example: "Male" },
              fileUrl: { type: "string", format: "uri", example: "https://s3.amazonaws.com/meu-bucket/arquivo.png" },
              fileKey: { type: "string", example: "arquivo.png" },
              phone: { type: "string", example: "(11) 98765-4321" },
              password: { type: "string", format: "password", example: "Senha@123" },
              confirmPassword: { type: "string", format: "password", example: "Senha@123" },
              partnerAddress: { $ref: "#/components/schemas/Address" },
            },
            required: ["name", "email", "partnerName", "partnerDocument", "password", "confirmPassword"],
          },
          PartnerUpdate: {
            type: "object",
            properties: {
              name: { type: "string", example: "João da Silva" },
              partnerName: { type: "string", example: "João Lives" },
              document: { type: "string", example: "(12) 99204-1263" },
              partnerDocument: { type: "string", example: "12.315.628/0001-90" },
              birthDate: { type: "string", format: "date", example: "1985-08-15" },
              gender: { type: "string", enum: ["Male", "Female", "Other"], example: "Male" },
              fileUrl: { type: "string", format: "uri", example: "https://s3.amazonaws.com/meu-bucket/arquivo.png" },
              fileKey: { type: "string", example: "arquivo.png" },
              phone: { type: "string", example: "(11) 98765-4321" },
              partnerAddress: { $ref: "#/components/schemas/Address" },
            },
          },
          Partner: {
            type: "object",
            properties: {
              id: { type: "string", format: "uuid" },
              name: { type: "string" },
              email: { type: "string", format: "email" },
              partnerName: { type: "string" },
              partnerDocument: { type: "string" },
              birthDate: { type: "string", format: "date" },
              phone: { type: "string" },
              document: { type: "string" },
              fileUrl: { type: "string", format: "uri" },
              fileKey: { type: "string" },
              gender: { type: "string" },
              partnerAddress: { $ref: "#/components/schemas/Address" },
              createdAt: { type: "string", format: "date-time" },
              updatedAt: { type: "string", format: "date-time" },
            },
          },
          Error: {
            type: "object",
            properties: {
              message: { type: "string" },
              error: { type: "string" },
            },
          },
        },
      },
      security: [
        {
          BearerAuth: [],
        },
      ],
    },
  })
  return spec
}
