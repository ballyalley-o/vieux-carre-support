'use client'

import { useState } from 'react'
import { FaEyeSlash, FaEye } from 'react-icons/fa'
import { transl } from 'lib/utility'

interface FormPasswordInputProps {
    name               : string
    onClick           ?: () => void
    setConfirmPassword?: React.Dispatch<React.SetStateAction<string>>
}

const FormPasswordInput = ({ name, setConfirmPassword }: FormPasswordInputProps) => {
    const [viewPassword, setViewPassword] = useState(false)

    const togglePasswordVisibility = () => setViewPassword((prev) => !prev)
    const toggleShowPasswordIcon   = (_bool: boolean) => _bool ? <FaEyeSlash className = {'text-gray-400'} /> : <FaEye className = {'text-gray-400'} />


    return (
        <div className={'relative'}>
            <input className={'w-full input-default pr-10'} type={viewPassword ? 'text': "password"} name={name} autoComplete={'new-password'} placeholder={transl('form.confirm_password.placeholder')} onChange={(e) => setConfirmPassword?.(e.target.value)} required />
            <button type={'button'} className={'absolute inset-y-0 right-2 flex items-center px-2  text-gray-500 cursor-pointer text-xl'} onClick={togglePasswordVisibility}  aria-label={viewPassword ? transl('hide_password.label') : transl('show_password.label')}>{toggleShowPasswordIcon(viewPassword)}</button>
        </div>
      )
}

export default FormPasswordInput