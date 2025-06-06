import { combine } from "lib/utility"

const TICKET = 'ticket'
const NEW    = 'new'

export const _base = process.env.NEXT_PUBLIC_SERVER_URL

export const PATH_DIR = {
  TICKET: {
    root: combine(TICKET),
    new : combine(TICKET, NEW)
  }
}