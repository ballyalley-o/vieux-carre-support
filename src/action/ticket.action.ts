'use server'

import { GLOBAL } from 'vcs'
import { prisma } from 'vcs.db'
import { PATH_DIR } from 'vcs.dir'
import { revalidatePath } from 'next/cache'
import { Prisma, TicketPriority, TicketStatus } from 'vieux-carre.authenticate'
import { SystemLogger } from "lib/utility/app-logger"
import { CODE, KEY } from "lib/constant"
import { transl, formatToPlainObject } from 'lib/utility'
import { getSession } from 'lib/session'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const TAG    = 'Ticket.Action'
const MODULE = 'ticket'
export async function createTicket(prevState: AppResponse, formData: FormData): AppResponseType {
    try {
        const user = await getSession()

        if (!user) {
          SystemLogger.sentryLogEvent(transl('error.unauthorized_ticket_create'), MODULE, {}, 'warning')
          return SystemLogger.response(false, transl('error.unable_create_ticket'), CODE.UNAUTHORIZED, {})
        }
        const subject     = formData.get('subject') as string
        const description = formData.get('description') as string
        const priority    = formData.get('priority') as TicketPriority

        const _data = { subject, description, priority, user: { connect: { id: user.id }} }

        if (!subject || !description || !priority) {
            SystemLogger.sentryLogEvent(transl('error.missing_field'), MODULE, _data, 'warning')
            return SystemLogger.response(false, transl('error.missing_field'), CODE.BAD_REQUEST, {})
        }

        const ticket   = await prisma.ticket.create({ data: _data })

        const _message = transl('success.created_default', { value: MODULE, id: ticket.id })
        SystemLogger.sentryLogEvent(_message)

        revalidatePath(PATH_DIR.TICKET.root)
        return SystemLogger.response(true, transl('success.created'), CODE.CREATED, { subject, description, priority })
    } catch (error: unknown) {
        const _errorMessage = transl('error.create_ticket', { error: (error as AppError).message })
        SystemLogger.sentryLogEvent(_errorMessage, MODULE, { formData: Object.fromEntries(formData.entries()) }, 'error', error)
        return SystemLogger.response(false, _errorMessage, CODE.BAD_REQUEST, {})
    }
}

export async function getTickets({ query, limit = GLOBAL.LIMIT.PAGE_SIZE, page, category, sort }:AppTicketsAction<number>) {
    try {
        const queryFilter: Prisma.TicketWhereInput = query && query       !== KEY.ALL ? ({ subject: { contains: query, mode: 'insensitive' } }) : {}
        const categoryFilter                       = category && category !== KEY.ALL ? { category: { equals: category } } : {}
        const tickets                              = await prisma.ticket.findMany({
          where: { ...queryFilter, ...categoryFilter },
          orderBy:
            sort === 'oldest'
              ? { createdAt: 'asc' }
              : sort === 'newest'
                ? { createdAt: 'desc' }
                : sort === 'priority'
                  ? { priority: 'desc' }
                  : { createdAt: 'desc' },
          skip: (page - 1) * limit,
          take: limit
        })
        const count    = await prisma.ticket.count({ where: { ...queryFilter } })

        const _message = transl('success.fetched_default', { value: MODULE, count:tickets.length })
        SystemLogger.sentryLogEvent(_message, MODULE, { count: tickets.length }, 'info')

        const summary = { data: tickets, totalPages: Math.ceil(count/limit) }
        return summary
    } catch (error) {
        const _errorMessage = transl(`error.failed_fetch_default`, { value: MODULE })
        SystemLogger.sentryLogEvent(_errorMessage, MODULE, {}, 'error', error)
        return { data: [], totalPages: 0 }
    }
}

export async function getTicketById(ticketId: number) {
  try {
    const ticket = await prisma.ticket.findFirst({ where: { id: ticketId } })

    if (!ticket) {
        SystemLogger.sentryLogEvent(transl('error.not_found_default', { value: MODULE }), MODULE, { ticket: ticketId }, 'warning')
    }

    return formatToPlainObject(ticket)
  } catch (error: unknown) {
    const _errorMessage = transl(`error.failed_fetch_default`, { value: MODULE })
    SystemLogger.sentryLogEvent(_errorMessage, MODULE, {}, 'error', error)
    return null
  }
}

export async function updateTicketStatus(ticketId: number, status: TicketStatus) {
  try {
    const ticket = await prisma.ticket.findUnique({ where: { id: ticketId }, include: { user: { select: { id: true, role: true }} }})
    if (!ticket) {
      const _errorMessage = transl('error.not_found_default', { value: 'ticket' })
      SystemLogger.sentryLogEvent(_errorMessage, MODULE, {}, 'warning')
      return SystemLogger.response(false, _errorMessage, CODE.NOT_FOUND, {})
    }

    const user   = await getSession()
    if (user?.role !== 'admin' && user?.id !== ticket.userId) {
      SystemLogger.sentryLogEvent(transl('error.unauthorized'), MODULE, { user }, 'warning')
      return SystemLogger.response(false, transl('error.unauthorized_user'), CODE.UNAUTHORIZED, { user })
    }

    await prisma.ticket.update({ where: { id: ticketId }, data: { status }})
    revalidatePath(PATH_DIR.TICKET.id(ticketId))

    return SystemLogger.response(true, transl('success.updated'), CODE.OK, { ticket })
  } catch (error) {
      const _errorMessage = transl(`error.unexpected_error`, { value: MODULE })
      SystemLogger.sentryLogEvent(_errorMessage, MODULE, {}, 'error', error)
      return SystemLogger.response(false, _errorMessage, CODE.INTERNAL_SERVER_ERROR, {})
  }
}

export async function closeTicket(prevState: AppResponse, formData: FormData): Promise<AppResponse> {
  try {
    const ticketId = Number(formData.get('ticketId'))

    if (!ticketId) {
      const _errorMessage =  transl('error.validation_required_default', { field: 'ticketId' })
      SystemLogger.sentryLogEvent(_errorMessage, MODULE, {}, 'warning')
      return SystemLogger.response(false, _errorMessage, CODE.BAD_REQUEST, {})
    }

    const user = await getSession()

    if (!user) {
      const _errorMessage = transl('error.unauthorized')
      SystemLogger.sentryLogEvent(_errorMessage, MODULE, {}, 'warning')
      return SystemLogger.response(false, _errorMessage, CODE.UNAUTHORIZED, {})
    }

    const ticket = await prisma.ticket.findUnique({ where: { id: ticketId }})

    if (!ticket || ticket.userId !== user.id || user.role !== 'admin') {
      const _errorMessage = transl('error.unauthorized_ticket_close')
      SystemLogger.sentryLogEvent(_errorMessage, MODULE, { ticketId, userId: user.id }, 'warning')
      return SystemLogger.response(false, transl('error.unauthorized_user'), CODE.UNAUTHORIZED, {})
    }

    await prisma.ticket.update({ where: { id: ticketId }, data: { status: 'CLOSED' }})
    revalidatePath(PATH_DIR.TICKET.root)
    revalidatePath(PATH_DIR.TICKET.id(ticketId))

    return SystemLogger.response(true, transl('success.ticket_closed'), CODE.OK, {})
  } catch (error) {
    const _errorMessage = transl('error.error_close_ticket')
    SystemLogger.sentryLogEvent(_errorMessage, MODULE, {}, 'error', error)
    return SystemLogger.response(false, _errorMessage, CODE.BAD_REQUEST, {})
  }
}