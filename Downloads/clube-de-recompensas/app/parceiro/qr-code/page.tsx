import NextImage from "next/image"
import { PageTransition } from "@/components/page-transition"
import { Button } from "@/components/ui/button"
import { Camera, Smartphone } from "lucide-react"

export default function QRCodePage() {
  return (
    <PageTransition>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Leitor QR Code</h1>

        <div className="relative h-[400px] w-full rounded-lg overflow-hidden mb-6">
          <NextImage src="/qr-code-scanner.png" alt="QR Code Scanner" fill className="object-cover" />
          <div className="absolute inset-0 flex flex-col items-start justify-end p-8 bg-gradient-to-t from-black/50 to-transparent text-white">
            <h2 className="text-3xl font-bold mb-2">Leitor QR Code no celular</h2>
            <p className="text-lg">Abra essa página no celular para utilizar o QR Code</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-blue-50 border-l-4 border-[#3949ab] p-4 rounded">
            <div className="flex items-start gap-3">
              <Smartphone className="text-[#3949ab] mt-1" size={24} />
              <div>
                <h3 className="font-semibold text-lg mb-1">Acesso Mobile</h3>
                <p className="text-gray-700">
                  Para utilizar o leitor de QR Code, abra esta página no seu dispositivo móvel. O acesso à câmera é
                  necessário para escanear os códigos.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border-l-4 border-[#3949ab] p-4 rounded">
            <div className="flex items-start gap-3">
              <Camera className="text-[#3949ab] mt-1" size={24} />
              <div>
                <h3 className="font-semibold text-lg mb-1">Permissões</h3>
                <p className="text-gray-700">
                  Ao abrir o scanner, seu navegador solicitará permissão para acessar a câmera. Permita o acesso para
                  poder escanear os códigos QR.
                </p>
              </div>
            </div>
          </div>
        </div>

        <Button className="bg-[#3949ab] hover:bg-[#5c6bc0]">Iniciar Scanner (Mobile)</Button>
      </div>
    </PageTransition>
  )
}
