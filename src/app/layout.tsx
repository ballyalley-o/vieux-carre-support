import { GLOBAL } from 'vcs'
import type { Metadata } from "next"
import { Inter_Tight } from 'next/font/google'
import { Toaster } from 'sonner'

import 'vcs.design-css'
import 'vcs.design-gen-css'

const interTight = Inter_Tight({
  subsets : ['latin'],
  variable: '--font-inter-tight'
})

export const metadata: Metadata = {
  title: {
    template: `%s • ${GLOBAL.APP_NAME}`,
    default : GLOBAL.APP_NAME,
  },
  description : GLOBAL.APP_DESCRIPTION,
  metadataBase: new URL(GLOBAL.SERVER_URL),
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={'dark'} suppressHydrationWarning>
      <body className={`${interTight.className} antialiased`}>
        {children}
        <Toaster position={'top-right'} className={'rounded-none'} richColors />
      </body>
    </html>
  )
}
