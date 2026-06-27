import { NextResponse } from "next/server"
import { hash } from "bcryptjs"
import { z } from "zod"
import prisma from "@/lib/prisma"

const registerSchema = z.object({
  name: z.string().min(1).max(100).optional(),
  email: z.string().email().max(255),
  password: z.string().min(8).max(128),
})

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const parsed = registerSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.flatten().fieldErrors },
        { status: 400 }
      )
    }

    const { name, email, password } = parsed.data

    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      return NextResponse.json(
        { error: "A user with this email already exists" },
        { status: 409 }
      )
    }

    const hashedPassword = await hash(password, 10)

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        role: true,
        createdAt: true,
      },
    })

    await prisma.userStats.create({
      data: { userId: user.id },
    })

    return NextResponse.json({ user }, { status: 201 })
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
