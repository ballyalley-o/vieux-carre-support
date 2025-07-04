import { GLOBAL } from 'vcs'
import { PATH_DIR } from 'vcs.dir'
import { JWTPayload, SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'
import { SystemLogger, transl, formatText } from 'lib/utility'
import { KEY } from 'lib/constant'

const TAG    = 'Auth'
const MODULE = formatText(TAG, 'lowercase')

const { SECRET, TOKEN_NAME, ALG, EXP_TIME, MAX_AGE } = GLOBAL.AUTH

const secret     = new TextEncoder().encode(SECRET)
const cookieName = TOKEN_NAME

export async function signAuthToken(payload: JWTPayload) {
    try {
        const token = await new SignJWT(payload).setProtectedHeader({ alg: ALG }).setIssuedAt().setExpirationTime(EXP_TIME).sign(secret)
        return token
    } catch (error: unknown) {
        const _errorMessage = transl('error.failed_sign_token')
        SystemLogger.sentryLogEvent(_errorMessage, 'auth', { payload }, 'error', error)
        throw new Error(_errorMessage)
    }
}

export async function verifyAuthToken<T>(token: string): Promise<T> {
    try {
        const { payload } = await jwtVerify(token, secret)
        return payload as T
    } catch (error: unknown) {
        const _errorMessage = transl('error.failed_decrypt_token')
        SystemLogger.sentryLogEvent(_errorMessage, MODULE, { tokenSnippet: token.slice(0, 10) }, 'error', error)
        throw new Error(_errorMessage)
    }
}

export async function setAuthCookie(token: string) {
    try {
        const cookieStore = await cookies()
        cookieStore.set(cookieName, token, { httpOnly: true, sameSite: 'lax', secure: GLOBAL.NODE_ENV === KEY.PRODUCTION, path: PATH_DIR.HOME, maxAge: MAX_AGE })
    } catch (error) {
        const _errorMessage = transl('error.failed_set_cookie')
        SystemLogger.sentryLogEvent(_errorMessage, MODULE, { token }, 'error', error)
    }
}

export async function getAuthCookie() {
  const cookieStore = await cookies()
  const token = cookieStore.get(cookieName)
  return token?.value
}

export async function removeAuthCookie() {
    try {
        const cookieStore = await cookies()
        cookieStore.delete(cookieName)
    } catch (error) {
        const _errorMessage = transl('error.failed_remove_cookie')
        SystemLogger.sentryLogEvent(_errorMessage, MODULE, {}, 'error', error)

    }
}