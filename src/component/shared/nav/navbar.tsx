import { auth } from 'vieux-carre.authenticate'
import { AppLogoNavbar } from 'component/shared/app'
import { NavToolbar } from 'component/shared/nav'
import { transl } from 'lib/utility'

const Navbar = async () => {
  const session = await auth()

    return (
      <nav className={'bg-gray-200 px-6 py-4 flex justify-between items-center'}>
        <div className={'flex justify-start items-center'}>
          <AppLogoNavbar />
          <h2 className={'text-2xl'}> &nbsp; {transl('support.label')}</h2>
        </div>
        <NavToolbar session={session} />
      </nav>
    )
}

export default Navbar