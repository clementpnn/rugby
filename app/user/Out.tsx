'use client'

import { signOut } from 'next-auth/react'

const Out = () => {
  return (
    <div className='cursor-pointer' onClick={() => signOut()}>sign out</div>
  )
}

export default Out