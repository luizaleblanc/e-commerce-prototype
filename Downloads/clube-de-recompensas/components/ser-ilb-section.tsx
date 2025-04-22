import { Check } from "lucide-react"
import NextImage from "next/image"
import { Carousel, CarouselItem } from "@/components/ui/carousel"

export function SerILBSection() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h2 className="text-3xl font-bold mb-8 text-[#1a237e]">Ser ILB é:</h2>

            <div className="space-y-6">
              <div className="flex items-start">
                <div className="mr-4 mt-1">
                  <div className="h-6 w-6 rounded-md bg-[#7b1fa2] flex items-center justify-center">
                    <Check className="h-4 w-4 text-white" />
                  </div>
                </div>
                <p className="text-lg text-gray-700">Ser protagonista da sua própria vida</p>
              </div>

              <div className="flex items-start">
                <div className="mr-4 mt-1">
                  <div className="h-6 w-6 rounded-md bg-[#7b1fa2] flex items-center justify-center">
                    <Check className="h-4 w-4 text-white" />
                  </div>
                </div>
                <p className="text-lg text-gray-700">Adquirir produtos exclusivos sem usar dinheiro</p>
              </div>

              <div className="flex items-start">
                <div className="mr-4 mt-1">
                  <div className="h-6 w-6 rounded-md bg-[#7b1fa2] flex items-center justify-center">
                    <Check className="h-4 w-4 text-white" />
                  </div>
                </div>
                <p className="text-lg text-gray-700">Prêmios exclusivos pelo programa de fidelidade ILB</p>
              </div>
            </div>
          </div>

          <div className="md:w-1/2 md:pl-10">
            <Carousel
              className="h-80 w-full rounded-lg overflow-hidden shadow-xl"
              interval={4000}
              transitionDuration={1500}
            >
              <CarouselItem>
                <div className="relative h-80 w-full bg-transparent">
                  <NextImage src="/ilb-mochila.png" alt="Mochila ILB" fill className="object-contain" />
                </div>
              </CarouselItem>
              <CarouselItem>
                <div className="relative h-80 w-full bg-transparent">
                  <NextImage src="/ilb-jaqueta.png" alt="Jaqueta ILB" fill className="object-contain" />
                </div>
              </CarouselItem>
              <CarouselItem>
                <div className="relative h-80 w-full bg-transparent">
                  <NextImage src="/ilb-bone.png" alt="Boné ILB" fill className="object-contain" />
                </div>
              </CarouselItem>
              <CarouselItem>
                <div className="relative h-80 w-full bg-transparent">
                  <NextImage src="/ilb-camiseta1.png" alt="Camiseta ILB" fill className="object-contain" />
                </div>
              </CarouselItem>
              <CarouselItem>
                <div className="relative h-80 w-full bg-transparent">
                  <NextImage src="/ilb-camiseta2.png" alt="Camiseta ILB" fill className="object-contain" />
                </div>
              </CarouselItem>
              <CarouselItem>
                <div className="relative h-80 w-full bg-transparent">
                  <NextImage src="/ilb-bucket.png" alt="Bucket Hat ILB" fill className="object-contain" />
                </div>
              </CarouselItem>
            </Carousel>
          </div>
        </div>
      </div>
    </section>
  )
}
