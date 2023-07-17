import Link from 'next/link'

import Button from '@/components/buttons/button'
import getCurrentUser from '@/actions/getCurrentUser'
import SignOutButton from '@/components/buttons/signOutButton'

const page = async () => {
  const currentUser = await getCurrentUser()

  if ( !currentUser || currentUser.role !== 'USER' ) {
    return (
      <p>not authorized</p>
    )
  }
  return (
    <>
      <h1>User : {currentUser.firstName} {currentUser.lastName}</h1>
      <SignOutButton />
      <Link href={'user/dashboard'}><Button variant='link'>dashboard</Button></Link>
      <Link href={'user/information'}><Button variant='link'>information</Button></Link>
    </>
  )
}

export default page