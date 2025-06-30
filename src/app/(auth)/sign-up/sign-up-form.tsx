'use client'

import { PATH_DIR } from 'vcs.dir'
import { useRouter } from 'next/navigation'
import { SubmitHandler, FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { signUp } from "action/auth.action"
import { toast } from "sonner"
import { AppAuthRedir } from 'component/shared/app'
import { Button } from 'component/shared/button'
import { RHFFormField, RHFPasswordField } from 'component/shared/rhf'
import { SignUpSchema } from 'lib/schema'
import { cn, transl, delay } from 'lib/utility'

interface SignUpFormProps {
  action: typeof signUp
}

const SignUpForm = ({ action }: SignUpFormProps) => {
    const router = useRouter()
    const form   = useForm<SignIn>({ resolver: zodResolver(SignUpSchema), defaultValues: { email: '', password: '' } })

    const { control, register, formState: { isSubmitting }, handleSubmit } = form
    const onSubmit: SubmitHandler<SignIn> = async (data) => {
      try {
        const response = await action(data)
        await delay(500)
        toast.success(response.message)
        router.push(PATH_DIR.HOME)
        router.refresh()
      } catch (error) {
        toast.error((error as AppError).message)
      }
    }
    return (
      <div className={cn('w-auto md:w-[500px] max-w-lg rounded-sm p-8 transition-colors duration-300 ease-in-out ')}>
        <h1 className={'text-2xl font-bold mb-6 text-center text-black'}>{transl('sign_up.label')}</h1>
        <FormProvider {...form}>
        <form method={'POST'} onSubmit={handleSubmit(onSubmit)} className={'space-y-4 text-gray-700'}>
          <RHFFormField control={control} name={'name'} formKey={'name'} disabled={isSubmitting} withWrapper />
          <RHFFormField control={control} name={'email'} formKey={'email'} disabled={isSubmitting} withWrapper />
          <RHFPasswordField control={control} register={register} name={'password'} formKey={'password'} disabled={isSubmitting} withWrapper />
          <RHFPasswordField control={control} register={register} name={'confirmPassword'} formKey={'confirm_password'} disabled={isSubmitting} withWrapper />
          {/* <input className={'w-full input-default'} type="text" name={'name'} autoCapitalize={'on'} placeholder={transl('form.name.placeholder')} required />
          <input className={'w-full input-default'} type="email" name={'email'} autoComplete={'email'} placeholder={transl('form.email.placeholder')} required />
          <FormPasswordInput name={'password'} />
          <FormPasswordInput name={'confirmPassword'} setConfirmPassword={setConfirmPassowrd} /> */}
          <Button variant={'default'} label={transl('sign_up.label')} loadingLabel={transl('sign_up.loading')} fullWidth />
          <AppAuthRedir type={'sign-up'}/>
        </form>
        </FormProvider>
      </div>
    )
}

export default SignUpForm