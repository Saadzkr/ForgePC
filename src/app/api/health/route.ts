import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET() {
  try {
    const urlExists = !!process.env.DATABASE_URL
    const urlPrefix = process.env.DATABASE_URL?.substring(0, 25) || "NOT SET"
    
    const count = await prisma.component.count()
    
    return NextResponse.json({
      status: "ok",
      db: "connected",
      componentCount: count,
      DATABASE_URL_exists: urlExists,
      DATABASE_URL_prefix: urlPrefix + "...",
    })
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)
    return NextResponse.json({ status: "error", message }, { status: 500 })
  }
}
