'use server'

import { GLOBAL } from 'vcs'
import { prisma } from 'vcs.db'
import bcrypt from 'bcryptjs'
import { signIn, signOut } from 'vieux-carre.authenticate'
import { SystemLogger, transl } from 'lib/utility'
import { CODE } from 'lib/constant'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const TAG    = 'Auth.Action'
const MODULE = 'auth'
export async function signUp(data: SignUp): Promise<AppResponse> {
    try {
        const { name, email, password } = data

        const isAdmin = GLOBAL.ADMIN_EMAILS.includes(email)
        const role    = isAdmin ? 'admin' : 'user'

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

        const hashedPassword = await bcrypt.hash(password, GLOBAL.HASH.SALT_ROUNDS)

        const user  = await prisma.user.create({ data: { name, email, password: hashedPassword, role }})

        await signIn('credentials', { email, password, redirect: false })
        const _message = transl('success.created_default', { value: 'User signed up', id: user.id })
        SystemLogger.sentryLogEvent(_message, MODULE, { userId: user.id, email }, 'info')
        return SystemLogger.response(true, _message, CODE.CREATED, user)
    } catch (error) {
        const _errorMessage = transl('error.failed_signed_up')
        SystemLogger.sentryLogEvent(_errorMessage, MODULE, {}, 'error', error)
        return SystemLogger.response(false, transl('error.failed_signed_up_user'), CODE.BAD_REQUEST, {})
    }
}

export async function signOutUser() {
    await signOut()
}

export async function signInWithCredentials(data: SignIn)  {
    try {
        const { email, password } = data

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

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            const _errorMessage = transl('error.incorrect_password')
            SystemLogger.sentryLogEvent(_errorMessage, MODULE, { email }, 'warning')
            return SystemLogger.response(false, transl('error.invalid_credentials'), CODE.NOT_FOUND, {})
        }

        // const token = await signAuthToken({ userId: user.id })
        // await setAuthCookie(token)

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password: _, ...safeUser } = user
        await signIn('credentials', { email, password, redirect: false })
        return SystemLogger.response(true, transl('success.signed_in'), CODE.OK, safeUser)
    } catch (error) {
        console.log("error", error)
        const _errorMessage = transl('error.unexpected_error')
        SystemLogger.sentryLogEvent(_errorMessage, MODULE, {}, 'error', error)
        return SystemLogger.response(false, _errorMessage, CODE.BAD_REQUEST, {})
    }
}