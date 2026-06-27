import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const shareToken = searchParams.get("shareToken")

    if (!shareToken) {
      return NextResponse.json(
        { error: "shareToken query parameter is required" },
        { status: 400 }
      )
    }

    const build = await prisma.build.findUnique({
      where: { shareToken },
    })

    if (!build || !build.isPublic) {
      return NextResponse.json(
        { error: "Build not found or not public" },
        { status: 404 }
      )
    }

    return NextResponse.json({
      ...build,
      components: JSON.parse(build.components || "{}"),
      estimatedFps: build.estimatedFps ? JSON.parse(build.estimatedFps) : null,
      compatibility: build.compatibility ? JSON.parse(build.compatibility) : null,
    })
  } catch (error) {
    console.error("Get shared build error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}