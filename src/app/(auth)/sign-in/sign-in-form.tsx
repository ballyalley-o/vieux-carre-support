'use client'

import { PATH_DIR } from "vcs.dir"
import { useRouter, useSearchParams } from 'next/navigation'
import { SubmitHandler, FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { signInWithCredentials } from 'action/auth.action'
import { toast } from "sonner"
import { AppAuthRedir } from 'component/shared/app'
import { Button } from 'component/shared/button'
import { RHFFormField, RHFPasswordField } from 'component/shared/rhf'
import { cn, transl } from 'lib/utility'
import { SignInSchema } from 'lib/schema'
import { delay } from 'lib/utility'

interface SignInFormProps {
  action: typeof signInWithCredentials
}

const SignInForm = ({ action }: SignInFormProps) => {
    const router       = useRouter()
    const searchParams = useSearchParams()
    const callbackUrl  = searchParams.get('callbackUrl') || PATH_DIR.HOME
    const form         = useForm<SignIn>({ resolver: zodResolver(SignInSchema), defaultValues: { email: '', password: '' } })

    const { control, register, formState: { isSubmitting }, handleSubmit } = form

   const onSubmit: SubmitHandler<SignIn> = async (data) => {
    try {
      const response = await action(data)
      if (response.success) {
        await delay(500)
        toast.success(response.message)
        router.push(callbackUrl)
        router.refresh()
      } else {
        toast.error(response.message)
      }
    } catch (error) {
      console.log('error: ', error)
      toast.error((error as AppError)?.message)
    }
   }

    return (
      <div className={cn('w-auto md:w-[500px] max-w-lg rounded-sm p-8 transition-colors duration-300 ease-in-out ')}>
        <h1 className={'text-2xl font-bold mb-6 text-center text-black'}>{transl('sign_in.label')}</h1>
        <FormProvider {...form}>
          <form method={'POST'} onSubmit={handleSubmit(onSubmit)} className={'space-y-4 text-gray-700'}>
            <RHFFormField control={control} name={'email'} formKey={'email'} disabled={isSubmitting} withWrapper />
            <RHFPasswordField control={control} register={register} name={'password'} formKey={'password'} disabled={isSubmitting} withWrapper />
            <Button variant={'default'} label={transl('sign_in.label')} loadingLabel={transl('sign_in.loading')} loading={isSubmitting} fullWidth />
            <AppAuthRedir type={'sign-in'} />
            {/*TODO:  add google-auth or integrate with vieux-carre authentication */}
          </form>
        </FormProvider>
      </div>
    )
}

export default SignInForm