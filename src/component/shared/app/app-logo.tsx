import Image from 'next/image'
import { GLOBAL } from 'vcs'
import { ASSET_DIR } from 'vcs.dir'

const AppLogo = () => {
    return (
        <div className={'flex flex-row items-center p-5'}>
            <div className={'logo-home'}>
            <Image src={ASSET_DIR.LOGO.svg} alt="logo" fill priority style={{ objectFit: 'contain' }} />
            </div>
            <span className={'ml-3 text-lg text-left'}>
                <p className={'text-2xl font-bold'}>{GLOBAL.APP_NAME}</p>
                <p className={'text-md'}>{GLOBAL.APP_DESCRIPTION}</p>
            </span>
        </div>
    );
}

export default AppLogo