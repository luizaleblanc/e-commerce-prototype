import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function PartnerPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Área do Parceiro</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="bg-[#1a237e] text-white">
          <CardHeader>
            <CardTitle>Gerenciar Recompensas</CardTitle>
            <CardDescription className="text-gray-200">Adicione e gerencie as recompensas disponíveis</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full bg-white text-[#1a237e] hover:bg-gray-100">Acessar</Button>
          </CardContent>
        </Card>

        <Card className="bg-[#1a237e] text-white">
          <CardHeader>
            <CardTitle>Relatórios</CardTitle>
            <CardDescription className="text-gray-200">Visualize entradas e saídas de usuários</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full bg-white text-[#1a237e] hover:bg-gray-100">Acessar</Button>
          </CardContent>
        </Card>

        <Card className="bg-[#1a237e] text-white">
          <CardHeader>
            <CardTitle>Configurações</CardTitle>
            <CardDescription className="text-gray-200">Configure sua conta de parceiro</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full bg-white text-[#1a237e] hover:bg-gray-100">Acessar</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
