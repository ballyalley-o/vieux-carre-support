import { z } from 'zod'

const _msg = (key: string): string => `unable to read/missing: ${key}`

/**
* To add a new environment variable:
 * 1. Add a new entry to the `envSchema` with validation using `z.string().min(1, _msg('KEY_NAME'))`.
 *    For example:
 *      NEW_VAR: z.string().min(1, _msg('NEW_VAR'))
 *
 * 2. Add a default fallback value in the `getEnv` function if needed, inside the `return { ... }` block
 *    (for client environments where process.env may be unavailable).
 *
 * 3. If the variable is needed in the exported `GLOBAL` object, add a corresponding getter.
 *    For example:
 *      get NEW_VAR() {
 *        return getEnv().NEW_VAR
 *      }
 *
 * This ensures that all environment variables are validated, safely accessed, and consistently documented.
 */
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
  SENTRY_AUTH_TOKEN          : z.string().min(1, _msg('SENTRY_AUTH_TOKEN')),
  AUTH_SECRET                : z.string().min(1, _msg('AUTH_SECRET')),
  AUTH_TOKEN_NAME            : z.string().min(1, _msg('AUTH_TOKEN_NAME')),
  AUTH_ALG                   : z.string().min(1, _msg('AUTH_ALG')),
  AUTH_EXP_TIME              : z.string().min(1, _msg('AUTH_EXP_TIME'))
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
      SENTRY_AUTH_TOKEN          : '',
      AUTH_SECRET                : '',
      AUTH_TOKEN_NAME            : '',
      AUTH_ALG                   : '',
      AUTH_EXP_TIME              : ''
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
  get AUTH() {
    return {
      SECRET    : getEnv().AUTH_SECRET,
      TOKEN_NAME: getEnv().AUTH_TOKEN_NAME,
      ALG       : getEnv().AUTH_ALG,
      EXP_TIME  : getEnv().AUTH_EXP_TIME,
      MAX_AGE   : 60 * 60 * 24
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
