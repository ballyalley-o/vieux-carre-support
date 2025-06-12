'use client'

import { useActionState, useEffect } from "react"
import { PATH_DIR } from 'vcs.dir'
import { useRouter } from "next/navigation"
import { signOut } from "action/auth.action"
import { toast } from "sonner"
import { PiSignOutBold } from 'react-icons/pi'
import { Button } from 'component/shared/button'
import { RESPONSE } from "lib/constant"
import { transl } from "lib/utility"

const SignOutButton = () => {
    const router = useRouter()
    const [state, formAction] = useActionState(signOut, RESPONSE.DEFAULT)

    useEffect(() => {
        if (state.success) {
            toast.success(transl('success.signed_out'))
            router.push(PATH_DIR.AUTH.sign_in)
        } else if (state.message) {
            toast.error(state.message)
        }
    }, [state, router])
    return (
      <form action={formAction}>
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