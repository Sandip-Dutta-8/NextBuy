'use client'

import { useFormStatus } from 'react-dom'
import { Button } from '@/components/ui/button'
import { signInWithGoogle } from '@/lib/actions/user.actions'
import Image from 'next/image'
import Google from "../../../public/Google.svg"

export function GoogleSignInForm() {
    const SignInButton = () => {
        const { pending } = useFormStatus()
        return (
            <Button disabled={pending} className='w-full cursor-pointer' variant='outline'>
                <Image src={Google} alt='Google' width={20} height={20}/>{pending ? 'Redirecting to Google...' : 'Sign In with Google'}
            </Button>
        )
    }
    return (
        <form action={signInWithGoogle}>
            <SignInButton />
        </form>
    )
}