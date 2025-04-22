"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

type CarouselProps = {
  children: React.ReactNode[]
  className?: string
  autoPlay?: boolean
  interval?: number
  transitionDuration?: number
}

export function Carousel({
  children,
  className,
  autoPlay = true,
  interval = 5000,
  transitionDuration = 1000,
}: CarouselProps) {
  const [currentIndex, setCurrentIndex] = React.useState(0)
  const totalSlides = React.Children.count(children)

  const nextSlide = React.useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSlides)
  }, [totalSlides])

  React.useEffect(() => {
    if (!autoPlay) return

    const timer = setInterval(() => {
      nextSlide()
    }, interval)

    return () => clearInterval(timer)
  }, [autoPlay, nextSlide, interval])

  return (
    <div className={cn("relative overflow-hidden rounded-lg", className)}>
      <div
        className="flex transition-all ease-in-out"
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
          transitionDuration: `${transitionDuration}ms`,
        }}
      >
        {React.Children.map(children, (child, index) => (
          <div key={index} className="min-w-full flex-shrink-0">
            {child}
          </div>
        ))}
      </div>
    </div>
  )
}

// Modificar o componente CarouselItem para garantir que não tenha fundo branco
export function CarouselItem({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("flex items-center justify-center bg-transparent", className)}>{children}</div>
}
