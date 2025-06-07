'use client'

import { MdArrowBack } from 'react-icons/md'
import { Button } from 'component/shared/button'

const BackButton = () => {
    const handleNavigate = () => window.location.href = '/'
    return <Button variant={'transparent'} type={'button'} label={<MdArrowBack />} className={'text-xl text-vcsblue'} onClick={handleNavigate} />
}

export default BackButton