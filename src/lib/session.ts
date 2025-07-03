import { verifyAuthToken, getAuthCookie } from "lib/auth"
import { prisma } from 'vcs.db'
import { transl } from "lib/utility"

type AuthPayload = {
    userId: string
}

export async function getSession() {
    try {
        const token = await getAuthCookie()
        if (!token) return null

        const payload = await verifyAuthToken<AuthPayload>(token)

        console.log('payload: ', payload)

        if (!payload?.userId) return null
        const user = await prisma.user.findUnique({ where: { id: payload.userId }, select: { id: true, email: true, name: true, role: true } })

        console.log('user: ', user)
        return user
    } catch (error) {
        console.error(transl('error.failed_fetch_default', { value: 'User' }), error)
        return null
    }
}