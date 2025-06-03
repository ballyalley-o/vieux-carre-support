'use client'

import { useState } from "react"
import { FaAngleDown, FaAngleUp, FaCircle } from "react-icons/fa"
import { transl } from 'lib/utility/translate'
import { PRIORITY } from "lib/constant"
import { cn } from "lib/utility"


const NewTicketForm = () => {
    const [selectedPriority, setSelectedPriority] = useState<PriorityKeyType>('low')
    const [showDropdown, setShowDropdown]         = useState(false)
    type  PriorityKeyType                         = 'low' | 'medium' | 'high'
    type  PriortySelectType                       = { id: number; name: PriorityKeyType; color: string, value: PRIORITY }[]
    const priority: PriortySelectType = [
      { id: 0, name: 'low', color: 'text-priority-low', value: PRIORITY.LOW },
      { id: 1, name: 'medium', color: 'text-priority-medium', value: PRIORITY.MEDIUM },
      { id: 2, name: 'high', color: 'text-priority-high', value: PRIORITY.HIGH }
    ]

    const dropdownIcon = showDropdown ?  <FaAngleUp/> : <FaAngleDown/>
    return (
      <div className={'w-auto max-w-md shadow-md bg-blue-50 rounded-sm p-8'}>
        <h1 className={'text-2xl font-bold mb-6 text-center text-black'}>{transl('submit_support_ticket.label')}</h1>
        {/* {state.message && !state.success && <p className="text-red-500 mb-4 text-center">{state.message}</p>} */}
        <form action={''} className={'space-y-4 text-gray-700'}>
          <input className={'w-full input-default'} type="text" name="subject" placeholder={transl('subject.label')} />
          <textarea className={'resize-none w-full input-default'} name="description" placeholder={transl('issue.placeholder')} rows={4} />
          <div className="relative">
            <button type="button" className={"w-full border p-3 input-default flex justify-between items-center"} onClick={() => setShowDropdown(!showDropdown)}>
              <span className={"flex items-center gap-2"}>
                <FaCircle className={cn(`text-xs`, `text-priority-${selectedPriority}`)} />
                {transl(`priority.${selectedPriority}` as const)}
              </span>
              {dropdownIcon}
            </button>
            {showDropdown && (
              <ul className={"absolute z-10 w-full bg-blue-100 mt-1 rounded-sm shadow-2xl"}>
                {priority.map(({ id, name, color }) => (
                  <li key={id} className={"px-4 py-2 hover:bg-blue-200 cursor-pointer flex items-center gap-2"} onClick={() => { setSelectedPriority(name); setShowDropdown(false); }}>
                    <FaCircle className={cn(`text-xs`, color)} />
                    {transl(`priority.${name}` as const)}
                  </li>
                ))}
              </ul>
            )}
            <input type="hidden" name="priority" value={selectedPriority} />
          </div>
          <button className={"w-full bg-vcsblue text-white p-3 rounded hover:bg-blue-900 transition disabled:opacity-50 cursor-pointer hover:shadow-sm shadow-lg"} type={"submit"}>
            {transl('submit.label')}
          </button>
        </form>
      </div>
    )
}

export default NewTicketForm