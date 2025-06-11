'use client'

import { Fragment, useActionState, useEffect } from "react"
import { closeTicket } from "action/ticket.action"
import { toast } from "sonner"
import { Button } from "component/shared/button"
import { RESPONSE } from "lib/constant"
import { transl } from "lib/utility"

interface TicketCloseButtonProps {
    ticketId : number
    isClosed : boolean
}

const TicketCloseButton = ({ ticketId, isClosed }: TicketCloseButtonProps) => {
    const [state, formAction] = useActionState(closeTicket, RESPONSE.DEFAULT)

    useEffect(() => {
        if (state.success) {
            toast.success(state.message)
        } else if (state.message && !state.success) {
          toast.error(state.message)
        }
    }, [state])

    if (isClosed) return null
    return (
      <form action={formAction}>
        <Button
          variant={'outline'}
          type={'submit'}
          loadingLabel={transl('close_ticket.loading')}
          label={
            <Fragment>
              <span className={'icon--ticket-check-outline'}></span>
              <h2>{transl('close_ticket.label')}</h2>
            </Fragment>
          }
          className={'text-vcsred border-vcsred hover:border-vcsred-dark shadow-vcsred/10 font-bold flex justify-start items-center gap-2 text-md'}
        />
        <input type={'hidden'} name={'ticketId'} value={ticketId} />
      </form>
    )
}

export default TicketCloseButton