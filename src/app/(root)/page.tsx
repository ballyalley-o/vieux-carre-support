import Link from 'next/link'
import { PATH_DIR } from 'vcs.dir'
import { AppLogo } from 'component/shared/app'
import { transl } from 'lib/utility'


const HomePage = () => {
  return (
    <main className={'flex flex-col text-center items-center justify-center min-h-screen px-4 gap-y-5'}>
      <div className={'flex flex-col text-center items-center justify-center w-[500px] h-auto px-4 gap-y-5'}>
        {/* <div className={'flex flex-row items-center p-5'}>
          <div className={'logo-home'}>
            <Image src={ASSET_DIR.LOGO.svg} alt="logo" fill priority style={{ objectFit: 'contain' }} />
          </div>
          <span className={'ml-3 text-lg text-left'}>
            <p className={'text-2xl font-bold'}>{GLOBAL.APP_NAME}</p>
            <p className={'text-md'}>{GLOBAL.APP_DESCRIPTION}</p>
          </span>
        </div> */}
        <AppLogo />
        <div className={'flex flex-col md:flex-row gap-4 justify-center w-[350px] animate-slide opacity-0'}>
          <Link
            href={PATH_DIR.TICKET.new}
            className={'bg-vcsblue w-full text-white px-4 py-1.5 rounded-xs shadow-sm hover:bg-blue-800 hover:shadow-lg transition text-sm'}>
            {transl('create_ticket.label')}
          </Link>
          <Link
            href={PATH_DIR.TICKET.root}
            className={
              'bg-vcsblue-light w-full text-black px-4 py-1.5 rounded-xs shadow-sm hover:bg-blue-900 hover:shadow-lg hover:text-white transition text-sm'
            }>
            {transl('your_ticket.plural')}
          </Link>
        </div>
      </div>
    </main>
  )
}

export default HomePage