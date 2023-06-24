'use client'

import { useRouter, usePathname } from 'next/navigation'
import { useEffect } from 'react'
import { useSession } from 'next-auth/react'

import AdminRegisterForm from '../forms/AdminRegisterForm'
import useStep, { STEPS } from '@/hooks/useStep'
import { User } from '@prisma/client'
import LoginForm from '../forms/LoginForm'
import MFAForm from '../forms/MFAForm'

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

  const { step, setStep } = useStep()
  
  let bodyContent = (
    <div>Loading...</div>
  )

  if (step === STEPS.SIGNIN && pathname === '/adminRegister') {
    bodyContent = (
      <AdminRegisterForm />
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