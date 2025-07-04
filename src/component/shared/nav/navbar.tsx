import { AppLogoNavbar } from 'component/shared/app'
import { NavToolbar } from 'component/shared/nav'
// import { getSession } from 'lib/session'
import { auth } from 'vieux-carre.authenticate'

const Navbar = async () => {
  const session = await auth()

    return (
      <nav className={'bg-gray-200 px-6 py-4 flex justify-between items-center'}>
        <AppLogoNavbar />
        <NavToolbar session={session} />
      </nav>
    )
}

export default Navbar