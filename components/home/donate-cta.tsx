import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Heart, ArrowRight } from "lucide-react"

export function DonateCta() {
  return (
    <section className="py-20 md:py-28 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-card rounded-2xl shadow-lg p-8 md:p-12 relative overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-primary/10 rounded-full translate-y-1/2 -translate-x-1/2" />

            <div className="relative z-10 text-center">
              {/* Heart Icon */}
              <div className="inline-flex items-center justify-center w-16 h-16 bg-accent rounded-full mb-6">
                <Heart className="h-8 w-8 text-accent-foreground fill-accent-foreground" />
              </div>

              {/* Content */}
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
                Your Support Changes Lives
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl mx-auto mb-8">
                Every donation, no matter the size, helps us provide education, healthcare, 
                and economic opportunities to women in need. Join us in creating lasting change.
              </p>

              {/* Donation Tiers */}
              <div className="flex flex-wrap justify-center gap-4 mb-8">
                {["$25", "$50", "$100", "$250"].map((amount) => (
                  <div
                    key={amount}
                    className="px-6 py-3 bg-secondary rounded-lg text-foreground font-medium hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer"
                  >
                    {amount}
                  </div>
                ))}
              </div>

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
                  <Link href="/volunteer">
                    Become a Volunteer
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>

              {/* Trust Badge */}
              <p className="mt-8 text-sm text-muted-foreground">
                100% of donations go directly to our programs. Tax-deductible contributions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
