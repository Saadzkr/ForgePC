import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

function createPrismaClient(): PrismaClient {
  const url = process.env.DATABASE_URL

  return new PrismaClient({
    datasourceUrl: url,
    log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
  })
}

let prisma: PrismaClient

try {
  prisma = globalForPrisma.prisma ?? createPrismaClient()
  if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
} catch {
  // If Prisma fails (e.g., missing DATABASE_URL), create a dummy client
  // Routes that actually query the DB will throw meaningful errors
  prisma = {} as PrismaClient
}

export default prisma
