'use server'

import { prisma } from 'vcs.db'
import argon2 from 'argon2'
import { SystemLogger, transl } from 'lib/utility'
import { signAuthToken, setAuthCookie } from 'lib/auth'
import { CODE } from 'lib/constant'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const TAG    = 'Auth.Action'
const MODULE = 'auth'
export async function signUp(prevState: AppResponse, formData: FormData): Promise<AppResponse> {
    try {
        const name     = formData.get('name') as string
        const email    = formData.get('email') as string
        const password = formData.get('password') as string

        if (!name || !email || !password) {
            const _errorMessage = transl('error.validation_error', { error: 'missing fields' })
            SystemLogger.sentryLogEvent(_errorMessage, MODULE, { name, email }, 'warning')
            return SystemLogger.response(false, _errorMessage, CODE.BAD_REQUEST, {})
        }

        // check user exists
        const existingUser = await prisma.user.findUnique({ where: { email }})
        if (existingUser) {
            const _errorMessage = transl('error.exists_default', { document: email })
            SystemLogger.sentryLogEvent(_errorMessage, MODULE, { email }, 'warning')
            return SystemLogger.response(false, _errorMessage, CODE.CONFLICT, {})
        }

        const { MEMORY_COST, TIME_COST, PARALLELISM } = GLOBAL.HASH

        const hashedPassword = await argon2.hash(password, {
          type       : argon2.argon2id,
          memoryCost : parseInt(MEMORY_COST, 10),
          timeCost   : parseInt(TIME_COST, 10),
          parallelism: parseInt(PARALLELISM, 10)
        })

        const user  = await prisma.user.create({ data: { name, email, password: hashedPassword }})
        const token = await signAuthToken({ userId: user.id })
        await setAuthCookie(token)
        const _message = transl('success.created_default', { value: 'User signed up', id: user.id })
        SystemLogger.sentryLogEvent(_message, MODULE, { userId: user.id, email }, 'info')
        return SystemLogger.response(true, _message, CODE.CREATED, user)
    } catch (error) {
        const _errorMessage = transl('error.failed_signed_up')
        SystemLogger.sentryLogEvent(_errorMessage, MODULE, {}, 'error', error)
        return SystemLogger.response(false, _errorMessage, CODE.BAD_REQUEST, {})
    }
}