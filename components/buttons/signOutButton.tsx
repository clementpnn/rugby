'use client'

import { signOut } from 'next-auth/react'

import Button from './button'

const SignOutButton = () => {
  return (
    <Button variant='link' onClick={() => signOut()}>sign out</Button>
  )
}

export default SignOutButton
