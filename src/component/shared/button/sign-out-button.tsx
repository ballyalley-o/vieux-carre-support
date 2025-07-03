'use client'

import { signOutUser } from 'action/auth.action'
import { PiSignOutBold } from 'react-icons/pi'
import { Button } from 'component/shared/button'
import { transl } from "lib/utility"

const SignOutButton = () => {
    return (
      <form action={signOutUser}>
        <Button
          type={'submit'}
          variant={'desctructive'}
          className={'text-white transition'}
          label={
            <div className={'flex items-center justify-center'}>
              <PiSignOutBold />
              <p className={'text-sm md:text-md hidden md:block'}>{transl('sign_out.label')}</p>
            </div>
          }
        />
      </form>
    )
}

export default SignOutButton