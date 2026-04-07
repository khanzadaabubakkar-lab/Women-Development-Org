import Link from "next/link"
import { Heart, Mail, Phone, MapPin } from "lucide-react"

const quickLinks = [
  { href: "/about", label: "About Us" },
  { href: "/donate", label: "Donate" },
  { href: "/volunteer", label: "Volunteer" },
  { href: "/contact", label: "Contact" },
]

const programs = [
  { href: "#", label: "Education Programs" },
  { href: "#", label: "Healthcare Initiatives" },
  { href: "#", label: "Economic Empowerment" },
  { href: "#", label: "Community Support" },
]

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="h-10 w-10 rounded-full bg-accent flex items-center justify-center">
                <span className="text-accent-foreground font-serif font-bold text-lg">E</span>
              </div>
              <span className="font-serif text-xl font-semibold">Empower Her</span>
            </div>
            <p className="text-primary-foreground/80 text-sm leading-relaxed">
              Empowering women to rewrite their futures through education, healthcare, and economic independence.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-serif text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-primary-foreground/80 hover:text-accent text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Programs */}
          <div className="space-y-4">
            <h3 className="font-serif text-lg font-semibold">Our Programs</h3>
            <ul className="space-y-2">
              {programs.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-primary-foreground/80 hover:text-accent text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="font-serif text-lg font-semibold">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                <span className="text-primary-foreground/80 text-sm">
                  123 Hope Street, Suite 200<br />
                  New York, NY 10001
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-accent shrink-0" />
                <span className="text-primary-foreground/80 text-sm">(555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-accent shrink-0" />
                <span className="text-primary-foreground/80 text-sm">hello@empowerher.org</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-primary-foreground/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-primary-foreground/70 text-sm">
              &copy; {new Date().getFullYear()} Empower Her Foundation. All rights reserved.
            </p>
            <p className="text-primary-foreground/70 text-sm flex items-center gap-1">
              Made with <Heart className="h-4 w-4 text-accent fill-accent" /> for women everywhere
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
