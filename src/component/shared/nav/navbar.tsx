import { PATH_DIR } from 'vcs.dir'
import { getSession } from 'lib/session'
import { AppLogoNavbar } from 'component/shared/app'
import { Button, SignOutButton } from 'component/shared/button'
import { transl } from 'lib/utility'
import { Fragment } from 'react'

const Navbar = async () => {
  const user = await getSession()
    return (
      <nav className={'bg-gray-200 px-6 py-4 flex justify-between items-center'}>
        <div>
          <AppLogoNavbar />
        </div>
        <div className={'flex items-center space-x-4'}>
         {!user ? (
            <Button link href={PATH_DIR.AUTH.sign_in} variant={'primary'} className={'hover:bg-gray-300 text-white transition'} label={transl('sign_in.label')} />
            ) : (
            <Fragment>
              <Button link href={PATH_DIR.TICKET.new} variant={'transparent'} className={'hover:bg-gray-300 text-gray-700 transition'} label={<div className={'flex items-center gap-2 justify-center'}><span className={'icon--plus'}></span><p className={'hidden md:block'}>{transl('new_ticket.label')}</p></div>} />
              <Button link href={PATH_DIR.TICKET.root} variant={'transparent'} className={'hover:bg-gray-300 text-gray-700 transition'} label={<div className={'flex items-center gap-2 justify-center'}><span className={'icon--tickets-solid'}></span><p className={'hidden md:block'}>{transl('my_ticket.plural')}</p></div>} />
              <SignOutButton />
            </Fragment>
         )}
        </div>
      </nav>
    )
}

export default Navbar