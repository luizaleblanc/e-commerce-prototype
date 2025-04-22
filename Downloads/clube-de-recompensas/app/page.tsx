import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { HeroSection } from "@/components/hero-section"
import { SerILBSection } from "@/components/ser-ilb-section"
import { PageTransition } from "@/components/page-transition"

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      {/* Header */}
      <Header />

      <PageTransition>
        {/* Hero Section */}
        <HeroSection />

        {/* Ser ILB Section */}
        <SerILBSection />
      </PageTransition>

      <Footer />
    </main>
  )
}
