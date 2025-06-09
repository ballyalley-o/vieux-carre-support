'use client'

import { useActionState, useEffect, useState } from 'react'
import { PATH_DIR } from "vcs.dir"
import { useRouter } from 'next/navigation'
import { signUp } from "action/auth.action"
import { toast } from "sonner"
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { Button } from 'component/shared/button'
import { RESPONSE } from "lib/constant"
import { cn, transl } from 'lib/utility'

interface SignUpFormProps {
  action: typeof signUp
}

const SignUpForm = ({ action }: SignUpFormProps) => {
    const [viewPassword, setViewPassword]               = useState(false)
    const [viewConfirmPassword, setViewConfirmPassword] = useState(false)
    const [confirmPassword, setConfirmPassowrd]         = useState('')
    const [state, formAction]                           = useActionState(action, RESPONSE.DEFAULT)
    const router                                        = useRouter()

    useEffect(() => {
      if (state.success) {
        toast.success(transl('success.signed_up'))
        router.push(PATH_DIR.HOME)
        router.refresh()
      } else if (state.message) {
        toast.error(state.message)
      }
    }, [state, router])

    const renderStateMessage              = state.message && !state.success && <p className={'text-red-500 mb-4 text-center'}>{state.message}</p>
    const togglePasswordVisibility        = () => setViewPassword(prev => !prev)
    const toggleConfirmPasswordVisibility = () => setViewConfirmPassword((prev) => !prev)
    const toggleShowPasswordIcon          = (_bool: boolean) => _bool ? <FaEyeSlash className={'text-gray-400'} /> : <FaEye className={'text-gray-400'} />

    const handleFormSubmit = (e:React.FormEvent<HTMLFormElement>) => {
      const form     = e.currentTarget
      const password = form.password.value
      if (password !== confirmPassword) {
        e.preventDefault()
        toast.error(transl('error.password_mismatch'))
      }
    }

    return (
      <div className={cn('w-auto md:w-[500px] max-w-lg shadow-md rounded-sm p-8 transition-colors duration-300 ease-in-out ','bg-blue-50')}>
        <h1 className={'text-2xl font-bold mb-6 text-center text-black'}>{transl('sign_up.label')}</h1>
        <form action={formAction} onSubmit={handleFormSubmit} className={'space-y-4 text-gray-700'}>
          {renderStateMessage}
          <input className={'w-full input-default'} type="text" name={'name'} autoCapitalize={'on'} placeholder={transl('form.name.placeholder')} required />
          <input className={'w-full input-default'} type="email" name={'email'} autoComplete={'email'} placeholder={transl('form.email.placeholder')} required />
          <div className={'relative'}>
            <input className={'w-full input-default 10 pr-10'} type={viewPassword ? 'text': "password"} name={'password'} autoComplete={'new-password'} placeholder={transl('form.password.placeholder')} required />
            <button type={'button'} className={'absolute inset-y-0 right-2 flex items-center px-2 cursor-pointer text-xl'} onClick={togglePasswordVisibility}  aria-label={viewPassword ? transl('show_password.label') : transl('hide_password.label')}>{toggleShowPasswordIcon(viewPassword)}</button>
          </div>
          <div className={'relative'}>
            <input className={'w-full input-default pr-10'} type={viewConfirmPassword ? 'text': "password"} name={'confirm-password'} autoComplete={'new-password'} placeholder={transl('form.confirm_password.placeholder')} onChange={(e) => setConfirmPassowrd(e.target.value)}  required />
            <button type={'button'} className={'absolute inset-y-0 right-2 flex items-center px-2  cursor-pointer text-xl'} onClick={toggleConfirmPasswordVisibility}  aria-label={viewPassword ? transl('hide_password.label') : transl('show_password.label')}>{toggleShowPasswordIcon(viewConfirmPassword)}</button>
          </div>
          <Button variant={'default'} label={transl('sign_up.label')} fullWidth />
        </form>
      </div>
    )
}

export default SignUpForm