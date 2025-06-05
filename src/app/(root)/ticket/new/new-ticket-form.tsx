'use client'

import { JSX, useActionState, useState } from "react"
import { useFormStatus } from "react-dom"
import { TicketPriority } from 'generated/prisma'
import { createTicket } from "action/ticket.action"
import { FaCircle } from "react-icons/fa"
import { EllipsisLoader } from 'component/shared/loader'
import { FormSelect } from 'component/shared/form'
import { RESPONSE } from "lib/constant"
import { cn, delay, transl } from 'lib/utility'

interface NewTicketFormProps {
  action: typeof createTicket
}

type PriorityKeyType = 'low' | 'medium' | 'high'
type PriortySelectType = { id: number; name: PriorityKeyType; color: string; value: TicketPriority; icon: JSX.Element }[]

const NewTicketForm = ({ action }: NewTicketFormProps) => {
    const [selectedPriority, setSelectedPriority] = useState<PriorityKeyType>('low')
    const [selectOpen, setSelectOpen]             = useState(false)
    const [state, formAction]                     = useActionState(action, RESPONSE.DEFAULT)
    const { pending }                             = useFormStatus()

    const priorityOptions: PriortySelectType = [
      { id: 0, name: 'low', color: 'text-priority-low', value: 'LOW', icon: <FaCircle className={cn(`text-lg`, `text-priority-low`)} /> },
      { id: 1, name: 'medium', color: 'text-priority-medium', value: 'MEDIUM', icon: <FaCircle className={cn(`text-xs`, `text-priority-medium`)} /> },
      { id: 2, name: 'high', color: 'text-priority-high', value: 'HIGH', icon: <FaCircle className={cn(`text-lg`, `text-priority-high`)} /> }
    ]

    const handleFormAction = async (formData: FormData) => {
      await delay(500)
      await formAction(formData)
    }
    return (
      <div
        className={cn(
          'w-auto md:w-[500px] max-w-lg shadow-md rounded-sm p-8 transition-colors duration-300 ease-in-out ',
          selectOpen ? 'bg-blue-100' : 'bg-blue-50'
        )}>
        <h1 className={'text-2xl font-bold mb-6 text-center text-black'}>{transl('submit_support_ticket.label')}</h1>
        {state.message && !state.success && <p className={'text-red-500 mb-4 text-center'}>{state.message}</p>}
        <form action={handleFormAction} className={'space-y-4 text-gray-700'}>
          <input className={'w-full input-default'} type="text" name="subject" placeholder={transl('subject.label')} />
          <textarea className={'resize-none w-full input-default'} name="description" placeholder={transl('issue.placeholder')} rows={4} />
          <FormSelect
            name={'priority'}
            label={transl('priority.label')}
            options={priorityOptions}
            defaultValue={'LOW'}
            value={priorityOptions.find((p) => p.name === selectedPriority) || null}
            onChange={(option) => setSelectedPriority(option.name)}
            getValue={(option) => option.value}
            getIcon={(option) => option.icon}
            onToggle={setSelectOpen}
            renderList={(options, onSelect) => (
              <ul className="bg-blue-50 rounded-sm shadow-2xl">
                {options.map((option) => (
                  <li key={option.id} className="px-4 py-2 hover:bg-blue-200 cursor-pointer flex items-center gap-2" onClick={() => onSelect(option)}>
                    {option.icon}
                    {transl(`priority.${option.name}` as const)}
                  </li>
                ))}
              </ul>
            )}
          />
          {/* div className="relative">
            <label className={'text-md py-4 mx-2 font-semibold'}>{'Priority'}</label>
            <button type="button" className={"w-full border p-3 input-default flex justify-between items-center"} onClick={() => setShowDropdown(!showDropdown)}>
              <span className={"flex items-center gap-2"}>
                <FaCircle className={cn(`text-xs`, `text-priority-${selectedPriority}`)} />
                {transl(`priority.${selectedPriority}` as const)}
              </span>
              {dropdownIcon}
            </button>
            {showDropdown && (
              <ul className={"absolute z-10 w-full bg-blue-50 mt-1 rounded-sm shadow-2xl"}>
                {priority.map(({ id, name, color }) => (
                  <li key={id} className={"px-4 py-2 hover:bg-blue-200 cursor-pointer flex items-center gap-2"} onClick={() => { setSelectedPriority(name); setShowDropdown(false);  }}>
                    <FaCircle className={cn(`text-xs`, color)} />
                    {transl(`priority.${name}` as const)}
                  </li>
                ))}
              </ul>
            )}
            <input type="hidden" name="priority" value={formatText(selectedPriority, 'uppercase')} />
          </div> */}
          <button
            className={
              'w-full bg-vcsblue text-white p-3 rounded hover:bg-blue-900 transition disabled:opacity-50 cursor-pointer hover:shadow-sm shadow-lg'
            }
            type={'submit'}>
            {pending ? <EllipsisLoader /> : transl('submit.label')}
          </button>
        </form>
      </div>
    )
}

export default NewTicketForm