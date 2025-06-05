import { z } from 'zod'

const _msg = (key: string): string => `unable to read/missing: ${key}`
const envSchema = z.object({
  NEXT_PUBLIC_APP_NAME       : z.string().min(1, _msg('NEXT_PUBLIC_APP_NAME')),
  NEXT_PUBLIC_APP_DESCRIPTION: z.string().min(1, _msg('NEXT_PUBLIC_APP_DESCRIPTION')),
  NEXT_PUBLIC_SERVER_URL     : z.string().min(1, _msg('NEXT_PUBLIC_SERVER_URL')),
  DB_URI                     : z.string().min(1, _msg('DB_URI')),
  DB_PROTOCOL                : z.string().min(1, _msg('DB_PROTOCOL')),
  DB_HOST                    : z.string().min(1, _msg('DB_HOST')),
  DB_NAME                    : z.string().min(1, _msg('DB_NAME')),
  DB_USER                    : z.string().min(1, _msg('DB_USER')),
  DB_PASSWORD                : z.string().min(1, _msg('DB_PASSWORD')),
  SENTRY_AUTH_TOKEN          : z.string().min(1, _msg('SENTRY_AUTH_TOKEN')),
  NODE_ENV                   : z.string().min(1, _msg('NODE_ENV'))
})

const _envParsed =  envSchema.safeParse(process.env)

if (!_envParsed.success) {
  console.error('Invalid environment variables: ', _envParsed.error.format())
  throw new Error('Invalid environment configuration')
}

const { NEXT_PUBLIC_APP_NAME, NEXT_PUBLIC_APP_DESCRIPTION, NEXT_PUBLIC_SERVER_URL, NODE_ENV, DB_PROTOCOL, DB_HOST, DB_NAME, DB_USER, DB_PASSWORD, SENTRY_AUTH_TOKEN } = _envParsed.data

export const GLOBAL = {
  APP_NAME       : NEXT_PUBLIC_APP_NAME,
  APP_DESCRIPTION: NEXT_PUBLIC_APP_DESCRIPTION,
  SERVER_URL     : NEXT_PUBLIC_SERVER_URL,
  DB             : {
    URI: `${DB_PROTOCOL}://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}?sslmode=require` || '',
  },
  NODE_ENV,
  SENTRY_AUTH_TOKEN,
}