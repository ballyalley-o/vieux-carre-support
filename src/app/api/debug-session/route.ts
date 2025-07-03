import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const cookieHeader = request.headers.get('cookie') || ''
  return NextResponse.json({ cookies: cookieHeader })
}
