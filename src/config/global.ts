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
  AUTH_EXP_TIME              : z.string().min(1, _msg('AUTH_EXP_TIME')),
  HASH_TYPE                  : z.string().min(1, _msg('HASH_TYPE')),
  HASH_MEMORY_COST           : z.string().min(1, _msg('HASH_MEMORY_COST')),
  HASH_TIME_COST             : z.string().min(1, _msg('HASH_TIME_COST')),
  HASH_PARALLELISM           : z.string().min(1, _msg('HASH_PARALLELISM')),
  ADMIN_EMAILS               : z.string().min(1, _msg('ADMIN_EMAILS')),
  VERCEL_URL                 : z.string().min(1, _msg('VERCEL_URL')),
  ENCRYPTION_KEY             : z.string().min(1, _msg('ENCRYPTION_KEY')),
  GOOGLE_CLIENT_ID           : z.string().min(1, _msg('GOOGLE_CLIENT_ID')),
  GOOGLE_CLIENT_SECRET       : z.string().min(1, _msg('GOOGLE_CLIENT_SECRET')),
  SALT_ROUNDS                : z.string().min(1, _msg('SALT_ROUNDS')),
  NEXTAUTH_STRATEGY          : z.string().min(1, _msg('NEXTAUTH_STRATEGY')),
  NEXT_PUBLIC_APP_NAME_MAIN  : z.string().min(1, _msg('NEXT_PUBLIC_APP_NAME_MAIN')),
  NEXT_PUBLIC_SERVER_URL_MAIN: z.string().min(1, _msg('NEXT_PUBLIC_SERVER_URL_MAIN'))
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
      AUTH_TOKEN_NAME            : 'next-auth.session-token',
      AUTH_ALG                   : '',
      AUTH_EXP_TIME              : '',
      HASH_TYPE                  : 'argon2id',
      HASH_MEMORY_COST           : '19456',
      HASH_TIME_COST             : '2',
      HASH_PARALLELISM           : '1',
      ADMIN_EMAILS               : '',
      VERCEL_URL                 : '',
      ENCRYPTION_KEY             : '',
      GOOGLE_CLIENT_ID           : '',
      GOOGLE_CLIENT_SECRET       : '',
      SALT_ROUNDS                : 10,
      NEXTAUTH_STRATEGY          : 'jwt',
      NEXT_PUBLIC_APP_NAME_MAIN  : '',
      NEXT_PUBLIC_SERVER_URL_MAIN: ''
    }
  }

  parsedEnv = _envParsed.data
  return parsedEnv
}

export const GLOBAL = {
  get APP_NAME() {
    return getEnv().NEXT_PUBLIC_APP_NAME
  },
  get APP_NAME_MAIN() {
    return getEnv().NEXT_PUBLIC_APP_NAME_MAIN
  },
  get APP_DESCRIPTION() {
    return getEnv().NEXT_PUBLIC_APP_DESCRIPTION
  },
  get ENCRYPTION_KEY() {
    return getEnv().ENCRYPTION_KEY
  },
  get SERVER_URL() {
    return getEnv().NEXT_PUBLIC_SERVER_URL
  },
  get SERVER_URL_MAIN() {
    return getEnv().NEXT_PUBLIC_SERVER_URL_MAIN
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
  get GOOGLE() {
    return {
      CLIENT_ID    : getEnv().GOOGLE_CLIENT_ID,
      CLIENT_SECRET: getEnv().GOOGLE_CLIENT_SECRET
    }
  },
  get HASH() {
    return {
      TYPE       : getEnv().HASH_TYPE,
      MEMORY_COST: getEnv().HASH_MEMORY_COST,
      TIME_COST  : getEnv().HASH_TIME_COST,
      PARALLELISM: getEnv().HASH_PARALLELISM,
      SALT_ROUNDS: Number(getEnv().SALT_ROUNDS)
    }
  },
  get ADMIN_EMAILS() {
    return getEnv().ADMIN_EMAILS.split(';')
  },
  get VERCEL_URL() {
    return getEnv().VERCEL_URL
  },
  get NEXTAUTH_STRATEGY() {
    return getEnv().NEXTAUTH_STRATEGY
  },
  LIMIT: {
    PAGE_SIZE: 7
  },
  TICKET: {
    PREFIX: 'TKT',
    PAD_ID: 8
  }
}
