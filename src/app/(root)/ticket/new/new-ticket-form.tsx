'use client'

import { Fragment, JSX, useActionState, useState, useEffect } from "react"
import { PATH_DIR } from "vcs.dir"
import { useRouter } from 'next/navigation'
import { TicketPriority } from 'vieux-carre.authenticate'
import { createTicket } from "action/ticket.action"
import { toast } from "sonner"
import { FaCircle } from "react-icons/fa"
import { FormSelect } from 'component/shared/form'
import { Button } from 'component/shared/button'
import { RESPONSE } from "lib/constant"
import { cn, transl } from 'lib/utility'

interface NewTicketFormProps {
  action: typeof createTicket
}

type PriorityKeyType   = 'low' | 'medium' | 'high'
type PriortySelectType = { id: number; name: PriorityKeyType; color: string; value: TicketPriority; icon: JSX.Element }[]

const NewTicketForm = ({ action }: NewTicketFormProps) => {
    const [selectedPriority, setSelectedPriority] = useState<PriorityKeyType>('low')
    const [selectOpen, setSelectOpen]             = useState(false)
    const [state, formAction]                     = useActionState(action, RESPONSE.DEFAULT)
    const router                                  = useRouter()

    useEffect(() => {
      if (state.success) {
        toast.success(transl('success.ticket_submitted'))
        router.push(PATH_DIR.TICKET.root)
      }
    }, [state.success, router])

    const priorityOptions: PriortySelectType = [
      { id: 0, name: 'low', color: 'text-priority-low', value: 'LOW', icon: <FaCircle className={cn(`text-lg`, `text-priority-low`)} /> },
      { id: 1, name: 'medium', color: 'text-priority-medium', value: 'MEDIUM', icon: <FaCircle className={cn(`text-xs`, `text-priority-medium`)} /> },
      { id: 2, name: 'high', color: 'text-priority-high', value: 'HIGH', icon: <FaCircle className={cn(`text-lg`, `text-priority-high`)} /> }
    ]

    const renderStateMessage = state.message && !state.success && <p className={'text-red-500 mb-4 text-center'}>{state.message}</p>
    return (
      <div className={cn('w-auto md:w-[500px] max-w-lg shadow-md rounded-sm p-8 transition-colors duration-300 ease-in-out ', selectOpen ? 'bg-blue-100' : 'bg-blue-50')}>
        <h1 className={'text-2xl font-bold mb-6 text-center text-black'}>{transl('submit_support_ticket.label')}</h1>
        <form action={formAction} className={'space-y-4 text-gray-700'}>
          {renderStateMessage}
          <input className={'w-full input-default'} type="text" name={"subject"} placeholder={transl('subject.label')} />
          <textarea className={'resize-none w-full input-default'} name={"description"} placeholder={transl('issue.placeholder')} rows={4} />
          <FormSelect
            name={'priority'}
            label={transl('priority.label')}
            options={priorityOptions}
            defaultValue={TicketPriority.LOW}
            value={priorityOptions.find((p) => p.name === selectedPriority) || null}
            onChange={(option) => setSelectedPriority(option.name)}
            getValue={(option) => option.value}
            getIcon={(option) => option.icon}
            onToggle={setSelectOpen}
            selectedLabel={
            <Fragment>
                <FaCircle className={cn(`text-xs`, `text-priority-${selectedPriority}`)} />
                {transl(`priority.${selectedPriority}` as const)}
            </Fragment>}
            renderList={(options, onSelect) => (
              <ul className={"bg-blue-50 rounded-sm shadow-2xl"}>
                {options.map((option) => (
                  <li key={option.id} className={"px-4 py-2 hover:bg-blue-200 cursor-pointer flex items-center gap-2"} onClick={() => onSelect(option)}>
                    {option.icon}
                    {transl(`priority.${option.name}` as const)}
                  </li>
                ))}
              </ul>
            )}
          />
          <Button variant={'default'} label={transl('submit.label')} fullWidth />
        </form>
      </div>
    )
}

export default NewTicketForm