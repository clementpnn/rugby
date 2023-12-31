'use client'

import { useRouter, usePathname } from 'next/navigation'
import { useEffect } from 'react'
import { useSession } from 'next-auth/react'

import useStep, { STEPS } from '@/hooks/useStep'
import { User } from '@prisma/client'
import LoginForm from '../forms/loginForm'
import MFAForm from '../forms/mfaForm'
import AdminForm from '../forms/adminForm'

interface SignInModalProperties {
  currentUser?: User | null
}

const SignInModal: React.FC<SignInModalProperties> = ( { currentUser } ) => {
  const router = useRouter()
  const session = useSession()
  const pathname = usePathname()

  useEffect( () => {
    if ( session?.status === 'authenticated' ) {
      if ( currentUser?.role === 'USER' ) {
        router.push( '/user/planning' )
      }

      if ( currentUser?.role === 'ADMIN' ) {
        router.push( '/admin/match' )
      }
    }
  }, [ session?.status, currentUser?.role, router ] )

  const { step } = useStep()

  let bodyContent = (
    <div>Loading...</div>
  )

  if ( step === STEPS.ONE && pathname === '/adminRegister' ) {
    bodyContent = (
      <AdminForm />
    )
  }

  if ( step === STEPS.ONE && pathname === '/' ) {
    bodyContent = (
      <LoginForm />
    )
  }

  if ( step === STEPS.TWO ) {
    bodyContent = (
      <MFAForm />
    )
  }

  return (
    bodyContent
  )
}

export default SignInModal
