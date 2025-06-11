import NewTicketForm  from "app/(root)/ticket/new/new-ticket-form"
import { createTicket } from "action/ticket.action"
import { getSession } from "lib/session"
import { redirect } from "next/navigation"
import { PATH_DIR } from "config/dir"

const NewTicketPage = async () => {
  const user = await getSession()
  if (!user) {
     const callbackUrl = encodeURIComponent(PATH_DIR.TICKET.new)
     redirect(`${PATH_DIR.AUTH.sign_in}?callbackUrl=${callbackUrl}`)
  }
  return (
    <div className={'min-h-screen flex items-center justify-center px-4'}>
      <NewTicketForm action={createTicket} />
    </div>
  )
}

export default NewTicketPage