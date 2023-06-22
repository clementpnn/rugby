// import getCurrentUser from '@/actions/getCurrentUser'

import CSVForm from '@/components/forms/CSVForm'
import { signOut } from 'next-auth/react'

const page = async () => {
//   const currentUser = await getCurrentUser()

  return (
    <>
        <div className='cursor-pointer bg-blue-500' onClick={() => signOut()}>sign out</div>
        <CSVForm />
    </>
  )
}

export default page