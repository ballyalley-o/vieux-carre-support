import { ZodError } from 'zod'


export const errorHandler = (error: AppError) => {
  if (error instanceof ZodError) {
    const errors = error.errors.map((err) => err.message)
    return errors.join(', ')
  } else {
    return typeof error.message === 'string' ? error.message : JSON.stringify(error.message)
  }
}