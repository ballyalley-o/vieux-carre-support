'use client'

import { Fragment, useState, useEffect, useRef } from 'react'
import { TicketStatus } from '@prisma/client'
import { updateTicketStatus } from 'action/ticket.action'
import { toast } from 'sonner'
import { FaChevronDown } from 'react-icons/fa'
import { Button } from 'component/shared/button'
import { cn, formatText, transl } from 'lib/utility'

interface TicketStatusSelectorProps {
  ticketId      : number
  currentStatus : TicketStatus
  userRole     ?: UserRoleType
}

function TicketStatusSelector({ ticketId, currentStatus, userRole }: TicketStatusSelectorProps) {
  const [dropdown, setDropdown] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const isResolved = currentStatus === TicketStatus.RESOLVED
  useEffect(() => {
    function handleClickOutSide(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdown(false)
      }
    }

    if (dropdown) {
      document.addEventListener('mousedown', handleClickOutSide)
    } else {
      document.addEventListener('mousedown', handleClickOutSide)
    }
  }, [])

  if (userRole !== 'admin') {
    return (
      <div className={''}>
        <h2 className={'text-lg font-semibold mb-2'}>{transl('status.label')}</h2>
        <p className={cn('text-xl font-bold', `text-priority-${(formatText(currentStatus, 'lowercase'), isResolved && 'text-purple-600')}`)}>
          {formatText(currentStatus, 'capitalize')}
        </p>
      </div>
    )
  }

  const handleStatusChange = async (newStatus: TicketStatus) => {
      setDropdown(false)
      try {
        await updateTicketStatus(ticketId, newStatus)
      } catch (error:unknown) {
        toast.error((error as Error).message)
        console.error('Status update failed:', error)
      }
  }

  const statusOptions: { icon: string, status: TicketStatus }[] = [{ icon: 'icon-outline--open', status: 'OPEN' }, { icon: 'icon-outline--pending', status: 'PENDING' }, { icon:'icon-outline--resolved', status: 'RESOLVED'}, { icon: 'icon-outline--closed', status: 'CLOSED'}]

  return (
    <div ref={dropdownRef} className={'inline-block bg-gray-200 border-gray-200 border-4'}>
      <div className={'relative flex items-center gap-1 border-blue-200'}>
        <Button
          variant={'transparent'}
          className={'flex items-center gap-1 bg-blue-50 border-blue-200 px-3 py-1 text-sm hover:bg-gray-200 rounded-sm'}
          label={
            <Fragment>
              <div className={'flex items-center gap-2'}>
                <span className={cn(`icon-outline--${currentStatus.toLowerCase()}`)}></span>
                <p className={cn('text-lg font-semibold', isResolved && 'text-purple-600')}>{formatText(currentStatus, 'capitalize')}</p>
              </div>
            </Fragment>
          }
        />

        <Button
          variant={'transparent'}
          className={'flex items-center gap-1 bg-blue-50 border-blue-200 px-3 py-1 text-sm hover:bg-gray-200 rounded-sm'}
          label={
            <Fragment>
              <FaChevronDown />
            </Fragment>
          }
          onClick={() => setDropdown(!dropdown)}
        />

        {dropdown && (
          <div
            className={
              'absolute left-full top-0 ml-2 z-10 mt-1 bg-blue-50 w-52 bg-gradient-to-br border border-gray-300 shadow-md rounded-md spacing-2 p-2'
            }>
            {statusOptions.map(({ status, icon }, _i) => (
              <button
                key={_i}
                className={cn(
                  'w-full text-left p-2 text-sm hover:bg-blue-100 cursor-pointer border-y-blue-50 flex justify-between',
                  status === currentStatus && 'font-bold text-vcsblue bg-blue-100/20'
                )}
                onClick={() => handleStatusChange(status)}
                disabled={status === currentStatus}>
                <div className={'flex items-center gap-2'}>
                  <span className={icon}></span>
                  {formatText(status, 'capitalize')}
                </div>
                {status === currentStatus && <span className={'icon--check'}></span>}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}


export default TicketStatusSelector


