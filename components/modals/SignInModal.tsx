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

const SignInModal: React.FC<SignInModalProperties> = ({ currentUser }) => {
  const router = useRouter()
  const session = useSession()
  const pathname = usePathname()

  useEffect(() => {
    if (session?.status === 'authenticated') {
      if (currentUser?.role === 'USER') {
        router.push('/userDashboard')
      }

      if (currentUser?.role === 'ADMIN') {
        router.push('/adminDashboard')
      }

      if (currentUser?.role === 'DEV') {
        router.push('/adminDashboard')
      }
    }
  }, [session?.status,currentUser?.role, router])

  const { step } = useStep()

  let bodyContent = (
    <div>Loading...</div>
  )

  if (step === STEPS.SIGNIN && pathname === '/adminRegister') {
    bodyContent = (
      <AdminForm />
    )
  }

  if (step === STEPS.SIGNIN && pathname === '/') {
    bodyContent = (
      <LoginForm />
    )
  }

  if (step === STEPS.VERIFICATION) {
    bodyContent = (
      <MFAForm />
    )
  }

  return (
    bodyContent
  )
}

export default SignInModal