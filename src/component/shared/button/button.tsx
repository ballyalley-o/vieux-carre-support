'use client'

import Link from 'next/link'
import { EllipsisLoader } from 'component/shared/loader'
import { cn } from 'lib/utility'
import type { ButtonProps } from './button.types'

const Button = ({ label, type = 'submit', variant = 'default', link, fullWidth, disabled, className, onClick, loadingLabel, loading, ...rest }: ButtonProps) => {
  const { href }    = rest as { href: string }

  let _color;
  switch (variant) {
    case 'primary':
      _color = 'bg-vcsblue text-white hover:bg-blue-900/80'
      break
    case 'secondary':
      _color = 'bg-vcsblue-light hover:bg-vcsblue-light/90 text-black'
      break
    case 'outline':
      _color = 'bg-transparent hover:bg-vcsblue-light/10 border border-vcsblue hover:border-vcsblue-light'
      break
    case 'transparent':
      _color = 'bg-transparent hover:bg-vcsblue-light/10 shadow-none hover:shadow-none disable:text-gray-400'
      break
    case 'desctructive':
      _color = 'bg-vcsred hover:bg-vcsred-dark shadow-none hover:shadow-none'
      break
    default:
      _color = 'bg-vcsblue text-white hover:bg-blue-900'
      break
  }

  if (link) {
    return (
      <Link href={href} className={cn('p-3 rounded transition disabled:opacity-50 cursor-pointer hover:shadow-sm shadow-lg shadow-vcsblue-light text-sm h-12', _color, className, fullWidth && 'w-full', )}>
        {loading ? <EllipsisLoader label={loadingLabel} /> : label}
      </Link>)
  }

  return (
    <button className={cn('p-3 rounded transition disabled:opacity-50 cursor-pointer hover:shadow-sm shadow-lg shadow-vcsblue-light text-sm h-12', _color, className, fullWidth && 'w-full')} type={type} disabled={loading || disabled} onClick={onClick}>
      {loading ? <EllipsisLoader label={loadingLabel} /> : label}
    </button>
  )
}

export default Button