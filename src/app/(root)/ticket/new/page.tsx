import NewTicketForm  from "app/(root)/ticket/new/new-ticket-form"
import { createTicket } from "action/ticket.action"

const NewTicketPage = () => {
  return (
    <div className={'min-h-screen flex items-center justify-center px-4'}>
      <NewTicketForm action={createTicket} />
    </div>
  )
}

export default NewTicketPage