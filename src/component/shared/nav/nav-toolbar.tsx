'use client'

import { Fragment } from 'react'
import { PATH_DIR } from 'vcs.dir'
import { usePathname } from 'next/navigation'
import { Button, SignOutButton } from 'component/shared/button'
import { transl } from 'lib/utility'

type NavToolbarProps = {
  user: UserSession
}
const NavToolbar = ({ user }: NavToolbarProps) => {
    const pathname = usePathname()
    const noShow = pathname !== '/sign-in' && pathname !== '/sign-up'
    return (
         <div className={'flex items-center space-x-4'}>
         {!user ? (
            noShow && <Button link href={PATH_DIR.AUTH.sign_in} variant={'primary'} className={'text-white transition'} label={transl('sign_in.label')} />
            ) : (
            <Fragment>
              <Button link href={PATH_DIR.TICKET.new} variant={'transparent'} className={'hover:bg-gray-300 text-gray-700 transition'} label={<div className={'flex items-center gap-2 justify-center'}><span className={'icon--plus'}></span><p className={'hidden md:block'}>{transl('new_ticket.label')}</p></div>} />
              <Button link href={PATH_DIR.TICKET.root} variant={'transparent'} className={'hover:bg-gray-300 text-gray-700 transition'} label={<div className={'flex items-center gap-2 justify-center'}><span className={'icon--tickets-solid'}></span><p className={'hidden md:block'}>{transl('my_ticket.plural')}</p></div>} />
              <SignOutButton />
            </Fragment>
         )}
        </div>
    );
}

export default NavToolbar