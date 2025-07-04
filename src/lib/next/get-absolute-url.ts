import { headers } from 'next/headers'

export async function getAbsoluteUrl(pathname?: string) {
  const headersList = await headers()
  const protocol    = headersList.get('x-forwarded-proto') || 'https'
  const host        = headersList.get('host') || ''
  const path        = pathname || headersList.get('x-nextjs-url') || '/'
  return `${protocol}://${host}${path}`
}
