import { getTickets } from "action/ticket.action"
import { TicketItem } from 'component/module/ticket'
import { BackButton } from 'component/shared/button'
import { Pagination } from 'component/shared/pagination'
import { transl, cn } from "lib/utility"

interface TicketsPageProps {
    searchParams: Promise<AppTicketsAction<string>>
}

const TicketsPage = async ({ searchParams }: TicketsPageProps) => {
    const { page, query, category } = await searchParams
    const rawPage                   = Number(page)
    const currentPage               = isNaN(rawPage) || rawPage < 1 ? 1 : rawPage
    const tickets                   = await getTickets({ query, page: currentPage, category })
    return (
      <div className={'min-h-screen p-8 flex flex-col'}>
        <div className={'flex-none top-8 sticky z-10'}>
            <h1 className={cn('text-3xl font-bold text-vcsblue mb-8 text-center md:text-left')}>{transl('support_ticket.plural')}</h1>
            <BackButton />
        </div>
        <div className={'flex-1 px-8 overflow-y-auto'}>
          {tickets.totalPages === 0 ? (
            <h5 className={'text-center text-gray-200 text-xl font-bold'}>{transl('no_ticket.label')}</h5>
          ) : (
            <div className={'space-y-4 max-w-3xl mx-auto'}>
              {tickets.data.map((ticket, _i) => <TicketItem ticket={ticket} key={_i}/> )}
            </div>
          )}
        </div>
        <div className={'z-20 bottom-8 right-8 sticky flex justify-end-safe'}>
          <Pagination page={Number(page)} totalPages={tickets.totalPages} />
        </div>
      </div>
    )
}

export default TicketsPage