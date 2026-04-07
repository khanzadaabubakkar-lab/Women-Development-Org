import { GraduationCap, HeartPulse, Briefcase } from "lucide-react"

const pillars = [
  {
    icon: GraduationCap,
    title: "Education",
    description:
      "Providing access to quality education through scholarships, skill development programs, and literacy initiatives that open doors to new opportunities.",
    stats: "12,000+ women educated",
    color: "bg-primary",
  },
  {
    icon: HeartPulse,
    title: "Healthcare",
    description:
      "Ensuring women have access to essential healthcare services, maternal care, mental health support, and wellness programs for holistic well-being.",
    stats: "50+ health camps annually",
    color: "bg-accent",
  },
  {
    icon: Briefcase,
    title: "Economic Independence",
    description:
      "Empowering women through microfinance, entrepreneurship training, job placement services, and business development support.",
    stats: "8,500+ businesses launched",
    color: "bg-primary",
  },
]

export function PillarsSection() {
  return (
    <section className="py-20 md:py-28 bg-card">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="text-accent font-medium text-sm uppercase tracking-wider">
            Our Focus Areas
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mt-3 mb-4 text-balance">
            Three Pillars of Empowerment
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Our comprehensive approach addresses the fundamental needs that enable 
            women to build sustainable, independent lives.
          </p>
        </div>

        {/* Pillars Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {pillars.map((pillar, index) => (
            <div
              key={pillar.title}
              className="group relative bg-secondary rounded-xl p-8 hover:shadow-lg transition-all duration-300"
            >
              {/* Icon */}
              <div
                className={`inline-flex items-center justify-center w-14 h-14 rounded-lg ${pillar.color} mb-6`}
              >
                <pillar.icon className="h-7 w-7 text-primary-foreground" />
              </div>

              {/* Content */}
              <h3 className="font-serif text-xl font-semibold text-foreground mb-3">
                {pillar.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                {pillar.description}
              </p>

              {/* Stats Badge */}
              <div className="inline-flex items-center px-3 py-1 bg-card rounded-full">
                <span className="text-sm font-medium text-primary">{pillar.stats}</span>
              </div>

              {/* Decorative Number */}
              <div className="absolute top-6 right-6 font-serif text-6xl font-bold text-primary/5 group-hover:text-primary/10 transition-colors">
                {String(index + 1).padStart(2, "0")}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
