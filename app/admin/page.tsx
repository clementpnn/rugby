import getCurrentUser from '@/actions/getCurrentUser'
import Button from '@/components/buttons/button'
import SignOutButton from '@/components/buttons/signOutButton'
import Link from 'next/link'

const page = async () => {
  const currentUser = await getCurrentUser()

  if ( !currentUser || currentUser.role !== 'ADMIN' ) {
    return (
      <p>not authorized</p>
    )
  }

  return (
    <>
      <h1>Admin : {currentUser.firstName} {currentUser.lastName}</h1>
      <SignOutButton />
      <Link href={'admin/create/match'}><Button variant='link'>create match</Button></Link>
      <Link href={'admin/create/stadium'}><Button variant='link'>create stadium</Button></Link>
      <Link href={'admin/import'}><Button variant='link'>import</Button></Link>
      <Link href={'admin/match'}><Button variant='link'>match</Button></Link>
      <Link href={'admin/sad'}><Button variant='link'>sad</Button></Link>
    </>
  )
}

export default page