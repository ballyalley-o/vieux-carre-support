
import { z, ZodSchema } from 'zod'
import { en } from 'vcs.locale'
import { Control, Path, useFormContext } from 'react-hook-form'
import { useFormField } from 'hook'
import { transl, cn } from 'lib/utility'

type FormKeyLocale = keyof typeof en.form
type FormFieldType = 'input' | 'inputWithButton' | 'textarea'

interface RHFFormFieldProps<TSchema extends ZodSchema, TName extends Path<z.infer<TSchema>>> {
  control     : Control<z.infer<TSchema>>
  name        : TName
  formKey     : FormKeyLocale
  type       ?: FormFieldType
  disabled   ?: boolean
  className  ?: string
  withWrapper?: boolean
  withButton ?: boolean
  buttonLabel?: string
  onClick    ?: () => void
}

const RHFFormField = <TSchema extends ZodSchema, TName extends Path<z.infer<TSchema>>>({ name, formKey, disabled = false, withWrapper = true, className }: RHFFormFieldProps<TSchema, TName>) => {
  const { register } = useFormContext()
  const { error, formMessageId } = useFormField()
  const body = error ? String(error.message) : ''

  const FormFieldComponent = (
   <div className={'w-full'}>
      <label htmlFor={name} className={'block text-sm font-medium text-gray-700 mb-1'}>{transl(`form.${formKey}.label`)}</label>
      <input autoComplete={name} {...register(name)} placeholder={transl(`form.${formKey}.placeholder`)} className={'block w-full border border-gray-300 rounded-md px-3 py-2 text-sm'} disabled={disabled} />
      <p id={formMessageId} className={cn('text-[0.8rem] font-medium text-destructive', className)}>{body}</p>
   </div>
  )

  return withWrapper ?  (
    <div className={cn("flex flex-col md:flex-row gap-5", className)}>
      {FormFieldComponent}
    </div>
  ) : FormFieldComponent
}

export default RHFFormField
