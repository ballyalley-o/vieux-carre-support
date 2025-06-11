import { TicketPriority } from "@prisma/client"
import { FaCircle } from "react-icons/fa"
import { TitleWithIcon } from "component/shared/title"
import { formatText, cn } from "lib/utility"

interface TicketCardTitleProps {
    subject : string
    priority: TicketPriority
}

const TicketCardTitle = ({ subject, priority }: TicketCardTitleProps) => {
    return (
        <TitleWithIcon subject={subject} icon={<FaCircle className={cn(`text-2xl text-priority-${formatText(priority, 'lowercase')}`)} />} />
    )
}

export default TicketCardTitle