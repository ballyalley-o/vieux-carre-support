'use server'

import { GLOBAL } from 'vcs'
import { prisma } from 'vcs.db'
import argon2 from 'argon2'
import { UserRole } from '@prisma/client'
import { signAuthToken, setAuthCookie, removeAuthCookie } from 'lib/auth'
import { SystemLogger, transl } from 'lib/utility'
import { CODE } from 'lib/constant'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const TAG    = 'Auth.Action'
const MODULE = 'auth'
export async function signUp(prevState: AppResponse, formData: FormData): Promise<AppResponse> {
    try {
        const name     = formData.get('name') as string
        const email    = formData.get('email') as string
        const password = formData.get('password') as string

        const isAdmin = GLOBAL.ADMIN_EMAILS.includes(email)
        const role    = isAdmin ? UserRole.ADMIN : UserRole.USER

        if (!name || !email || !password) {
            const _errorMessage = transl('error.validation_error', { error: 'missing fields' })
            SystemLogger.sentryLogEvent(_errorMessage, MODULE, { name, email, role }, 'warning')
            return SystemLogger.response(false, _errorMessage, CODE.BAD_REQUEST, {})
        }

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

        const user  = await prisma.user.create({ data: { name, email, password: hashedPassword, role }})
        const token = await signAuthToken({ userId: user.id })
        await setAuthCookie(token)
        const _message = transl('success.created_default', { value: 'User signed up', id: user.id })
        SystemLogger.sentryLogEvent(_message, MODULE, { userId: user.id, email }, 'info')
        return SystemLogger.response(true, _message, CODE.CREATED, user)
    } catch (error) {
        const _errorMessage = transl('error.failed_signed_up')
        SystemLogger.sentryLogEvent(_errorMessage, MODULE, {}, 'error', error)
        return SystemLogger.response(false, transl('error.failed_signed_up_user'), CODE.BAD_REQUEST, {})
    }
}

export async function signOut(): Promise<AppResponse> {
    try {
        await removeAuthCookie()
        const _message = transl('success.user_signed_out')
        SystemLogger.sentryLogEvent(_message, MODULE, {}, 'info')
        return SystemLogger.response(true, _message, CODE.OK, {})
    } catch (error) {
        const _errorMessage = transl('error.failed_sign_out')
        SystemLogger.sentryLogEvent(_errorMessage, MODULE, {}, 'error', error)
        return SystemLogger.response(false, _errorMessage, CODE.BAD_REQUEST, {})
    }
}

export async function signIn(prevState: AppResponse, formData: FormData): Promise<AppResponse> {
    try {
        const email    = formData.get('email') as string
        const password = formData.get('password') as string

        if (!email || !password) {
            const _errorMessage = transl('error.validation_error', { error: 'missing sign-in fields' })
            SystemLogger.sentryLogEvent(_errorMessage, MODULE, { email }, 'warning')
            return SystemLogger.response(false, _errorMessage, CODE.BAD_REQUEST, {})
        }

        const user = await prisma.user.findUnique({ where: { email }})

        if (!user || !user.password) {
            const _errorMessage = transl('error.failed_sign_in', { email })
            SystemLogger.sentryLogEvent(_errorMessage, MODULE, { email }, 'warning')
            return SystemLogger.response(false, transl('error.invalid_credentials'), CODE.NOT_FOUND, {})
        }

        const isMatch = await argon2.verify(user.password, password)

        if (!isMatch) {
            const _errorMessage = transl('error.incorrect_password')
            SystemLogger.sentryLogEvent(_errorMessage, MODULE, { email }, 'warning')
            return SystemLogger.response(false, transl('error.invalid_credentials'), CODE.NOT_FOUND, {})
        }

        const token = await signAuthToken({ userId: user.id })
        await setAuthCookie(token)

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password: _, ...safeUser } = user
        return SystemLogger.response(true, transl('success.signed_in'), CODE.OK, safeUser)
    } catch (error) {
        const _errorMessage = transl('error.unexpected_error')
        SystemLogger.sentryLogEvent(_errorMessage, MODULE, {}, 'error', error)
        return SystemLogger.response(false, _errorMessage, CODE.BAD_REQUEST, {})
    }
}