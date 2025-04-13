import Link from "next/link"
import { Printer, FileText, Cpu, Code, Video, PenTool } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface ServiceCardProps {
  title: string
  description: string
  icon: string
  link: string
  imageUrl?: string
}

export default function ServiceCard({ title, description, icon, link, imageUrl }: ServiceCardProps) {
  const getIcon = () => {
    switch (icon) {
      case "printer":
        return <Printer className="h-8 w-8 text-yellow-500" />
      case "scan":
        return <FileText className="h-8 w-8 text-yellow-500" />
      case "toner":
        return <Cpu className="h-8 w-8 text-yellow-500" />
      case "code":
        return <Code className="h-8 w-8 text-yellow-500" />
      case "video":
        return <Video className="h-8 w-8 text-yellow-500" />
      case "pen":
        return <PenTool className="h-8 w-8 text-yellow-500" />
      default:
        return <Printer className="h-8 w-8 text-yellow-500" />
    }
  }

  return (
    <Card className="border-none shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-2xl overflow-hidden">
      <CardContent className="p-6 text-center">
        <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mb-4 mx-auto">
          {getIcon()}
        </div>
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        <Link
          href={link}
          className="text-yellow-500 font-semibold inline-flex items-center justify-center w-full rounded-xl"
        >
          Learn more
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </Link>
      </CardContent>
    </Card>
  )
}
