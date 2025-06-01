import Image from 'next/image'
import { GLOBAL } from 'vcs'
import { ASSET_DIR } from 'vcs.dir'

const HomePage = () => {
  return (
    <main className={'flex flex-col text-center items-center justify-center min-h-screen px-4'}>
      <Image src={ASSET_DIR.LOGO.svg} alt="logo" fill priority />
      <span className="hidden lg:block ml-3">{GLOBAL.APP_NAME}</span>
    </main>
  )
}

export default HomePage