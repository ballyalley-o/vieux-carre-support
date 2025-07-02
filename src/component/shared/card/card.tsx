import { ReactNode } from 'react'
import { TicketStatus } from 'vieux-carre.prisma'
import { cn } from 'lib/utility'

interface CardProps {
  title      : string
  icon      ?: ReactNode
  status    ?: TicketStatus
  header    ?: string
  children  ?: ReactNode
  className ?: string
}

const Card = ({ title, icon,status,  header, children, className }: CardProps) => {
  return (
    <article className={cn('flex justify-between items-center rounded-sm shadow-sm border border-gray-200 p-6 bg-blue-50', className)}>
      <div>
        {<div className={'flex items-center justify-center text-xs font-semibold bg-vcsblue-light w-24 mb-2'}><h4 className={`p-1 text-status-${status?.toLowerCase()} rounded-sm`}>{status}</h4></div>}
        {header && <h4 className={'text-sm font-semibold text-gray-700'}>{header}</h4>}
        <h2 className={'text-xl font-semibold text-blue-600'}>{title}</h2>
      </div>
      <div className={'text-right space-y-2'}>
        {icon && <div className={'text-sm text-gray-500 flex items-center gap-2'}>{icon}</div>}
        {children}
      </div>
    </article>
  )
}

export default Card