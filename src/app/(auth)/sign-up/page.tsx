'use client'

import SignUpForm from 'app/(auth)/sign-up/sign-up-form'
import { signUp } from 'action/auth.action'

const SignUpPage = () => {

    return (
      <div className={'min-h-screen flex items-start md:mt-20 justify-center px-4'}>
        <SignUpForm action={signUp} />
      </div>
    )
}

export default SignUpPage