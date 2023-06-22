'use client'

import { signOut } from 'next-auth/react'

const SignOutButton = () => {
  return (
    <button className='cursor-pointer bg-blue-500' onClick={() => signOut()} >sign out</button>
  )
}

export default SignOutButton