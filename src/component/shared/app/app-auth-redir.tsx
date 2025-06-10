import { PATH_DIR } from "vcs.dir"
import Link from "next/link"
import { transl } from "lib/utility"
import { RedirType } from './app.types'

interface AppAuthRedir {
  type: RedirType
}

const AppAuthRedir = ({ type }: AppAuthRedir) => {
    return (
      <div className="text-sm text-center text-muted-foreground">
        {transl(type === 'sign-up' ? 'already_have_account.label' : 'dont_have_account.label')}
        <Link href={PATH_DIR.AUTH[type === 'sign-up' ? 'sign_in' : 'sign_up']} target="_self" className={'link font-bold'}>
          &nbsp;{transl(`${type === 'sign-in' ? 'sign_up' : 'sign_in'}.label`)}
        </Link>
      </div>
    )
}

export default AppAuthRedir