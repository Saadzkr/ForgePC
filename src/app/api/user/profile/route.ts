import { NextResponse } from "next/server"
import { z } from "zod"
import prisma from "@/lib/prisma"
import { getCurrentUser } from "@/lib/auth"

const updateProfileSchema = z.object({
  name: z.string().min(1).max(100).optional(),
  image: z.string().url().max(500).optional(),
})

export async function GET() {
  try {
    const user = await getCurrentUser()
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const profile = await prisma.user.findUnique({
      where: { id: user.id },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        role: true,
        createdAt: true,
        builds: {
          orderBy: { createdAt: "desc" },
          take: 10,
        },
        stats: true,
        badges: {
          include: { badge: true },
          orderBy: { earnedAt: "desc" },
        },
      },
    })

    if (!profile) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    return NextResponse.json({
      ...profile,
      builds: profile.builds.map((b) => ({
        ...b,
        components: JSON.parse(b.components || "{}"),
        estimatedFps: b.estimatedFps ? JSON.parse(b.estimatedFps) : null,
        compatibility: b.compatibility ? JSON.parse(b.compatibility) : null,
      })),
    })
  } catch (error) {
    console.error("Get profile error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

export async function PATCH(request: Request) {
  try {
    const user = await getCurrentUser()
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const parsed = updateProfileSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.flatten().fieldErrors },
        { status: 400 }
      )
    }

    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: parsed.data,
      select: { id: true, name: true, email: true, image: true, role: true },
    })

    return NextResponse.json({ user: updatedUser })
  } catch (error) {
    console.error("Update profile error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}