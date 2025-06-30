import { auth } from 'vieux-carre.authenticate'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const protectedPaths  = [/\/ticket\/(.*)/]
  const pathname        = request.nextUrl.pathname
  const isProtected     = protectedPaths.some((p) => p.test(pathname))
  const session         = await auth()
  const cookiesObject   = request.cookies
  const isAuthenticated = !!session?.user

  if (isProtected && !isAuthenticated) {
    const signInUrl = new URL('/sign-in', request.url)
    signInUrl.searchParams.set('callbackUrl', request.url)
    return NextResponse.redirect(signInUrl)
  }

  if (!cookiesObject.get('sessionBagId')) {
    const sessionBagId = crypto.randomUUID()
    const newRequestHeaders = new Headers(request.headers)
    const response = NextResponse.next({ request: { headers: newRequestHeaders } })
    response.cookies.set('sessionBagId', sessionBagId)
    return response
  }

  return NextResponse.next()
}
