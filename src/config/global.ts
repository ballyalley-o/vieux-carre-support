import { z } from 'zod'

const _msg = (key: string): string => `unable to read/missing: ${key}`

const envSchema = z.object({
  NEXT_PUBLIC_APP_NAME       : z.string().min(1, _msg('NEXT_PUBLIC_APP_NAME')),
  NEXT_PUBLIC_APP_DESCRIPTION: z.string().min(1, _msg('NEXT_PUBLIC_APP_DESCRIPTION')),
  NEXT_PUBLIC_SERVER_URL     : z.string().min(1, _msg('NEXT_PUBLIC_SERVER_URL')),
  NODE_ENV                   : z.string().min(1, _msg('NODE_ENV')),
  DB_URI                     : z.string().min(1, _msg('DB_URI')),
  DB_PROTOCOL                : z.string().min(1, _msg('DB_PROTOCOL')),
  DB_HOST                    : z.string().min(1, _msg('DB_HOST')),
  DB_NAME                    : z.string().min(1, _msg('DB_NAME')),
  DB_USER                    : z.string().min(1, _msg('DB_USER')),
  DB_PASSWORD                : z.string().min(1, _msg('DB_PASSWORD')),
  SENTRY_AUTH_TOKEN          : z.string().min(1, _msg('SENTRY_AUTH_TOKEN'))
})

let parsedEnv: z.infer<typeof envSchema> | null = null

function getEnv() {
  if (parsedEnv) return parsedEnv

  const _envParsed = envSchema.safeParse(process.env)
  if (!_envParsed.success) {
    if (typeof window === 'undefined') {
      console.error('Invalid environment variables: ', _envParsed.error.format())
      throw new Error('Invalid environment configuration')
    }
    return {
      NEXT_PUBLIC_APP_NAME       : '',
      NEXT_PUBLIC_APP_DESCRIPTION: '',
      NEXT_PUBLIC_SERVER_URL     : '',
      NODE_ENV                   : '',
      DB_URI                     : '',
      DB_PROTOCOL                : '',
      DB_HOST                    : '',
      DB_NAME                    : '',
      DB_USER                    : '',
      DB_PASSWORD                : '',
      SENTRY_AUTH_TOKEN          : ''
    }
  }

  parsedEnv = _envParsed.data
  return parsedEnv
}

export const GLOBAL = {
  get APP_NAME() {
    return getEnv().NEXT_PUBLIC_APP_NAME
  },
  get APP_DESCRIPTION() {
    return getEnv().NEXT_PUBLIC_APP_DESCRIPTION
  },
  get SERVER_URL() {
    return getEnv().NEXT_PUBLIC_SERVER_URL
  },
  get NODE_ENV() {
    return getEnv().NODE_ENV
  },
  get SENTRY_AUTH_TOKEN() {
    return getEnv().SENTRY_AUTH_TOKEN
  },
  get DB() {
    const env = getEnv()
    return {
      URI: `${env.DB_PROTOCOL}://${env.DB_USER}:${env.DB_PASSWORD}@${env.DB_HOST}/${env.DB_NAME}?sslmode=require`
    }
  },
  LIMIT: {
    PAGE_SIZE: 7
  },
  TICKET: {
    PREFIX  : 'TKT',
    PAD_ID: 8
  }
}
