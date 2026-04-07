/** ISO 4217 codes supported for donation amounts. */
export const DONATION_CURRENCIES = [
  { code: "USD", label: "US Dollar", symbol: "$" },
  { code: "EUR", label: "Euro", symbol: "€" },
  { code: "GBP", label: "British Pound", symbol: "£" },
  { code: "PKR", label: "Pakistani Rupee", symbol: "₨" },
  { code: "AED", label: "UAE Dirham", symbol: "د.إ" },
  { code: "SAR", label: "Saudi Riyal", symbol: "﷼" },
  { code: "INR", label: "Indian Rupee", symbol: "₹" },
  { code: "CAD", label: "Canadian Dollar", symbol: "CA$" },
  { code: "AUD", label: "Australian Dollar", symbol: "A$" },
  { code: "JPY", label: "Japanese Yen", symbol: "¥" },
  { code: "CHF", label: "Swiss Franc", symbol: "CHF" },
  { code: "CNY", label: "Chinese Yuan", symbol: "¥" },
] as const

export type DonationCurrencyCode = (typeof DONATION_CURRENCIES)[number]["code"]

export function getCurrencyMeta(code: string) {
  return DONATION_CURRENCIES.find((c) => c.code === code) ?? DONATION_CURRENCIES[0]
}
