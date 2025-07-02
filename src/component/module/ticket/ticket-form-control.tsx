import { Fragment } from "react"
import { PATH_DIR } from "vcs.dir"
import { Ticket, TicketStatus } from 'vieux-carre.prisma'
import { MdArrowBack } from "react-icons/md"
import { TicketCloseButton } from 'component/module/ticket'
import { Button } from "component/shared/button"
import { transl } from "lib/utility"

interface TicketFormControlProps {
  ticket  : Ticket
  ticketId: number
  isAdmin : boolean | null
  isOwner : boolean | null
}

const TicketFormControl = ({ isAdmin, isOwner,  ticket, ticketId }: TicketFormControlProps) => {
  return (
    <div className={'flex items-center gap-2'}>
      <Button
        link
        href={PATH_DIR.TICKET.root}
        variant={'primary'}
        label={
          <Fragment>
            <MdArrowBack />
            <h2>{transl('go_back_tickets.label')}</h2>
          </Fragment>
        }
        className={'w-[150px] flex justify-start items-center bg-vcsblue gap-2 text-white px-4 py-2 rounded-sm hover:bg-blue-700 transition'}
      />
      {(isAdmin || isOwner) && <TicketCloseButton ticketId={ticketId} isClosed={ticket.status === TicketStatus.CLOSED || ticket.status === TicketStatus.RESOLVED} />}
    </div>
  )
}

export default TicketFormControl