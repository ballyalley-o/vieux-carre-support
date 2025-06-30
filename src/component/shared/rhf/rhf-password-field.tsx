'use client'

import { useState } from 'react'
import { en } from 'vcs.locale'
import { z, ZodSchema } from 'zod'
import { Control,  Path, useForm } from 'react-hook-form'
import { FaEyeSlash, FaEye } from 'react-icons/fa'
import { useFormField } from 'hook'
import { transl, cn } from 'lib/utility'

type FormKeyLocale = keyof typeof en.form
interface RHFPasswordFieldProps <TSchema extends ZodSchema, TName extends Path<z.infer<TSchema>>> {
    register    : (name: TName) => ReturnType<ReturnType<typeof useForm>['register']>
    control     : Control<z.infer<TSchema>>
    name        : TName
    error      ?: string
    formKey     : FormKeyLocale
    className  ?: string
    disabled   ?: boolean
    withWrapper?: boolean
}

const RHFPasswordField = <TSchema extends ZodSchema, TName extends Path<z.infer<TSchema>>>({ register,  name, className, formKey, disabled, withWrapper }: RHFPasswordFieldProps<TSchema, TName>) => {
    const [showPassword, setShowPassword] = useState(false)

    const { error, formMessageId } = useFormField()
    const body = error ? String(error.message) : ''

    const togglePassword = () => {
        setShowPassword(!showPassword)
    }
      const FormPasswordInput = (
        <div className={'relative'}>
          <input id={name} aria-label={'password-toggle'} {...register(name)} type={showPassword ? 'text' : 'password'} autoComplete={name} placeholder={transl(`form.${formKey}.placeholder` as const)} disabled={disabled} required className={'block w-full border border-gray-300 rounded-md px-3 py-2 text-sm'}  />
          <button type={'button'} onClick={togglePassword} className={cn('absolute inset-y-0 right-3 items-center flex', disabled ? 'text-muted-foreground opacity-25' : 'text-muted-foreground cursor-pointer')}>
            {showPassword ? <FaEyeSlash size={15} /> : <FaEye size={15} />}
          </button>
        </div>
      )

      const FormPasswordFieldComponent = (
        <div className={'w-full'}>
          <label className={'block text-sm font-medium text-gray-700 mb-1'}>{transl(`form.${formKey}.label` as const)}</label>
          {FormPasswordInput}
          <p id={formMessageId} className={cn('text-[0.8rem] font-medium text-destructive', className)}>
            {body}
          </p>
        </div>
      )


      return withWrapper ? (
        <div className={cn('flex flex-col md:flex-row gap-5', className)}>{FormPasswordFieldComponent}</div>
      ) : (
        FormPasswordFieldComponent
      )
}

export default RHFPasswordField