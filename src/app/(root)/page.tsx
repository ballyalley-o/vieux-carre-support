import { PATH_DIR } from 'vcs.dir'
import { AppLogo } from 'component/shared/app'
import { transl } from 'lib/utility'
import { Button } from 'component/shared/button'


const HomePage = () => {
  return (
    <main className={'flex flex-col text-center items-center justify-center min-h-screen px-4 gap-y-5'}>
      <div className={'flex flex-col text-center items-center justify-center w-[500px] h-auto px-4 gap-y-5'}>
        <AppLogo />
        <div className={'flex flex-col md:flex-row gap-4 justify-center w-[350px] animate-slide opacity-0'}>
          <Button link href={PATH_DIR.TICKET.new} label={transl('create_ticket.label')} variant={'default'} />
          <Button link href={PATH_DIR.TICKET.root} label={transl('your_ticket.plural')} variant={'secondary'} />
        </div>
      </div>
    </main>
  )
}

export default HomePage