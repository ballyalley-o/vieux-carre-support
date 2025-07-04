import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { verifyAuthToken } from 'lib/auth'

type AuthPayload = {
  userId: string
}


export async function middleware(request: NextRequest) {
  const protectedPaths  = [/\/ticket\/(.*)/]
  const pathname        = request.nextUrl.pathname
  const isProtected     = protectedPaths.some((p) => p.test(pathname))
  const cookiesObject   = request.cookies
  const sessionCookie   = cookiesObject.get(process.env.NODE_ENV === 'production' ? '__Secure-next-auth.session-token' : 'next-auth.session-token')

  let isAuthenticated = false

  if (sessionCookie?.value) {
    try {
      const payload = await verifyAuthToken<AuthPayload>(sessionCookie.value)
      isAuthenticated = !!payload?.userId
    } catch (err) {
      console.error('JWT verification failed in middleware:', err)
    }
  }

  if (isProtected && !isAuthenticated) {
    const signInUrl = new URL(`${process.env.NEXT_PUBLIC_SERVER_URL_MAIN}/sign-in`, request.url)
    const existingCallback = request.nextUrl.searchParams.get('callbackUrl')
    signInUrl.searchParams.set('callbackUrl', existingCallback ?? request.nextUrl.href)
    return NextResponse.redirect(signInUrl)
  }

  if (!cookiesObject.get('sessionBagId')) {
    const sessionBagId      = crypto.randomUUID()
    const newRequestHeaders = new Headers(request.headers)
    const response          = NextResponse.next({ request: { headers: newRequestHeaders } })
    response.cookies.set('sessionBagId', sessionBagId)
    return response
  }

  return NextResponse.next()
}
