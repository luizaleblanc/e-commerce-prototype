import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { formatDate } from "@/lib/utils"
import { getILBProfile, getAvailableRewards } from "@/lib/ilb-service"
import Image from "next/image"
import { ProtectedRoute } from "@/components/auth/protected-route"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default async function ILBDashboard() {
  // Em um cenário real, você obteria o ID do usuário autenticado
  const profile = await getILBProfile("user-123")
  const rewards = await getAvailableRewards()

  if (!profile) {
    return <div>Perfil não encontrado</div>
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen flex flex-col">
        <Header />

        <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8 flex-1">
          <h1 className="text-3xl font-bold mb-6">Dashboard ILB</h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            <Card>
              <CardHeader>
                <CardTitle>Pontos</CardTitle>
                <CardDescription>Seus pontos acumulados</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{profile.points}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Nível</CardTitle>
                <CardDescription>Seu nível atual</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{profile.level}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Membro desde</CardTitle>
                <CardDescription>Data de ingresso</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-xl font-bold">{formatDate(profile.joinDate)}</p>
              </CardContent>
            </Card>
          </div>

          <h2 className="text-2xl font-bold mb-4">Recompensas Disponíveis</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {rewards.map((reward) => (
              <Card key={reward.id}>
                <div className="relative h-48 w-full">
                  <Image
                    src={reward.imageUrl || "/placeholder.svg"}
                    alt={reward.title}
                    fill
                    className="object-cover rounded-t-lg"
                  />
                </div>
                <CardHeader>
                  <CardTitle>{reward.title}</CardTitle>
                  <CardDescription>{reward.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex justify-between items-center">
                  <p className="font-bold">{reward.pointsCost} pontos</p>
                  <Button className="bg-[#7b1fa2] hover:bg-[#6a1b9a]">Resgatar</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <Footer />
      </div>
    </ProtectedRoute>
  )
}
