import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET() {
  try {
    await prisma.$queryRaw`SELECT 1`
    const count = await prisma.component.count()
    return NextResponse.json({ status: "ok", db: "connected", componentCount: count })
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)
    return NextResponse.json({ status: "error", message }, { status: 500 })
  }
}
