import { PATH_DIR } from 'vcs.dir'
import Link from 'next/link'
import { getTickets } from "action/ticket.action"
import { FaCircle } from 'react-icons/fa'
import { BackButton } from 'component/shared/button'
import { Pagination } from 'component/shared/pagination'
import { Card } from 'component/shared/card'
import { transl, formatText, cn } from "lib/utility"

interface TicketsPageProps {
    searchParams: Promise<AppTicketsAction<string>>
}

const TicketsPage = async ({ searchParams }: TicketsPageProps) => {
    const { page, query, category } = await searchParams
    const tickets                   = await getTickets({ query, page: Number(page) || 1, category })
    return (
      <div className={'h-screen p-8 overflow-y-auto flex flex-col'}>
        <div className={'flex-none top-8 sticky z-10'}>
            <h1 className={cn('text-3xl font-bold text-vcsblue mb-8 text-center md:text-left')}>{transl('support_ticket.plural')}</h1>
            <BackButton />
        </div>
        <div className={'flex-1 overflow-y-auto p-8'}>
          {tickets.totalPages === 0 ? (
            <p className={'text-center text-gray-500'}>{transl('no_ticket.label')}</p>
          ) : (
            <div className={'space-y-4 max-w-3xl mx-auto'}>
              {tickets.data.map((ticket, _i) => (
                <Card key={_i} title={ticket.subject} icon={<div className={'align-middle items-center-safe flex gap-2'}><FaCircle className={cn(`text-priority-${formatText(ticket.priority, 'lowercase')}`)}/> <span>{formatText(ticket.priority, 'capitalize')}</span></div>}>
                    <Link href={PATH_DIR.TICKET.id(ticket.id)} className={'inline-block mt-2 bg-blue-600 text-white text-sm px-3 py-1 rounded-sm hover:bg-blue-700 transition text-center'}>
                        {transl('view_ticket.label')}
                    </Link>
                </Card>
              ))}
            </div>
          )}
        </div>
        <div className={'mt-5 flex justify-end'}>
        <Pagination page={page} totalPages={tickets.totalPages} />
        </div>
      </div>
    )
}

export default TicketsPage