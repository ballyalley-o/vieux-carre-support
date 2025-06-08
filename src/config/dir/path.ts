import { combine, formatTicketId } from "lib/utility"

const HOME   = '/'
const TICKET = 'ticket'
const NEW    = 'new'

export const _base = process.env.NEXT_PUBLIC_SERVER_URL

export const PATH_DIR = {
  HOME: HOME,
  TICKET: {
    root: combine(TICKET),
    new : combine(TICKET, NEW),
    id  : (id: number) => combine(TICKET, formatTicketId(id))
  }
}