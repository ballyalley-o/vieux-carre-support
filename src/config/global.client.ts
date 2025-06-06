import { z } from 'zod'

const _msg = (key: string): string => `unable to read/missing: ${key}`
const envSchema = z.object({
  NEXT_PUBLIC_APP_NAME       : z.string().min(1, _msg('NEXT_PUBLIC_APP_NAME')),
  NEXT_PUBLIC_APP_DESCRIPTION: z.string().min(1, _msg('NEXT_PUBLIC_APP_DESCRIPTION')),
  NEXT_PUBLIC_SERVER_URL     : z.string().min(1, _msg('NEXT_PUBLIC_SERVER_URL'))
})

const _envParsed =  envSchema.safeParse(process.env)

if (!_envParsed.success) {
  console.error('Invalid environment variables: ', _envParsed.error.format())
  throw new Error('Invalid environment configuration')
}

const { NEXT_PUBLIC_APP_NAME, NEXT_PUBLIC_APP_DESCRIPTION, NEXT_PUBLIC_SERVER_URL } = _envParsed.data

export const GLOBAL_CLIENT = {
  APP_NAME         : NEXT_PUBLIC_APP_NAME,
  APP_DESCRIPTION  : NEXT_PUBLIC_APP_DESCRIPTION,
  SERVER_URL       : NEXT_PUBLIC_SERVER_URL
}
