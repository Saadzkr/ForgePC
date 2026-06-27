import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { getCurrentUser } from "@/lib/auth"

export async function GET() {
  try {
    const user = await getCurrentUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const stats = await prisma.userStats.findUnique({
      where: { userId: user.id },
    })

    if (!stats) {
      return NextResponse.json({ error: "Stats not found" }, { status: 404 })
    }

    return NextResponse.json(stats)
  } catch (error) {
    console.error("Get stats error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
