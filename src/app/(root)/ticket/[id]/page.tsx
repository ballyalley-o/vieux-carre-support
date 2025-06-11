import { Fragment } from 'react'
import { PATH_DIR } from 'vcs.dir'
import { notFound } from 'next/navigation'
import { getTicketById } from "action/ticket.action"
import { MdArrowBack } from 'react-icons/md'
import { FaCircle } from 'react-icons/fa'
import { BackButton, Button } from 'component/shared/button'
import { cn, SystemLogger, transl, unformatTicketId, formatText } from "lib/utility"

interface TicketPageProps {
    params: Promise<{ id: string }>
}

const TAG        = 'Ticket'
const TicketPage = async ({ params }: TicketPageProps) => {
    const { id }   = await params
    const ticketId = unformatTicketId(id)
    const ticket   = await getTicketById(ticketId)

    if (!ticket) {
        notFound()
    }

    SystemLogger.sentryLogEvent(transl('event.viewing_default', { value: formatText(TAG, 'capitalize') }), formatText(TAG, 'lowercase'), { ticketId: ticket.id }, 'info')
    return (
      <div className={'min-h-screen p-8 overflow-y-auto flex flex-col'}>
        <div className={'flex-none top-8 sticky z-10'}>
          <h1 className={cn('text-3xl font-bold text-vcsblue mb-8 text-center md:text-left')}>{id}</h1>
          <BackButton />
        </div>
        <div className={'w-auto md:w-[500px] mx-auto bg-blue-50 rounded-sm border border-gray-200 p-8 space-y-6'}>
          <div className="flex justify-between items-center">
            <h1 className={'text-3xl font-bold text-vcsblue'}>{ticket.subject}</h1>
            <FaCircle className={cn(`text-2xl text-priority-${formatText(ticket.priority, 'lowercase')}`)} />
          </div>
          <div className={'text-gray-700'}>
            <h2 className="text-lg font-semibold mb-2">{transl('form.description.label')}</h2>
            <p className={'text-xl'}>{ticket.description}</p>
          </div>
          <div className={''}>
            <h2 className="text-lg font-semibold mb-2">{transl('status.label')}</h2>
            <p className={cn('text-xl font-bold', `text-priority-${formatText(ticket.status, 'lowercase')}`)}>
              {formatText(ticket.status, 'capitalize')}
            </p>
          </div>
          <div className={''}>
            <h2 className="text-lg font-semibold mb-2">{transl('priority.label')}</h2>
            <p className={cn('text-xl font-bold', `text-priority-${formatText(ticket.priority, 'lowercase')}`)}>
              {formatText(ticket.priority, 'capitalize')}
            </p>
          </div>
          <div className={' text-gray-700'}>
            <h2 className="text-lg font-semibold mb-2">{transl('form.created_at.label')}</h2>
            <p className={'text-xl'}>{new Date(ticket.createdAt).toLocaleString()}</p>
          </div>

          <div className={'flex items-center gap-2'}>
            <Button
              link
              href={PATH_DIR.TICKET.root}
              variant={'primary'}
              label={
                <Fragment>
                  <MdArrowBack className={''} />
                  <h2>{transl('go_back_tickets.label')}</h2>
                </Fragment>
              }
              className={'w-[150px] flex justify-start items-center bg-vcsblue gap-2 text-white px-4 py-2 rounded-sm hover:bg-blue-700 transition'}
            />
            <TicketCloseButton ticketId={ticketId} isClosed={ticket.status === TicketStatus.CLOSED} />
          </div>
        </div>
      </div>
    )
}

export default TicketPage