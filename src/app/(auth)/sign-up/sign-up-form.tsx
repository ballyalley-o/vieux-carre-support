'use client'

import { useActionState, useEffect, useState } from 'react'
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

    const handleFormSubmit = (e:React.FormEvent<HTMLFormElement>) => {
      const form     = e.currentTarget
      const password = form.password.value
      if (password !== confirmPassword) {
        e.preventDefault()
        toast.error(transl('error.password_mismatch'))
      }
    }

    return (
      <div className={cn('w-auto md:w-[500px] max-w-lg rounded-sm p-8 transition-colors duration-300 ease-in-out ')}>
        <h1 className={'text-2xl font-bold mb-6 text-center text-black'}>{transl('sign_up.label')}</h1>
        <form action={formAction} onSubmit={handleFormSubmit} className={'space-y-4 text-gray-700'}>
          {renderStateMessage}
          <input className={'w-full input-default'} type="text" name={'name'} autoCapitalize={'on'} placeholder={transl('form.name.placeholder')} required />
          <input className={'w-full input-default'} type="email" name={'email'} autoComplete={'email'} placeholder={transl('form.email.placeholder')} required />
          <FormPasswordInput name={'password'} />
          <FormPasswordInput name={'confirmPassword'} setConfirmPassword={setConfirmPassowrd} />
          <Button variant={'default'} label={transl('sign_up.label')} loadingLabel={transl('sign_up.loading')} fullWidth />
          <AppAuthRedir type={'sign-up'}/>
        </form>
      </div>
    )
}

export default SignUpForm