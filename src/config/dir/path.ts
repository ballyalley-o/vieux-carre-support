import { combine, combineUrl,  formatTicketId } from "lib/utility"

const HOME     = '/'
const TICKET   = 'ticket'
const NEW      = 'new'
const SIGN_IN  = 'sign-in'
const SIGN_UP  = 'sign-up'
const SIGN_OUT = 'sign-out'

export const _base = process.env.NEXT_PUBLIC_SERVER_URL || ''
export const _main = process.env.NEXT_PUBLIC_SERVER_URL_MAIN || ''

export const PATH_DIR = {
  HOME  : HOME,
  MAIN: _main,
  TICKET: {
    root: combine(TICKET),
    new : combine(TICKET, NEW),
    id  : (id: number) => combine(TICKET, formatTicketId(id))
  },
  AUTH: {
    sign_in : combineUrl(_main, SIGN_IN),
    sign_up : combineUrl(_main, SIGN_UP),
    sign_out: combine(SIGN_OUT)
  }
}