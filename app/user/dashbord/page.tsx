import { signOut } from 'next-auth/react'

const page = () => {
  return (
    <div className='cursor-pointer' onClick={() => signOut()}>sign out</div>
  )
}

export default page