'use client'

import { ReactNode } from 'react'
import { useFormStatus } from 'react-dom'
import Link from 'next/link'
import { EllipsisLoader } from 'component/shared/loader'
import { cn } from 'lib/utility'

type ButtonVariantType = 'default' | 'primary' | 'secondary'
type ButtonTypeProps = {
  type   ?: AppButtonType
  label   : ReactNode
  variant : ButtonVariantType
  link   ?: false
}
type LinkButtonTypeProps = {
  label  : ReactNode
  variant: ButtonVariantType
  link   : true
  href   : string
  type  ?: AppButtonType
}

type ButtonProps = ButtonTypeProps | LinkButtonTypeProps

const Button = ({ label, type = 'submit', variant = 'default', link, ...rest }: ButtonProps) => {
  const { pending } = useFormStatus()
  const { href }    = rest as { href: string }

  let _color;
  switch (variant) {
    case 'primary':
      _color = 'bg-vcsblue text-white hover:bg-blue-900/80'
      break
    case 'secondary':
      _color = 'bg-vcsblue-light hover:bg-vcsblue-light/90 text-black'
      break
    default:
      _color = 'bg-vcsblue text-white hover:bg-blue-900'
      break
  }

  if (link) {
    return ( <Link href={href} className={cn('w-full p-3 rounded transition disabled:opacity-50 cursor-pointer hover:shadow-sm shadow-lg', _color)}>
        {pending ? <EllipsisLoader /> : label}
      </Link>)
  }

  return (
    <button className={cn('w-full p-3 rounded transition disabled:opacity-50 cursor-pointer hover:shadow-sm shadow-lg', _color )} type={type} disabled={pending}>
      {pending ? <EllipsisLoader /> : label}
    </button>
  )
}

export default Button