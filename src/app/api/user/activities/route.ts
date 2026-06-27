import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { getCurrentUser } from "@/lib/auth"

export async function GET() {
  try {
    const user = await getCurrentUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const activities = await prisma.activity.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
      take: 50,
    })

    return NextResponse.json(activities)
  } catch (error) {
    console.error("Get activities error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
