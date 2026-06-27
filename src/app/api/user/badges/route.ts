import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { getCurrentUser } from "@/lib/auth"

export async function GET() {
  try {
    const user = await getCurrentUser()
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const badges = await prisma.userBadge.findMany({
      where: { userId: user.id },
      include: { badge: true },
      orderBy: { earnedAt: "desc" },
    })

    const parsed = badges.map((ub) => ({
      ...ub,
      badge: {
        ...ub.badge,
        condition: JSON.parse(ub.badge.condition || "{}"),
      },
    }))

    return NextResponse.json(parsed)
  } catch (error) {
    console.error("Get badges error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}