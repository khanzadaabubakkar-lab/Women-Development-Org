import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Target, Eye, Heart, Users, Award, Calendar } from "lucide-react"

const values = [
  {
    icon: Heart,
    title: "Compassion",
    description: "We approach every woman with empathy, understanding her unique circumstances and challenges.",
  },
  {
    icon: Users,
    title: "Community",
    description: "We believe in the power of collective action and building supportive networks.",
  },
  {
    icon: Award,
    title: "Excellence",
    description: "We strive for the highest standards in all our programs and initiatives.",
  },
  {
    icon: Target,
    title: "Impact",
    description: "We measure our success by the lasting positive change we create in women&apos;s lives.",
  },
]

const timeline = [
  {
    year: "2010",
    title: "Foundation Established",
    description: "Started with a small team of 5 volunteers and a vision to empower women.",
  },
  {
    year: "2013",
    title: "First Education Center",
    description: "Opened our first women&apos;s education center serving 200 students annually.",
  },
  {
    year: "2016",
    title: "Healthcare Initiative",
    description: "Launched mobile health clinics reaching rural communities.",
  },
  {
    year: "2019",
    title: "Economic Program",
    description: "Started microfinance and entrepreneurship training programs.",
  },
  {
    year: "2022",
    title: "Global Expansion",
    description: "Extended our reach to 45 countries with local partnerships.",
  },
  {
    year: "2024",
    title: "25,000 Lives Changed",
    description: "Reached a milestone of transforming 25,000 women&apos;s lives.",
  },
]

const team = [
  {
    name: "Dr. Sarah Mitchell",
    role: "Executive Director",
    bio: "20+ years in nonprofit leadership and women&apos;s rights advocacy.",
  },
  {
    name: "Maria Rodriguez",
    role: "Programs Director",
    bio: "Former UN Women advisor with expertise in community development.",
  },
  {
    name: "Dr. Amara Johnson",
    role: "Healthcare Lead",
    bio: "Public health specialist focused on maternal and reproductive health.",
  },
  {
    name: "Linda Chen",
    role: "Education Director",
    bio: "Educator with 15 years of experience in adult literacy programs.",
  },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-secondary py-20 md:py-28">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <span className="text-accent font-medium text-sm uppercase tracking-wider">
                About Us
              </span>
              <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mt-3 mb-6 text-balance">
                Our Story of Empowerment
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Since 2010, we&apos;ve been dedicated to creating lasting change in women&apos;s lives 
                through comprehensive support programs that address education, healthcare, 
                and economic independence.
              </p>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-20 bg-card">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12">
              {/* Mission */}
              <div className="bg-secondary rounded-xl p-8">
                <div className="inline-flex items-center justify-center w-14 h-14 bg-primary rounded-lg mb-6">
                  <Target className="h-7 w-7 text-primary-foreground" />
                </div>
                <h2 className="font-serif text-2xl font-bold text-foreground mb-4">
                  Our Mission
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  To empower women from underserved communities by providing access to 
                  quality education, healthcare services, and economic opportunities, 
                  enabling them to achieve self-sufficiency and become agents of change 
                  in their communities.
                </p>
              </div>

              {/* Vision */}
              <div className="bg-secondary rounded-xl p-8">
                <div className="inline-flex items-center justify-center w-14 h-14 bg-accent rounded-lg mb-6">
                  <Eye className="h-7 w-7 text-accent-foreground" />
                </div>
                <h2 className="font-serif text-2xl font-bold text-foreground mb-4">
                  Our Vision
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  A world where every woman has the resources, support, and opportunities 
                  to reach her full potential, break cycles of poverty, and lead a life 
                  of dignity, purpose, and fulfillment.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="py-20 bg-secondary">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <span className="text-accent font-medium text-sm uppercase tracking-wider">
                What Guides Us
              </span>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mt-3">
                Our Core Values
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value) => (
                <div
                  key={value.title}
                  className="bg-card rounded-xl p-6 text-center hover:shadow-lg transition-shadow"
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full mb-4">
                    <value.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-serif text-lg font-semibold text-foreground mb-2">
                    {value.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="py-20 bg-card">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <span className="text-accent font-medium text-sm uppercase tracking-wider">
                Our Journey
              </span>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mt-3">
                Milestones
              </h2>
            </div>
            <div className="max-w-3xl mx-auto">
              <div className="relative">
                {/* Timeline Line */}
                <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-border md:-translate-x-1/2" />
                
                {timeline.map((item, index) => (
                  <div
                    key={item.year}
                    className={`relative flex items-start gap-6 mb-8 ${
                      index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                    }`}
                  >
                    {/* Dot */}
                    <div className="absolute left-4 md:left-1/2 w-3 h-3 bg-primary rounded-full md:-translate-x-1/2 mt-2" />
                    
                    {/* Content */}
                    <div className={`ml-12 md:ml-0 md:w-1/2 ${index % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"}`}>
                      <div className="inline-flex items-center gap-2 text-accent font-medium text-sm mb-1">
                        <Calendar className="h-4 w-4" />
                        {item.year}
                      </div>
                      <h3 className="font-serif text-lg font-semibold text-foreground mb-1">
                        {item.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-20 bg-secondary">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <span className="text-accent font-medium text-sm uppercase tracking-wider">
                Leadership
              </span>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mt-3">
                Meet Our Team
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {team.map((member) => (
                <div
                  key={member.name}
                  className="bg-card rounded-xl p-6 text-center hover:shadow-lg transition-shadow"
                >
                  <div className="w-20 h-20 bg-primary/10 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="font-serif text-2xl font-bold text-primary">
                      {member.name.split(" ").map(n => n[0]).join("")}
                    </span>
                  </div>
                  <h3 className="font-serif text-lg font-semibold text-foreground">
                    {member.name}
                  </h3>
                  <p className="text-accent text-sm font-medium mb-2">
                    {member.role}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {member.bio}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
