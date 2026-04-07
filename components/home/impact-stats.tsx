"use client"

import { useEffect, useState, useRef } from "react"
import { Users, HandHeart, FolderKanban, Globe } from "lucide-react"

const stats = [
  {
    icon: Users,
    value: 25000,
    suffix: "+",
    label: "Women Trained",
    description: "Lives transformed through our programs",
  },
  {
    icon: HandHeart,
    value: 3500,
    suffix: "+",
    label: "Active Volunteers",
    description: "Dedicated individuals making a difference",
  },
  {
    icon: FolderKanban,
    value: 150,
    suffix: "+",
    label: "Projects Active",
    description: "Initiatives running across communities",
  },
  {
    icon: Globe,
    value: 45,
    suffix: "",
    label: "Countries Reached",
    description: "Global impact and presence",
  },
]

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0)
  const [hasAnimated, setHasAnimated] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true)
          const duration = 2000
          const steps = 60
          const increment = value / steps
          let current = 0

          const timer = setInterval(() => {
            current += increment
            if (current >= value) {
              setCount(value)
              clearInterval(timer)
            } else {
              setCount(Math.floor(current))
            }
          }, duration / steps)

          return () => clearInterval(timer)
        }
      },
      { threshold: 0.5 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [value, hasAnimated])

  return (
    <div ref={ref} className="font-serif text-4xl md:text-5xl font-bold text-primary-foreground">
      {count.toLocaleString()}
      {suffix}
    </div>
  )
}

export function ImpactStats() {
  return (
    <section className="py-16 md:py-20 bg-primary">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="text-accent font-medium text-sm uppercase tracking-wider">
            Our Impact
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary-foreground mt-3 text-balance">
            Numbers That Tell Our Story
          </h2>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="text-center group"
            >
              {/* Icon */}
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-accent/20 mb-4 group-hover:bg-accent/30 transition-colors">
                <stat.icon className="h-6 w-6 text-accent" />
              </div>

              {/* Counter */}
              <AnimatedCounter value={stat.value} suffix={stat.suffix} />

              {/* Label */}
              <div className="mt-2 font-medium text-primary-foreground/90">
                {stat.label}
              </div>

              {/* Description */}
              <p className="mt-1 text-sm text-primary-foreground/70 hidden md:block">
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
