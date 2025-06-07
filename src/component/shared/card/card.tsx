import { ReactNode } from 'react'
import { cn } from 'lib/utility'

interface CardProps {
  title     : string
  icon     ?: ReactNode
  children ?: ReactNode
  className?: string
}

const Card = ({ title, icon, children, className }: CardProps) => {
  return (
    <article className={cn('flex justify-between items-center rounded-sm shadow-sm border border-gray-200 p-6 bg-blue-50', className)}>
      <div>
        <h2 className="text-xl font-semibold text-blue-600">{title}</h2>
      </div>
      <div className="text-right space-y-2">
        {icon && (
          <div className="text-sm text-gray-500 flex items-center gap-2">
            {icon}
          </div>
        )}
        {children}
      </div>
    </article>
  )
}

export default Card