import { NextResponse } from "next/server"
import { z } from "zod"
import prisma from "@/lib/prisma"
import { getCurrentUser } from "@/lib/auth"

const updateBuildSchema = z.object({
  name: z.string().min(1).max(255).optional(),
  description: z.string().max(2000).optional(),
  components: z.any().optional(),
  totalPrice: z.number().min(0).optional(),
  totalWattage: z.number().min(0).optional(),
  estimatedFps: z.any().optional(),
  compatibility: z.any().optional(),
  isPublic: z.boolean().optional(),
})

function parseBuild(build: { components: string; estimatedFps: string | null; compatibility: string | null; [key: string]: unknown }) {
  return {
    ...build,
    components: JSON.parse(build.components || "{}"),
    estimatedFps: build.estimatedFps ? JSON.parse(build.estimatedFps) : null,
    compatibility: build.compatibility ? JSON.parse(build.compatibility) : null,
  }
}

async function getBuildOrThrow(id: string, userId: string) {
  const build = await prisma.build.findUnique({ where: { id } })
  if (!build) throw new Error("NOT_FOUND")
  if (build.userId !== userId) throw new Error("FORBIDDEN")
  return build
}

export async function GET(
  _request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const user = await getCurrentUser()
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
    const build = await getBuildOrThrow(params.id, user.id)
    return NextResponse.json(parseBuild(build))
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === "NOT_FOUND") return NextResponse.json({ error: "Build not found" }, { status: 404 })
      if (error.message === "FORBIDDEN") return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }
    console.error("Get build error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const user = await getCurrentUser()
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
    await getBuildOrThrow(params.id, user.id)

    const body = await request.json()
    const parsed = updateBuildSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.flatten().fieldErrors },
        { status: 400 }
      )
    }

    const data = parsed.data
    const updateData: Record<string, unknown> = {}
    if (data.name !== undefined) updateData.name = data.name
    if (data.description !== undefined) updateData.description = data.description
    if (data.components !== undefined) updateData.components = JSON.stringify(data.components)
    if (data.totalPrice !== undefined) updateData.totalPrice = data.totalPrice
    if (data.totalWattage !== undefined) updateData.totalWattage = data.totalWattage
    if (data.estimatedFps !== undefined) updateData.estimatedFps = data.estimatedFps ? JSON.stringify(data.estimatedFps) : null
    if (data.compatibility !== undefined) updateData.compatibility = data.compatibility ? JSON.stringify(data.compatibility) : null
    if (data.isPublic !== undefined) updateData.isPublic = data.isPublic

    const build = await prisma.build.update({
      where: { id: params.id },
      data: updateData,
    })

    await prisma.activity.create({
      data: {
        userId: user.id,
        type: "BUILD_UPDATED",
        title: "Build Updated",
        message: `Updated build "${build.name}"`,
        metadata: JSON.stringify({ buildId: build.id }),
      },
    })

    return NextResponse.json(parseBuild(build))
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === "NOT_FOUND") return NextResponse.json({ error: "Build not found" }, { status: 404 })
      if (error.message === "FORBIDDEN") return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }
    console.error("Update build error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const user = await getCurrentUser()
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
    const build = await getBuildOrThrow(params.id, user.id)
    await prisma.build.delete({ where: { id: params.id } })

    await prisma.userStats.upsert({
      where: { userId: user.id },
      update: { buildsCreated: { decrement: 1 } },
      create: { userId: user.id },
    })

    return NextResponse.json({ message: "Build deleted", build: parseBuild(build) })
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === "NOT_FOUND") return NextResponse.json({ error: "Build not found" }, { status: 404 })
      if (error.message === "FORBIDDEN") return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }
    console.error("Delete build error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}