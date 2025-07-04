import { auth } from "vieux-carre.authenticate"
import { PATH_DIR } from "vcs.dir"
import { createTicket } from "action/ticket.action"
import { redirect } from "next/navigation"
import { getAbsoluteUrl } from "lib/next"
import NewTicketForm  from "app/(root)/ticket/new/new-ticket-form"

const NewTicketPage = async () => {
  const user = await auth()
  if (!user) {
    const url         = await getAbsoluteUrl()
    const callbackUrl = encodeURIComponent(url)
    redirect(`${PATH_DIR.AUTH.sign_in}?callbackUrl=${callbackUrl}`)
  }
  return (
    <div className={'min-h-screen flex items-center justify-center px-4'}>
      <NewTicketForm action={createTicket} />
    </div>
  )
}

export default NewTicketPage