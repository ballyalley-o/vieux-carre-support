import { ReactNode } from 'react'
import { EllipsisLoader } from 'component/shared/loader'

type ButtonProps = {
 type   ?: AppButtonType
 label   : ReactNode
 pending : boolean
}
const Button = ({ label, type = 'submit', pending }: ButtonProps) => {
    return (
      <button className={'w-full bg-vcsblue text-white p-3 rounded hover:bg-blue-900 transition disabled:opacity-50 cursor-pointer hover:shadow-sm shadow-lg'} type={type}>
        {pending ? <EllipsisLoader /> : label}
      </button>
    )
}

export default Button