import { PATH_DIR } from 'vcs.dir'
import { AppLogoNavbar } from 'component/shared/app'
import { Button } from 'component/shared/button'
import { transl } from 'lib/utility'

const Navbar = () => {
    return (
      <nav className={'bg-gray-200 px-6 py-4 flex justify-between items-center'}>
        <div>
          <AppLogoNavbar />
        </div>
        <div className={'flex items-center space-x-4'}>
          <Button link href={PATH_DIR.TICKET.new} variant={'transparent'} className={'hover:bg-gray-300 text-gray-700 transition'} label={transl('new_ticket.label')} />
        </div>
      </nav>
    )
}

export default Navbar