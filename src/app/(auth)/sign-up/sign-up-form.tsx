'use client'

import { useActionState, useEffect } from "react"
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
    const [state, formAction]                     = useActionState(action, RESPONSE.DEFAULT)
    const router                                  = useRouter()

    useEffect(() => {
      if (state.success) {
        toast.success(transl('success.ticket_submitted'))
        router.push(PATH_DIR.TICKET.root)
      }
    }, [state.success, router])


    const renderStateMessage = state.message && !state.success && <p className={'text-red-500 mb-4 text-center'}>{state.message}</p>
    return (
      <div className={cn('w-auto md:w-[500px] max-w-lg shadow-md rounded-sm p-8 transition-colors duration-300 ease-in-out ','bg-blue-50')}>
        <h1 className={'text-2xl font-bold mb-6 text-center text-black'}>{transl('sign_up.label')}</h1>
        <form action={formAction} className={'space-y-4 text-gray-700'}>
          {renderStateMessage}
          <input className={'w-full input-default'} type="text" name={'name'} autoCapitalize={'on'} placeholder={transl('form.name.placeholder')} required />
          <input className={'w-full input-default'} type="text" name={'email'} autoComplete={'email'} placeholder={transl('form.email.placeholder')} required />
          <input className={'w-full input-default'} type="text" name={'password'} autoComplete={'new-password'} placeholder={transl('form.password.placeholder')} required />

          <Button variant={'default'} label={transl('submit.label')} fullWidth />
        </form>
      </div>
    )
}

export default SignUpForm