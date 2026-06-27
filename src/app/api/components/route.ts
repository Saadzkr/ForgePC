import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category")

    const where = category ? { category } : {}

    const components = await prisma.component.findMany({
      where,
      orderBy: [{ brand: "asc" }, { price: "asc" }],
    })

    const parsed = components.map((c) => ({
      ...c,
      specs: JSON.parse(c.specs || "{}"),
    }))

    return NextResponse.json(parsed)
  } catch (error) {
    console.error("Get components error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}