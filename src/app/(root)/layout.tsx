'use client'

import { ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'


export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <div className={'flex h-screen flex-col'} suppressHydrationWarning>
      <AnimatePresence mode="wait">
        <motion.main
          className=""
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}>
          {children}
        </motion.main>
      </AnimatePresence>
    </div>
  )
}
