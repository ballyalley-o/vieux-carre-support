import { GLOBAL } from 'vcs'
import { ASSET_DIR, PATH_DIR } from 'vcs.dir'
import Link from 'next/link'
import Image from 'next/image'
import { transl } from 'lib/utility'

const AppLogoNavbar = () => {
    return (
      <div className={'flex flex-row items-center'}>
        <div className={'logo-navbar'}>
          <Link href={PATH_DIR.HOME}>
            <Image src={ASSET_DIR.LOGO.svg} alt={'logo'} fill priority style={{ objectFit: 'contain' }} />
          </Link>
        </div>
        <span className={'ml-3 text-lg text-left'}>
          <p className={'text-sm md:text-md font-bold hidden md:block'}>{GLOBAL.APP_NAME}</p>
          <p className={'text-sm md:text-md font-bold md:hidden'}>{transl('support.label')}</p>
        </span>
      </div>
    )
}

export default AppLogoNavbar