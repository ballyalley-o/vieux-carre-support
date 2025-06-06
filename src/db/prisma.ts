import { GLOBAL } from 'vcs'
import { PrismaClient } from 'generated/prisma'
import { KEY } from 'lib/constant'


const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient()

if (GLOBAL.NODE_ENV !== KEY.PRODUCTION)
globalForPrisma.prisma = prisma