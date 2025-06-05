'use client'

import { ReactNode } from 'react'
import { useFormStatus } from 'react-dom'
import { EllipsisLoader } from 'component/shared/loader'

type ButtonProps = {
 type   ?: AppButtonType
 label   : ReactNode
}
const Button = ({ label, type = 'submit' }: ButtonProps) => {
  const { pending } = useFormStatus()
    return (
      <button className={'w-full bg-vcsblue text-white p-3 rounded hover:bg-blue-900 transition disabled:opacity-50 cursor-pointer hover:shadow-sm shadow-lg'} type={type} disabled={pending}>
        {pending ? <EllipsisLoader /> : label}
      </button>
    )
}

export default Button