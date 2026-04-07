import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Heart } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-secondary py-20 md:py-32">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 -skew-x-12 transform origin-top-right" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/10 rounded-full -translate-x-1/2 translate-y-1/2" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-card px-4 py-2 rounded-full shadow-sm mb-8">
            <Heart className="h-4 w-4 text-accent fill-accent" />
            <span className="text-sm font-medium text-muted-foreground">
              Transforming Lives Since 2010
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight text-balance mb-6">
            Empowering Women to Rewrite Their Futures
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-10">
            We believe every woman deserves the opportunity to thrive. Through education, 
            healthcare, and economic support, we&apos;re building a world where women lead, 
            inspire, and succeed.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium px-8"
            >
              <Link href="/donate">
                Donate Now
                <Heart className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-primary text-primary hover:bg-primary/5 font-medium px-8"
            >
              <Link href="/about">
                Learn More
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>

        {/* Trusted By */}
        <div className="mt-16 pt-8 border-t border-border">
          <p className="text-center text-sm text-muted-foreground mb-6">
            Trusted by organizations worldwide
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 opacity-60">
            <span className="font-serif text-xl font-semibold text-foreground">UN Women</span>
            <span className="font-serif text-xl font-semibold text-foreground">UNICEF</span>
            <span className="font-serif text-xl font-semibold text-foreground">World Bank</span>
            <span className="font-serif text-xl font-semibold text-foreground">Gates Foundation</span>
          </div>
        </div>
      </div>
    </section>
  )
}
