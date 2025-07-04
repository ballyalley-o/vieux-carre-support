import { createTicket } from "action/ticket.action"
import NewTicketForm  from "app/(root)/ticket/new/new-ticket-form"

const NewTicketPage = async () => {
  return (
    <div className={'min-h-screen flex items-center justify-center px-4'}>
      <NewTicketForm action={createTicket} />
    </div>
  )
}

export default NewTicketPage