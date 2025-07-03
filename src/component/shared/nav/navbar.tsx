import { auth } from 'vieux-carre.authenticate'
import { AppLogoNavbar } from 'component/shared/app'
import { NavToolbar } from 'component/shared/nav'

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