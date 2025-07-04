import { ReactNode } from 'react'

export type ButtonVariantType = 'default' | 'primary' | 'secondary' | 'outline' | 'transparent' | 'desctructive'
export type ButtonTypeProps = {
  type        ?: AppButtonType
  label        : ReactNode
  loading     ?: boolean
  loadingLabel?: string
  variant      : ButtonVariantType
  link        ?: false
  fullWidth   ?: boolean
  disabled    ?: boolean
  className   ?: string
  onClick     ?: () => void
}

export type LinkButtonTypeProps = {
  label        : ReactNode
  loading     ?: boolean
  loadingLabel?: string
  variant      : ButtonVariantType
  link         : true
  href         : string
  fullWidth   ?: boolean
  type        ?: AppButtonType
  disabled    ?: boolean
  className   ?: string
  onClick     ?: () => void
}

export type ButtonProps = ButtonTypeProps | LinkButtonTypeProps