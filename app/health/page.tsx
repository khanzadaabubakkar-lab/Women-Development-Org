"use client"

import { useEffect, useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

type CheckResult = { ok: boolean; message: string }
type HealthResponse = { ok: boolean; checks: Record<string, CheckResult> }

export default function HealthPage() {
  const [data, setData] = useState<HealthResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const run = async () => {
      try {
        const res = await fetch("/api/health", { cache: "no-store" })
        const json = (await res.json()) as HealthResponse
        setData(json)
        if (!res.ok) {
          setError("One or more checks failed.")
        }
      } catch {
        setError("Unable to run health checks.")
      } finally {
        setLoading(false)
      }
    }

    run()
  }, [])

  return (
    <div className="min-h-screen flex flex-col bg-secondary">
      <Header />
      <main className="flex-1 py-14 md:py-20">
        <section className="container mx-auto px-4">
          <div className="mx-auto w-full max-w-3xl rounded-2xl border border-border bg-card p-6 shadow-sm md:p-8">
            <h1 className="font-serif text-3xl font-bold text-foreground md:text-4xl">
              System Health Check
            </h1>
            <p className="mt-2 text-muted-foreground">
              Verifies Supabase environment and required database tables/columns.
            </p>

            {loading && <p className="mt-6 text-muted-foreground">Running checks...</p>}

            {!loading && error && (
              <p className="mt-6 rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
                {error}
              </p>
            )}

            {!loading && data && (
              <div className="mt-6 space-y-3">
                <div
                  className={`rounded-md border px-3 py-2 text-sm ${
                    data.ok
                      ? "border-emerald-300 bg-emerald-50 text-emerald-700"
                      : "border-destructive/30 bg-destructive/10 text-destructive"
                  }`}
                >
                  Overall status: {data.ok ? "Healthy" : "Issues found"}
                </div>

                {Object.entries(data.checks).map(([key, check]) => (
                  <div key={key} className="rounded-md border border-border bg-background px-3 py-3">
                    <p className="text-sm font-medium text-foreground">
                      {key} - {check.ok ? "OK" : "Failed"}
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground">{check.message}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
