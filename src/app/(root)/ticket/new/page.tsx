import { headers } from "next/headers"
import { createTicket } from "action/ticket.action"
import NewTicketForm  from "app/(root)/ticket/new/new-ticket-form"

import { auth } from "vieux-carre.authenticate"
import { PATH_DIR } from "vcs.dir"
import { redirect } from "next/navigation"

const NewTicketPage = async () => {
  const user = await auth()
  if (!user) {
    // Construct the absolute callbackUrl using the current request URL
    const headersList = await headers()
    const protocol    = headersList.get("x-forwarded-proto") || "https"
    const host        = headersList.get("host")
    const url         = `${protocol}://${host}/ticket/new`
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