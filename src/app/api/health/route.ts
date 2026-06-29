import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET() {
  try {
    const envCheck = {
      DATABASE_URL_exists: !!process.env.DATABASE_URL,
      NODE_ENV: process.env.NODE_ENV || "NOT SET",
      VERCEL_ENV: process.env.VERCEL_ENV || "NOT SET",
    }

    let dbStatus = "not checked"
    let componentCount = 0
    try {
      componentCount = await prisma.component.count()
      dbStatus = "connected"
    } catch (e) {
      dbStatus = `error: ${e instanceof Error ? e.message : String(e)}`
    }

    return NextResponse.json({
      status: "ok",
      envCheck,
      db: dbStatus,
      componentCount,
    })
  } catch (error) {
    return NextResponse.json({ status: "error", message: String(error) }, { status: 500 })
  }
}
