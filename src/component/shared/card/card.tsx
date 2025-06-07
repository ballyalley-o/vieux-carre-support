import { ReactNode } from 'react'
import { cn } from 'lib/utility'

interface CardProps {
  title     : string
  icon     ?: ReactNode
  header   ?: string
  children ?: ReactNode
  className?: string
}

const Card = ({ title, icon, header, children, className }: CardProps) => {
  return (
    <article className={cn('flex justify-between items-center rounded-sm shadow-sm border border-gray-200 p-6 bg-blue-50', className)}>
      <div>
        {header && <h4 className={"text-sm font-semibold text-gray-700"}>{header}</h4>}
        <h2 className={"text-xl font-semibold text-blue-600"}>{title}</h2>
      </div>
      <div className={"text-right space-y-2"}>
        {icon && <div className={"text-sm text-gray-500 flex items-center gap-2"}>{icon}</div>}
        {children}
      </div>
    </article>
  )
}

export default Card