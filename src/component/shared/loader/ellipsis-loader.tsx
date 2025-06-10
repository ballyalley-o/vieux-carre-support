import { FC } from 'react'
import { cn } from 'lib/utility'

interface EllipsisLoaderProps {
  className?: string
  dotSize  ?: string
  dotColor ?: string
  label    ?: string
}

const EllipsisLoader: FC<EllipsisLoaderProps> = ({ className, dotSize = 'text-lg', dotColor = 'text-white', label, ...props }) => {
  return (
    <div className={cn('flex items-center text-center justify-center gap-1', className)} {...props}>
      {label  && <span className={cn('animate-pulse', dotSize, dotColor)}>{label}</span>}
      <span className={cn('dot-animation', dotSize, dotColor)}>{'.'}</span>
      <span className={cn('dot-animation delay-200', dotSize, dotColor)}>{'.'}</span>
      <span className={cn('dot-animation delay-400', dotSize, dotColor)}>{'.'}</span>
    </div>
  )
}

export default EllipsisLoader
