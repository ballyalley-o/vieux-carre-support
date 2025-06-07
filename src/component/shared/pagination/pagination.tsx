'use client'

import { Fragment } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md'
import { Button } from 'component/shared/button'
import { transl, formUrlQuery, cn } from 'lib/utility'

interface PaginationProps {
  page         : number | string
  totalPages   : number
  urlParamName?: string
}
const Pagination = ({ page, totalPages, urlParamName }: PaginationProps) => {
  const router       = useRouter()
  const searchParams = useSearchParams()

  const handleClick = (direction: 'prev' | 'next') => {
    const pageValue = direction === 'prev' ? Number(page) - 1 : Number(page) + 1
    const newUrl    = formUrlQuery({ params: searchParams.toString(), key: urlParamName || 'page', value: pageValue.toString() })
    router.push(newUrl)
  }
  return (
    <div className={'flex gap-2'}>
      <Button
        variant={'transparent'}
        label={
          <Fragment>
            <MdKeyboardArrowLeft className={cn('opacity-100 translate-x-[100%] ease-in-out group-hover:translate-x-5 hover:opacity-0', Number(page) < totalPages) ? 'text-3xl' : 'text-4xl'} />
            <p className={"ml-2 absolute right-15 translate-x-[100%] opacity-0 whitespace-nowrap rounded px-2 py-1 text-sm transition-all duration-300 ease-in-out group-hover:translate-x-0 group-hover:opacity-100"}>
              {transl('previous.label')}
            </p>
          </Fragment>
        }
        className={'w-28 px-0 group relative flex text-center justify-center items-center'}
        disabled={Number(page) <= 1}
        onClick={() => handleClick('prev')}
      />
      <Button
        variant={'transparent'}
        label={
          <Fragment>
            <MdKeyboardArrowRight className={cn('opacity-100 translate-x-[-100%] ease-in-out group-hover:translate-x-5 group-hover:opacity-0', Number(page) < totalPages) ? 'text-3xl' : 'text-4xl'} />
            <p className={"ml-2 absolute right-15 translate-x-[-100%] opacity-0 whitespace-nowrap rounded px-2 py-1 text-sm transition-all duration-300 ease-in-out group-hover:translate-x-0 group-hover:opacity-100"}>
              {transl('next.label')}
            </p>
          </Fragment>
        }
        className={'w-28 px-0 group relative flex text-center justify-center items-center'}
        disabled={Number(page) >= totalPages}
        onClick={() => handleClick('next')}></Button>
    </div>
  )
}

export default Pagination
