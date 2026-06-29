import { NextResponse } from "next/server"

export async function GET() {
  try {
    const envCheck = {
      DATABASE_URL_exists: !!process.env.DATABASE_URL,
      DATABASE_URL_prefix: process.env.DATABASE_URL?.substring(0, 30) || "NOT SET",
      NODE_ENV: process.env.NODE_ENV || "NOT SET",
      VERCEL_ENV: process.env.VERCEL_ENV || "NOT SET",
    }

    const headers = Object.fromEntries(
      Object.entries(process.env)
        .filter(([k]) => k.includes("VERCEL") || k === "NODE_ENV" || k === "NEXT_RUNTIME")
        .slice(0, 30)
        .sort()
    )

    return NextResponse.json({ status: "ok", envCheck, headers, url: process.env.DATABASE_URL?.slice(0, 40) + "..." || "none" })
  } catch (error) {
    return NextResponse.json({ status: "error", message: String(error) }, { status: 500 })
  }
}
