'use client'

import { signOut } from 'next-auth/react'

const Out = () => {
  return (
    <div onClick={() => signOut()} className='cursor-pointer'>sign out</div>
  )
}

export default Out