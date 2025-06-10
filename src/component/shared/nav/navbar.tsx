import { getSession } from 'lib/session'
import { AppLogoNavbar } from 'component/shared/app'
import { NavToolbar } from 'component/shared/nav'

const Navbar = async () => {
  const user = await getSession()
    return (
      <nav className={'bg-gray-200 px-6 py-4 flex justify-between items-center'}>
        <AppLogoNavbar />
        <NavToolbar user={user} />
      </nav>
    )
}

export default Navbar