import SignInForm from 'app/(auth)/sign-in/sign-in-form'
import { signInWithCredentials } from 'action/auth.action'

const SignInPage = () => {
    return (
      <div className={'min-h-screen flex items-start md:mt-20 justify-center px-4'}>
        <SignInForm action={signInWithCredentials} />
      </div>
    )
}

export default SignInPage