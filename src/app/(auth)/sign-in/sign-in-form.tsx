'use client'

import { useActionState, useEffect, useState } from 'react'
import { PATH_DIR } from "vcs.dir"
import { useRouter } from 'next/navigation'
import { signUp } from "action/auth.action"
import { toast } from "sonner"
import { Button } from 'component/shared/button'
import { RESPONSE } from "lib/constant"
import { cn, transl } from 'lib/utility'

interface SignUpFormProps {
  action: typeof signUp
}

const SignUpForm = ({ action }: SignUpFormProps) => {
    const [viewPassword, setViewPassword] = useState(false)
    const [state, formAction]             = useActionState(action, RESPONSE.DEFAULT)
    const router                          = useRouter()

    useEffect(() => {
      if (state.success) {
        toast.success(transl('success.ticket_submitted'))
        router.push(PATH_DIR.TICKET.root)
      }
    }, [state.success, router])

    const renderStateMessage       = state.message && !state.success && <p className = {'text-red-500 mb-4 text-center'}>{state.message}</p>
    const togglePasswordVisibility = () => setViewPassword(prev => !prev)

    return (
      <div className={cn('w-auto md:w-[500px] max-w-lg shadow-md rounded-sm p-8 transition-colors duration-300 ease-in-out ','bg-blue-50')}>
        <h1 className={'text-2xl font-bold mb-6 text-center text-black'}>{transl('sign_up.label')}</h1>
        <form action={formAction} className={'space-y-4 text-gray-700'}>
          {renderStateMessage}
          <input className={'w-full input-default'} type="email" name={'email'} autoComplete={'email'} placeholder={transl('form.email.placeholder')} required />
          <div className={'relative'}>
            <input className={'w-full input-default'} type={viewPassword ? 'text': "password"} name={'password'} autoComplete={'new-password'} placeholder={transl('form.password.placeholder')} required />
            <button type={'button'} className={'absolute inset-y-0 right-2 flex items-center px-2'} onClick={togglePasswordVisibility}  aria-label={viewPassword ? transl('hide_password.label') : transl('show_password.label')}><span className={viewPassword ? '--icon-eye-fill' : '--icon-eye-off'}></span></button>
          </div>
          <Button variant={'default'} label={transl('sign_in.label')} fullWidth />
        </form>
        {/*TODO:  add google-auth or integrate with vieux-carre authentication */}
      </div>
    )
}

export default SignUpForm