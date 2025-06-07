'use client'

import Image from 'next/image'
import { Button } from 'component/shared/button'
import { ASSET_DIR } from 'vcs.dir'
import { CODE } from 'lib/constant'
import { transl } from 'lib/utility'

const NotFoundPage = () => {
  const handleNavigateHome = () => (window.location.href = '/')
  return (
    <div className="flex flex-col items-center justify-center min-h-screen shadow-none">
      <Image src={ASSET_DIR.LOGO.svg} width={48} height={48} alt="logo" priority />
      <div className="p-6 w-1/3 rounded-sm text-center">
        <h4 className="text-lg mt-2">{CODE.NOT_FOUND}</h4>
        <h1 className="text-3xl font-bold mb-4">{transl('http_response.404.label')}</h1>
        <h6 className="mt-8">{transl('http_response.404.description')}</h6>
        <Button variant={'outline'} label={transl('go_back')} onClick={handleNavigateHome} className={'my-5'} />
      </div>
    </div>
  )
}

export default NotFoundPage
