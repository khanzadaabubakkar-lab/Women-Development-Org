"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { supabase } from "@/lib/supabase"
import { CheckCircle2, Send } from "lucide-react"

const skillOptions = ["Legal Aid", "Mentoring", "Marketing", "Healthcare", "Admin"] as const
const availabilityOptions = ["Weekdays", "Weekends", "Both"] as const

type FormState = {
  full_name: string
  email: string
  phone: string
  city: string
  skills: string
  availability: string
}

const initialFormState: FormState = {
  full_name: "",
  email: "",
  phone: "",
  city: "",
  skills: "",
  availability: "",
}

export default function VolunteerPage() {
  const [formData, setFormData] = useState<FormState>(initialFormState)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const hasEmptyFields = Object.values(formData).some((value) => !value.trim())

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMessage("")

    if (!supabase) {
      setErrorMessage("Supabase is not configured. Please check environment variables.")
      return
    }

    if (hasEmptyFields) {
      setErrorMessage("Please fill out all fields before submitting.")
      return
    }

    setIsSubmitting(true)

    try {
      const basePayload = {
        full_name: formData.full_name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        city: formData.city.trim(),
        skills: formData.skills,
      }

      let { error } = await supabase.from("volunteers").insert([
        {
          ...basePayload,
          availability: formData.availability,
        },
      ])

      // Some schemas use a misspelled column: "availibility".
      if (error?.message?.toLowerCase().includes("availability")) {
        const retry = await supabase.from("volunteers").insert([
          {
            ...basePayload,
            availibility: formData.availability,
          },
        ])
        error = retry.error
      }

      if (error) {
        setErrorMessage(`Submission failed: ${error.message}`)
        return
      }
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Unknown error while submitting."
      setErrorMessage(`Submission failed: ${message}`)
      return
    } finally {
      setIsSubmitting(false)
    }

    setIsSubmitted(true)
    setFormData(initialFormState)
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex flex-col bg-secondary">
        <Header />
        <main className="flex-1 flex items-center justify-center py-20 px-4">
          <div className="w-full max-w-xl rounded-2xl border border-border bg-card p-8 text-center shadow-sm">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-primary">
              <CheckCircle2 className="h-8 w-8 text-primary-foreground" />
            </div>
            <h1 className="font-serif text-3xl font-bold text-foreground">
              Registration Submitted
            </h1>
            <p className="mt-3 text-muted-foreground">
              Thank you for volunteering. We have received your details and will contact you soon.
            </p>
            <Button
              onClick={() => setIsSubmitted(false)}
              variant="outline"
              className="mt-7 border-primary text-primary hover:bg-primary/10"
            >
              Submit Another Response
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-secondary">
      <Header />
      <main className="flex-1 py-14 md:py-20">
        <section className="container mx-auto px-4">
          <div className="mx-auto w-full max-w-2xl rounded-2xl border border-border bg-card p-6 shadow-sm md:p-8">
            <h1 className="font-serif text-3xl font-bold text-foreground md:text-4xl">
              Volunteer Registration
            </h1>
            <p className="mt-2 text-muted-foreground">
              Complete the form below to join our volunteer network.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <div>
                <label htmlFor="full_name" className="mb-2 block text-sm font-medium text-foreground">
                  Full Name *
                </label>
                <Input
                  id="full_name"
                  name="full_name"
                  value={formData.full_name}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label htmlFor="email" className="mb-2 block text-sm font-medium text-foreground">
                    Email *
                  </label>
                  <Input
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="mb-2 block text-sm font-medium text-foreground">
                    Phone *
                  </label>
                  <Input
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Enter your phone number"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="city" className="mb-2 block text-sm font-medium text-foreground">
                  City *
                </label>
                <Input
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  placeholder="Enter your city"
                  required
                />
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label htmlFor="skills" className="mb-2 block text-sm font-medium text-foreground">
                    Skills *
                  </label>
                  <select
                    id="skills"
                    name="skills"
                    value={formData.skills}
                    onChange={handleInputChange}
                    required
                    className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <option value="">Select a skill area</option>
                    {skillOptions.map((skill) => (
                      <option key={skill} value={skill}>
                        {skill}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="availability"
                    className="mb-2 block text-sm font-medium text-foreground"
                  >
                    Availability *
                  </label>
                  <select
                    id="availability"
                    name="availability"
                    value={formData.availability}
                    onChange={handleInputChange}
                    required
                    className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <option value="">Select availability</option>
                    {availabilityOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {errorMessage && (
                <p className="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
                  {errorMessage}
                </p>
              )}

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
              >
                <Send className="mr-2 h-4 w-4" />
                {isSubmitting ? "Submitting..." : "Submit Registration"}
              </Button>

              <p className="text-center text-xs text-muted-foreground">
                * All fields are required
              </p>
            </form>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
