"use client"

import { useEffect, useState } from 'react'
import { GLOBAL } from 'vcs'
import { en } from 'vcs.locale'

export const Footer = () => {
  const [year, setYear] = useState<number | null>(null)

   useEffect(() => {
     setYear(new Date().getFullYear())
   }, [])

  return (
    <footer>
      <div className="p-5 flex-center">
        {year ? `${year} © ${GLOBAL.APP_NAME}. ${en.all_rights_reserved.label}` : ''}
      </div>
    </footer>
  )
}
