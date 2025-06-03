'use server'

import { CODE } from "lib/constant"
import { transl } from "lib/utility"
import { SystemLogger } from "lib/utility/app-logger"


export async function createTicket(formData: FormData) {
    const subject     = formData.get('subject')
    const description = formData.get('description')
    const priority    = formData.get('priority')

    return SystemLogger.response(transl('success.created'), CODE.OK, 'createTicket', '', { subject, description, priority })
}