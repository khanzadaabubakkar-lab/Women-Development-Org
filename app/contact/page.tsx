"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { supabase } from "@/lib/supabase"
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle2,
  MessageSquare,
  HelpCircle,
  Building2,
  HandHeart
} from "lucide-react"

const contactInfo = [
  {
    icon: MapPin,
    title: "Visit Us",
    details: ["123 Hope Street, Suite 200", "New York, NY 10001"],
  },
  {
    icon: Phone,
    title: "Call Us",
    details: ["(555) 123-4567", "Mon-Fri, 9am-6pm EST"],
  },
  {
    icon: Mail,
    title: "Email Us",
    details: ["hello@empowerher.org", "support@empowerher.org"],
  },
  {
    icon: Clock,
    title: "Office Hours",
    details: ["Monday - Friday: 9am - 6pm", "Saturday: 10am - 2pm"],
  },
]

const inquiryTypes = [
  { value: "general", label: "General Inquiry", icon: MessageSquare },
  { value: "volunteer", label: "Volunteering", icon: HandHeart },
  { value: "partnership", label: "Partnership", icon: Building2 },
  { value: "support", label: "Get Support", icon: HelpCircle },
]

const faqs = [
  {
    question: "How can I donate to Empower Her?",
    answer: "You can donate online through our secure donation page, by mail, or by setting up a recurring donation. We accept credit cards, bank transfers, and various online payment methods.",
  },
  {
    question: "Is my donation tax-deductible?",
    answer: "Yes! Empower Her Foundation is a registered 501(c)(3) nonprofit organization. All donations are tax-deductible to the extent allowed by law.",
  },
  {
    question: "How can I volunteer with Empower Her?",
    answer: "Visit our Volunteer page to fill out an application. We have opportunities in education, healthcare support, business mentoring, and community outreach.",
  },
  {
    question: "Do you offer support services for women?",
    answer: "Yes, we provide various support services including educational programs, healthcare access, economic empowerment initiatives, and counseling services. Contact us to learn more about available programs in your area.",
  },
]

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    inquiryType: "general",
    subject: "",
    message: "",
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    setErrorMessage("")

    if (!supabase) {
      setErrorMessage("Supabase is not configured. Please check environment variables.")
      return
    }

    if (!formData.name.trim() || !formData.email.trim() || !formData.subject.trim() || !formData.message.trim()) {
      setErrorMessage("Please fill out all required fields.")
      return
    }

    setIsSubmitting(true)

    const { error } = await supabase.from("contact_messages").insert([
      {
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim() || null,
        inquiry_type: formData.inquiryType,
        subject: formData.subject.trim(),
        message: formData.message.trim(),
      },
    ])

    setIsSubmitting(false)

    if (error) {
      setErrorMessage(`Message could not be sent: ${error.message}`)
      return
    }

    setIsSubmitted(true)
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center py-20">
          <div className="text-center max-w-md mx-auto px-4">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-primary rounded-full mb-6">
              <CheckCircle2 className="h-10 w-10 text-primary-foreground" />
            </div>
            <h1 className="font-serif text-3xl font-bold text-foreground mb-4">
              Message Sent!
            </h1>
            <p className="text-muted-foreground mb-8">
              Thank you for reaching out. Our team will review your message and 
              get back to you within 1-2 business days.
            </p>
            <Button
              onClick={() => setIsSubmitted(false)}
              variant="outline"
              className="border-primary text-primary"
            >
              Send Another Message
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-secondary py-16 md:py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <span className="text-accent font-medium text-sm uppercase tracking-wider">
                Contact Us
              </span>
              <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mt-3 mb-4 text-balance">
                We&apos;re Here to Help
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Have a question, want to partner with us, or need support? 
                We&apos;d love to hear from you. Reach out and let&apos;s start a conversation.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Info Cards */}
        <section className="py-12 bg-card">
          <div className="container mx-auto px-4">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {contactInfo.map((info) => (
                <div
                  key={info.title}
                  className="bg-secondary rounded-xl p-6 text-center hover:shadow-lg transition-shadow"
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full mb-4">
                    <info.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{info.title}</h3>
                  {info.details.map((detail, index) => (
                    <p key={index} className="text-sm text-muted-foreground">
                      {detail}
                    </p>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="py-16 bg-card">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="grid lg:grid-cols-5 gap-12">
                {/* Form */}
                <div className="lg:col-span-3">
                  <h2 className="font-serif text-2xl font-bold text-foreground mb-6">
                    Send Us a Message
                  </h2>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Inquiry Type */}
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-3">
                        What can we help you with?
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        {inquiryTypes.map((type) => (
                          <button
                            key={type.value}
                            type="button"
                            onClick={() =>
                              setFormData((prev) => ({
                                ...prev,
                                inquiryType: type.value,
                              }))
                            }
                            className={`flex items-center gap-3 p-4 rounded-lg border-2 transition-all ${
                              formData.inquiryType === type.value
                                ? "border-primary bg-primary/5"
                                : "border-border bg-secondary hover:border-primary/50"
                            }`}
                          >
                            <type.icon
                              className={`h-5 w-5 ${
                                formData.inquiryType === type.value
                                  ? "text-primary"
                                  : "text-muted-foreground"
                              }`}
                            />
                            <span className="text-sm font-medium text-foreground">
                              {type.label}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Contact Details */}
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Full Name *
                        </label>
                        <Input
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Enter your name"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Email Address *
                        </label>
                        <Input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="Enter your email"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Phone Number (Optional)
                      </label>
                      <Input
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="Enter your phone number"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Subject *
                      </label>
                      <Input
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        placeholder="What is this regarding?"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Message *
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        rows={5}
                        className="w-full px-3 py-2 bg-background border border-input rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                        placeholder="Tell us more about your inquiry..."
                        required
                      />
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      disabled={isSubmitting}
                      className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
                    >
                      <Send className="mr-2 h-4 w-4" />
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </Button>
                    {errorMessage && (
                      <p className="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
                        {errorMessage}
                      </p>
                    )}
                  </form>
                </div>

                {/* Emergency Support */}
                <div className="lg:col-span-2">
                  <div className="bg-primary rounded-xl p-6 text-primary-foreground mb-6">
                    <h3 className="font-serif text-xl font-semibold mb-3">
                      Need Immediate Support?
                    </h3>
                    <p className="text-primary-foreground/80 text-sm mb-4">
                      If you or someone you know is in crisis, please reach out 
                      to these resources:
                    </p>
                    <div className="space-y-3">
                      <div className="bg-primary-foreground/10 rounded-lg p-3">
                        <p className="font-medium text-sm">National Domestic Violence Hotline</p>
                        <p className="text-accent text-sm">1-800-799-7233</p>
                      </div>
                      <div className="bg-primary-foreground/10 rounded-lg p-3">
                        <p className="font-medium text-sm">Crisis Text Line</p>
                        <p className="text-accent text-sm">Text HOME to 741741</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-secondary rounded-xl p-6">
                    <h3 className="font-serif text-lg font-semibold text-foreground mb-3">
                      Connect With Us
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4">
                      Follow us on social media for updates, stories, and ways to get involved.
                    </p>
                    <div className="flex gap-3">
                      {["Facebook", "Twitter", "Instagram", "LinkedIn"].map((social) => (
                        <div
                          key={social}
                          className="w-10 h-10 bg-card rounded-full flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer"
                        >
                          <span className="text-xs font-medium">{social[0]}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-secondary">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-12">
                <span className="text-accent font-medium text-sm uppercase tracking-wider">
                  FAQ
                </span>
                <h2 className="font-serif text-3xl font-bold text-foreground mt-2">
                  Frequently Asked Questions
                </h2>
              </div>
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <div
                    key={index}
                    className="bg-card rounded-xl p-6"
                  >
                    <h3 className="font-semibold text-foreground mb-2">
                      {faq.question}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
