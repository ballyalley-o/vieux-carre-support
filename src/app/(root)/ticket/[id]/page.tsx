import { notFound } from 'next/navigation'
import { User, UserRole } from '@prisma/client'
import { getTicketById } from 'action/ticket.action'
import { TicketStatusSelector, TicketCardTitle, TicketFormControl } from 'component/module/ticket'
import { BackButton } from 'component/shared/button'
import { FormViewField } from 'component/shared/form'
import { getSession } from 'lib/session'
import { cn, SystemLogger, transl, unformatTicketId, formatText } from 'lib/utility'

interface TicketPageProps {
  params: Promise<{ id: string }>
}

const TAG = 'Ticket'
const TicketPage = async ({ params }: TicketPageProps) => {
  const { id }   = await params
  const ticketId = unformatTicketId(id)
  const ticket   = await getTicketById(ticketId)
  const user     = await getSession()

  const isAdmin = user && user.role === UserRole.admin
  const isOwner = user && user.id === ticket.userId

  if (!ticket) {
    notFound()
  }

  SystemLogger.sentryLogEvent(
    transl('event.viewing_default', { value: formatText(TAG, 'capitalize') }),
    formatText(TAG, 'lowercase'),
    { ticketId: ticket.id },
    'info'
  )
  return (
    <div className={'min-h-screen p-8 overflow-y-auto flex flex-col'}>
      <div className={'flex-none top-8 sticky z-10'}>
        <h1 className={cn('text-3xl font-bold text-vcsblue mb-8 text-center md:text-left')}>{id}</h1>
        <BackButton />
      </div>
      <div className={'w-auto md:w-[500px] mx-auto bg-blue-50 rounded-sm border border-gray-200 p-8 space-y-6'}>
        <TicketCardTitle subject={ticket.subject} priority={ticket.priority} />
        <FormViewField label={transl('form.description.label')} value={ticket.description} />
        <TicketStatusSelector ticketId={ticketId} currentStatus={ticket.status} userRole={user ? (user as User).role as UserRole : UserRole.user} />
        <FormViewField label={transl('priority.label')} value={formatText(ticket.priority, 'capitalize')} className={cn('text-xl font-bold', `text-priority-${formatText(ticket.priority, 'lowercase')}`)} />
        <FormViewField label={transl('form.created_at.label')} value={new Date(ticket.createdAt).toLocaleString()} />
        <TicketFormControl isAdmin={isAdmin} isOwner={isOwner} ticket={ticket} ticketId={ticketId} />
      </div>
    </div>
  )
}

export default TicketPage
