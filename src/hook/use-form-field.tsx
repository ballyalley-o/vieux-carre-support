'use client'

import React from 'react'
import { FieldValues, FieldPath, useFormContext } from 'react-hook-form'

type FormItemContextValue = {
  id: string
}

const FormItemContext = React.createContext<FormItemContextValue>({} as FormItemContextValue)

type FormFieldContextValue<TFieldValues extends FieldValues = FieldValues, TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>> = {
  name: TName
}

const FormFieldContext = React.createContext<FormFieldContextValue>({} as FormFieldContextValue)

/**
 * Custom hook that provides context and state information for a form field.
 *
 * This hook must be used within a `<FormField>` component, as it relies on
 * `FormFieldContext` and `FormItemContext` to retrieve field-specific data.
 * It also integrates with `useFormContext` to access form state and field state.
 *
 * @throws {Error} If used outside of a `<FormField>` context.
 *
 * @returns An object containing:
 * - `id`: The unique identifier for the form item.
 * - `name`: The name of the form field.
 * - `formItemId`: The DOM id for the form item container.
 * - `formDescriptionId`: The DOM id for the form item's description.
 * - `formMessageId`: The DOM id for the form item's message.
 * - All properties from the field state as returned by `getFieldState`.
 */
const useFormField = () => {
  const fieldContext                 = React.useContext(FormFieldContext)
  const itemContext                  = React.useContext(FormItemContext)
  const { getFieldState, formState } = useFormContext()

  const fieldState = getFieldState(fieldContext.name, formState)

  if (!fieldContext) {
    throw new Error('useFormField should be used within <FormField>')
  }

  const { id } = itemContext

  return {
    id,
    name             : fieldContext.name,
    formItemId       : `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId    : `${id}-form-item-message`,
    ...fieldState
  }
}

export { useFormField }
