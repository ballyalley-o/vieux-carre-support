'use client'

import { useActionState, useEffect } from 'react'
import { PATH_DIR } from "vcs.dir"
import { useRouter } from 'next/navigation'
import { signUp } from "action/auth.action"
import { toast } from "sonner"
import { AppAuthRedir } from 'component/shared/app'
import { Button } from 'component/shared/button'
import { FormPasswordInput } from 'component/shared/form'
import { RESPONSE } from "lib/constant"
import { cn, transl } from 'lib/utility'

interface SignUpFormProps {
  action: typeof signUp
}

const SignUpForm = ({ action }: SignUpFormProps) => {
    const [state, formAction]             = useActionState(action, RESPONSE.DEFAULT)
    const router                          = useRouter()

    useEffect(() => {
      if (state.success) {
        toast.success(transl('success.signed_in'))
        router.push(PATH_DIR.HOME)
        router.refresh()
      }
    }, [state.success, router])

    const renderStateMessage       = state.message && !state.success && <p className = {'text-red-500 mb-4 text-center'}>{state.message}</p>

    return (
      <div className={cn('w-auto md:w-[500px] max-w-lg rounded-sm p-8 transition-colors duration-300 ease-in-out ')}>
        <h1 className={'text-2xl font-bold mb-6 text-center text-black'}>{transl('sign_in.label')}</h1>
        <form action={formAction} className={'space-y-4 text-gray-700'}>
          {renderStateMessage}
          <input className={'w-full input-default'} type="email" name={'email'} autoComplete={'email'} placeholder={transl('form.email.placeholder')} required />
          <FormPasswordInput name={'password'} />
          <Button variant={'default'} label={transl('sign_in.label')} loadingLabel={transl('sign_in.loading')} fullWidth />
          <AppAuthRedir type={'sign-in'}/>
        {/*TODO:  add google-auth or integrate with vieux-carre authentication */}
        </form>
      </div>
    )
}

export default SignUpForm