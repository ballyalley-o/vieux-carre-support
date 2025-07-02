import { PATH_DIR } from "vcs.dir"
import Link from "next/link"
import type { Ticket } from 'vieux-carre.prisma'
import { FaCircle } from 'react-icons/fa'
import { Card } from "component/shared/card"
import { formatTicketId, formatText, transl, cn } from "lib/utility"

interface TicketItemProps {
    ticket: Ticket
}

const TicketItem = ({ ticket }: TicketItemProps) => {
    return (
         <Card status={ticket.status} header={formatTicketId(ticket.id)} title={ticket.subject} icon={<div className={'align-middle items-center-safe flex gap-2'}><FaCircle className={cn(`text-priority-${formatText(ticket.priority, 'lowercase')}`)}/> <span>{formatText(ticket.priority, 'capitalize')}</span></div>}>
            <Link href={PATH_DIR.TICKET.id(ticket.id)} className={'inline-block mt-2 bg-blue-600 text-white text-sm px-3 py-1 rounded-sm hover:bg-blue-700 transition text-center'}>
                {transl('view_ticket.label')}
            </Link>
        </Card>
     );
}

export default TicketItem;