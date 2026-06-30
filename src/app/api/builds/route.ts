import { NextResponse } from "next/server"
import { z } from "zod"
import prisma from "@/lib/prisma"
import { getCurrentUser } from "@/lib/auth"

const createBuildSchema = z.object({
  name: z.string().min(1).max(255),
  description: z.string().max(2000).optional(),
  components: z.any().optional(),
  totalPrice: z.number().min(0).optional(),
  totalWattage: z.number().min(0).optional(),
  estimatedFps: z.any().optional(),
  compatibility: z.any().optional(),
  isPublic: z.boolean().optional(),
})

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const isPublicFeed = searchParams.get("public") === "true"

    if (isPublicFeed) {
      const builds = await prisma.build.findMany({
        where: { isPublic: true },
        orderBy: { createdAt: "desc" },
        include: { user: { select: { name: true } } },
      })
      const parsed = builds.map((b) => ({
        id: b.id,
        name: b.name,
        totalPrice: b.totalPrice,
        totalWattage: b.totalWattage,
        estimatedFps: b.estimatedFps ? JSON.parse(b.estimatedFps) : null,
        createdAt: b.createdAt,
        user: b.user,
      }))
      return NextResponse.json(parsed)
    }

    const user = await getCurrentUser()
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const builds = await prisma.build.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
    })

    const parsed = builds.map((b) => ({
      ...b,
      components: JSON.parse(b.components || "{}"),
      estimatedFps: b.estimatedFps ? JSON.parse(b.estimatedFps) : null,
      compatibility: b.compatibility ? JSON.parse(b.compatibility) : null,
    }))

    return NextResponse.json(parsed)
  } catch (error) {
    console.error("Get builds error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const user = await getCurrentUser()
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const parsed = createBuildSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.flatten().fieldErrors },
        { status: 400 }
      )
    }

    const { name, description, components, totalPrice, totalWattage, estimatedFps, compatibility, isPublic } = parsed.data

    const build = await prisma.build.create({
      data: {
        name,
        description,
        components: JSON.stringify(components ?? {}),
        totalPrice: totalPrice ?? 0,
        totalWattage: totalWattage ?? 0,
        estimatedFps: estimatedFps ? JSON.stringify(estimatedFps) : undefined,
        compatibility: compatibility ? JSON.stringify(compatibility) : undefined,
        isPublic: isPublic ?? false,
        userId: user.id,
      },
    })

    await prisma.userStats.upsert({
      where: { userId: user.id },
      update: { buildsCreated: { increment: 1 } },
      create: { userId: user.id, buildsCreated: 1 },
    })

    await prisma.activity.create({
      data: {
        userId: user.id,
        type: "BUILD_CREATED",
        title: "Build Created",
        message: `Created build "${name}"`,
        metadata: JSON.stringify({ buildId: build.id }),
      },
    })

    return NextResponse.json({
      ...build,
      components: JSON.parse(build.components || "{}"),
    }, { status: 201 })
  } catch (error) {
    console.error("Create build error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}