'use server'

import { prisma } from 'vcs.db'
import { PATH_DIR } from 'vcs.dir'
import { revalidatePath } from 'next/cache'
import { TicketPriority } from 'generated/prisma'
import { CODE } from "lib/constant"
import { transl } from "lib/utility"
import { SystemLogger } from "lib/utility/app-logger"

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const TAG    = 'Ticket.Action'
const MODULE = 'ticket'
export async function createTicket(prevState: AppResponse, formData: FormData): AppResponseType {
    try {
        const subject     = formData.get('subject') as string
        const description = formData.get('description') as string
        const priority    = formData.get('priority') as TicketPriority

        const _data = { subject, description, priority }

        if (!subject || !description || !priority) {
            SystemLogger.sentryLogEvent(transl('error.missing_field'), MODULE, _data, 'warning')
            return SystemLogger.response(false, transl('error.missing_field'), CODE.BAD_REQUEST, {})
        }

        const ticket   = await prisma.ticket.create({ data: _data })

        const _message = transl('success.created_default', { value: MODULE, id: ticket.id })
        SystemLogger.sentryLogEvent(_message)

        revalidatePath(PATH_DIR.TICKET.root)
        return SystemLogger.response(true, transl('success.created'), CODE.OK, { subject, description, priority })
    } catch (error: AppError) {
        const _errorMessage = transl('error.create_ticket', { error: error.message })
        SystemLogger.sentryLogEvent(_errorMessage, MODULE, { formData: Object.fromEntries(formData.entries()) }, 'error', error)
        return SystemLogger.response(false, _errorMessage, CODE.BAD_REQUEST, {})
    }
}