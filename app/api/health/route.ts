import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

type CheckResult = {
  ok: boolean
  message: string
}

function getServerSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!url || !key) {
    return null
  }

  return createClient(url, key)
}

export async function GET() {
  const checks: Record<string, CheckResult> = {}

  const hasUrl = Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL)
  const hasAnon = Boolean(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
  checks.env = {
    ok: hasUrl && hasAnon,
    message:
      hasUrl && hasAnon
        ? "Supabase env vars found."
        : "Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY.",
  }

  const supabase = getServerSupabase()
  if (!supabase) {
    return NextResponse.json(
      {
        ok: false,
        checks,
      },
      { status: 500 },
    )
  }

  const volunteers = await supabase
    .from("volunteers")
    .select("id,full_name,email,phone,city,skills,availability", { head: true, count: "exact" })

  checks.volunteers_table = volunteers.error
    ? { ok: false, message: volunteers.error.message }
    : { ok: true, message: "volunteers table and required columns look good." }

  const donations = await supabase
    .from("donations")
    .select("id,first_name,last_name,email,phone,currency,amount,donation_type,payment_method,status", {
      head: true,
      count: "exact",
    })

  checks.donations_table = donations.error
    ? { ok: false, message: donations.error.message }
    : { ok: true, message: "donations table and expected columns look good." }

  const contactMessages = await supabase
    .from("contact_messages")
    .select("id,name,email,phone,inquiry_type,subject,message", { head: true, count: "exact" })

  checks.contact_messages_table = contactMessages.error
    ? { ok: false, message: contactMessages.error.message }
    : { ok: true, message: "contact_messages table and expected columns look good." }

  const ok = Object.values(checks).every((c) => c.ok)
  return NextResponse.json(
    {
      ok,
      checks,
    },
    { status: ok ? 200 : 500 },
  )
}
