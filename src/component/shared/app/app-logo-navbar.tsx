import { GLOBAL } from 'vcs'
import { ASSET_DIR, PATH_DIR } from 'vcs.dir'
import Link from 'next/link'
import Image from 'next/image'

const AppLogoNavbar = () => {
    return (
      <div className={'flex flex-row items-center'}>
        <div className={'logo-navbar'}>
          <Link href={PATH_DIR.HOME}>
            <Image src={ASSET_DIR.LOGO.svg} alt={"logo"} fill priority objectFit={'contain'} />
          </Link>
        </div>
        <span className={'ml-3 text-lg text-left'}>
          <p className={'text-md font-bold'}>{GLOBAL.APP_NAME}</p>
        </span>
      </div>
    )
}

export default AppLogoNavbar