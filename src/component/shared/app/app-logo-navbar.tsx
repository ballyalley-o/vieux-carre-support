import { ASSET_DIR, PATH_DIR } from 'vcs.dir'
import Link from 'next/link'
import Image from 'next/image'

const AppLogoNavbar = () => {
    return (
      <div className={'flex flex-row items-center'}>
        <div className={'logo-navbar'}>
          <Link href={PATH_DIR.MAIN}>
            <Image src={ASSET_DIR.LOGO.svg} alt={'logo'} fill priority style={{ objectFit: 'contain' }} />
          </Link>
        </div>
      </div>
    )
}

export default AppLogoNavbar