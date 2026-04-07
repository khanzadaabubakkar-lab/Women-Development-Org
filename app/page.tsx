import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { HeroSection } from "@/components/home/hero-section"
import { PillarsSection } from "@/components/home/pillars-section"
import { ImpactStats } from "@/components/home/impact-stats"
import { DonateCta } from "@/components/home/donate-cta"

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <PillarsSection />
        <ImpactStats />
        <DonateCta />
      </main>
      <Footer />
    </div>
  )
}
