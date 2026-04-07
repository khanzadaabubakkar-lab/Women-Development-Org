"use client"

import { useMemo, useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DONATION_CURRENCIES,
  getCurrencyMeta,
  type DonationCurrencyCode,
} from "@/lib/currencies"
import { Heart, Check, Shield, CreditCard, Building, Repeat } from "lucide-react"

const donationAmounts = [25, 50, 100, 250, 500, 1000]

const donationImpact = [
  "Provides school supplies for one student for a semester",
  "Funds a health screening for 5 women",
  "Sponsors a woman's business skills workshop",
  "Provides 6 months of mentorship for an entrepreneur",
  "Funds a complete literacy course for 10 women",
  "Provides startup capital for a woman-owned business",
]

const trustBadges = [
  {
    icon: Shield,
    title: "Secure Donation",
    description: "256-bit SSL encryption",
  },
  {
    icon: Check,
    title: "Tax Deductible",
    description: "501(c)(3) organization",
  },
  {
    icon: Heart,
    title: "100% Impact",
    description: "Goes directly to programs",
  },
]

/** Fixed locale so server and client render identical currency strings (avoids hydration mismatch). */
function formatAmountInCurrency(amount: number, code: DonationCurrencyCode) {
  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: code,
      maximumFractionDigits: code === "JPY" ? 0 : 2,
    }).format(amount)
  } catch {
    const meta = getCurrencyMeta(code)
    return `${meta.symbol}${amount.toFixed(code === "JPY" ? 0 : 2)}`
  }
}

