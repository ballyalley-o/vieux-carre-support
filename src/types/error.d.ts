import { ZodError } from "zod"
import { Prisma } from '@prisma/client'

declare global {
    export type AppError =
      | ZodError
      | Prisma.PrismaClientKnownRequestError
      | Prisma.PrismaClientUnknownRequestError
      | Prisma.PrismaClientRustPanicError
      | Prisma.PrismaClientInitializationError
      | Prisma.PrismaClientValidationError


}