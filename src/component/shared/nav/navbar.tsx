import { AppLogoNavbar } from 'component/shared/app'
import { NavToolbar } from 'component/shared/nav'
import { getSession } from 'lib/session'

const Navbar = async () => {
  const user = await getSession()
  console.log('user in navbar: ', user)
    return (
      <nav className={'bg-gray-200 px-6 py-4 flex justify-between items-center'}>
        <AppLogoNavbar />
        <NavToolbar user={user} />
      </nav>
    )
}

export default Navbar