export default function DonatePage() {
  const [currency, setCurrency] = useState<DonationCurrencyCode>("USD")
  const [selectedAmount, setSelectedAmount] = useState<number | null>(100)
  const [customAmount, setCustomAmount] = useState("")
  const [donationType, setDonationType] = useState<"one-time" | "monthly">("one-time")

  const currencyMeta = useMemo(() => getCurrencyMeta(currency), [currency])

  const currentAmount = useMemo(() => {
    if (selectedAmount !== null) return selectedAmount
    const trimmed = customAmount.trim()
    if (trimmed === "") return 0
    const n = Number.parseFloat(trimmed)
    return Number.isFinite(n) && n > 0 ? n : 0
  }, [selectedAmount, customAmount])

  const handleAmountSelect = (amount: number) => {
    setSelectedAmount(amount)
    setCustomAmount("")
  }

  const handleCustomAmountChange = (value: string) => {
    setCustomAmount(value)
    setSelectedAmount(null)
  }

  const amountLabel =
    currentAmount > 0 ? formatAmountInCurrency(currentAmount, currency) : ""

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-secondary py-16 md:py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-accent rounded-full mb-6">
                <Heart className="h-8 w-8 text-accent-foreground fill-accent-foreground" />
              </div>
              <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
                Make a Difference Today
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Your generous donation helps us provide education, healthcare, and economic
                opportunities to women in need. Every contribution creates lasting change.
              </p>
            </div>
          </div>
        </section>

        {/* Donation Form Section */}
        <section className="py-16 bg-card">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="grid lg:grid-cols-5 gap-8">
                {/* Donation Form */}
                <div className="lg:col-span-3">
                  <div className="bg-secondary rounded-xl p-6 md:p-8">
                    {/* Donation Type Toggle */}
                    <div className="flex bg-card rounded-lg p-1 mb-8">
                      <button
                        type="button"
                        onClick={() => setDonationType("one-time")}
                        className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-md text-sm font-medium transition-colors ${
                          donationType === "one-time"
                            ? "bg-primary text-primary-foreground"
                            : "text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        <CreditCard className="h-4 w-4" />
                        One-Time
                      </button>
                      <button
                        type="button"
                        onClick={() => setDonationType("monthly")}
                        className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-md text-sm font-medium transition-colors ${
                          donationType === "monthly"
                            ? "bg-primary text-primary-foreground"
                            : "text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        <Repeat className="h-4 w-4" />
                        Monthly
                      </button>
                    </div>

                    {/* Currency + Amount */}
                    <div className="mb-8 space-y-4">
                      <div>
                        <label
                          htmlFor="donation-currency"
                          className="block text-sm font-medium text-foreground mb-2"
                        >
                          Currency
                        </label>
                        <select
                          id="donation-currency"
                          value={currency}
                          onChange={(e) =>
                            setCurrency(e.target.value as DonationCurrencyCode)
                          }
                          className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        >
                          {DONATION_CURRENCIES.map((c) => (
                            <option key={c.code} value={c.code}>
                              {c.label} ({c.code})
                            </option>
                          ))}
                        </select>
                        <p className="mt-1 text-xs text-muted-foreground">
                          Choose the currency you want to donate in. Amounts below are shown in that
                          currency.
                        </p>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-foreground mb-3">
                          Select amount
                        </label>
                        <div className="grid grid-cols-3 gap-3 mb-4">
                          {donationAmounts.map((amount) => (
                            <button
                              key={amount}
                              type="button"
                              onClick={() => handleAmountSelect(amount)}
                              className={`py-3 px-4 rounded-lg text-sm font-medium transition-colors ${
                                selectedAmount === amount
                                  ? "bg-primary text-primary-foreground"
                                  : "bg-card text-foreground hover:bg-primary/10"
                              }`}
                            >
                              {formatAmountInCurrency(amount, currency)}
                            </button>
                          ))}
                        </div>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm pointer-events-none max-w-[4rem] truncate">
                            {currencyMeta.symbol}
                          </span>
                          <Input
                            type="number"
                            min={0}
                            step="any"
                            placeholder="Custom amount"
                            value={customAmount}
                            onChange={(e) => handleCustomAmountChange(e.target.value)}
                            className="pl-14"
                            aria-label="Custom donation amount"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Donor Information */}
                    <div className="space-y-4 mb-8">
                      <label className="block text-sm font-medium text-foreground">
                        Your Information
                      </label>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <Input placeholder="First Name" />
                        <Input placeholder="Last Name" />
                      </div>
                      <Input type="email" placeholder="Email Address" />
                      <Input placeholder="Phone (Optional)" />
                    </div>

                    {/* Payment Method */}
                    <div className="mb-8">
                      <label className="block text-sm font-medium text-foreground mb-3">
                        Payment Method
                      </label>
                      <div className="grid sm:grid-cols-2 gap-3">
                        <button
                          type="button"
                          className="flex items-center justify-center gap-2 py-3 px-4 bg-card rounded-lg text-sm font-medium text-foreground hover:bg-primary/10 transition-colors border-2 border-primary"
                        >
                          <CreditCard className="h-4 w-4" />
                          Credit Card
                        </button>
                        <button
                          type="button"
                          className="flex items-center justify-center gap-2 py-3 px-4 bg-card rounded-lg text-sm font-medium text-muted-foreground hover:bg-primary/10 transition-colors"
                        >
                          <Building className="h-4 w-4" />
                          Bank Transfer
                        </button>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <Button
                      size="lg"
                      className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
                    >
                      <Heart className="mr-2 h-4 w-4" />
                      Donate {currentAmount > 0 ? amountLabel : ""}{" "}
                      {donationType === "monthly" ? "Monthly" : "Now"}
                    </Button>

                    {/* Security Note */}
                    <p className="mt-4 text-xs text-center text-muted-foreground">
                      Your payment information is encrypted and secure. We never store your card
                      details.
                    </p>
                  </div>
                </div>

                {/* Impact Sidebar */}
                <div className="lg:col-span-2">
                  <div className="bg-primary rounded-xl p-6 text-primary-foreground mb-6">
                    <h3 className="font-serif text-xl font-semibold mb-4">Your Impact</h3>
                    <div className="space-y-4">
                      {donationImpact.map((text, index) => (
                        <div key={index} className="flex gap-3">
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                          <span className="text-primary-foreground/80 text-sm">{text}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Trust Badges */}
                  <div className="space-y-4">
                    {trustBadges.map((badge) => (
                      <div
                        key={badge.title}
                        className="flex items-start gap-3 bg-secondary rounded-lg p-4"
                      >
                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                          <badge.icon className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-medium text-foreground text-sm">{badge.title}</h4>
                          <p className="text-xs text-muted-foreground">{badge.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Other Ways to Give */}
        <section className="py-16 bg-secondary">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="font-serif text-3xl font-bold text-foreground mb-4">
                Other Ways to Give
              </h2>
              <p className="text-muted-foreground">
                There are many ways to support our mission
              </p>
            </div>
            <div className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="bg-card rounded-xl p-6 text-center">
                <h3 className="font-serif text-lg font-semibold text-foreground mb-2">
                  Corporate Partnerships
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Partner with us for CSR initiatives and employee giving programs.
                </p>
                <Button variant="outline" size="sm" className="border-primary text-primary">
                  Learn More
                </Button>
              </div>
              <div className="bg-card rounded-xl p-6 text-center">
                <h3 className="font-serif text-lg font-semibold text-foreground mb-2">
                  Planned Giving
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Include Empower Her in your estate planning and create a lasting legacy.
                </p>
                <Button variant="outline" size="sm" className="border-primary text-primary">
                  Learn More
                </Button>
              </div>
              <div className="bg-card rounded-xl p-6 text-center">
                <h3 className="font-serif text-lg font-semibold text-foreground mb-2">
                  In-Kind Donations
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Donate goods, services, or professional expertise to support our work.
                </p>
                <Button variant="outline" size="sm" className="border-primary text-primary">
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
