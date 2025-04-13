import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"

interface TestimonialCardProps {
  quote: string
  author: string
  position: string
  company: string
  imageUrl?: string
}

export default function TestimonialCard({ quote, author, position, company, imageUrl }: TestimonialCardProps) {
  return (
    <Card className="border-none shadow-lg">
      <CardContent className="p-6 text-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-10 w-10 text-yellow-500 mb-4 mx-auto"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M13 14.725c0-5.141 3.892-10.519 10-11.725l.984 2.126c-2.215.835-4.163 3.742-4.38 5.746 2.491.392 4.396 2.547 4.396 5.149 0 3.182-2.584 4.979-5.199 4.979-3.015 0-5.801-2.305-5.801-6.275zm-13 0c0-5.141 3.892-10.519 10-11.725l.984 2.126c-2.215.835-4.163 3.742-4.38 5.746 2.491.392 4.396 2.547 4.396 5.149 0 3.182-2.584 4.979-5.199 4.979-3.015 0-5.801-2.305-5.801-6.275z" />
        </svg>
        <p className="text-gray-600 mb-6 italic">"{quote}"</p>
        <div className="flex items-center justify-center">
          {imageUrl && (
            <div className="mr-4">
              <Image
                src={imageUrl || "/placeholder.svg"}
                alt={`${author} portrait`}
                width={60}
                height={60}
                className="rounded-full"
              />
            </div>
          )}
          <div>
            <p className="font-bold">{author}</p>
            <p className="text-gray-500">
              {position}, {company}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
