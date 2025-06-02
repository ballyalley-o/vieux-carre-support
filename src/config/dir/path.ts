import { GLOBAL } from 'vcs'
import { combine } from "lib/utility"

const TICKET = 'ticket'
const NEW    = 'new'

export const _base = GLOBAL.SERVER_URL

export const PATH_DIR = {
  TICKET: {
    root: combine(TICKET),
    new : combine(TICKET, NEW)
  }
}