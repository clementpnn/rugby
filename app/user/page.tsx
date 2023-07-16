import Link from 'next/link'

import Button from '@/components/buttons/button'
import getCurrentUser from '@/actions/getCurrentUser'

const page = async () => {
  const currentUser = await getCurrentUser()

  if ( !currentUser || currentUser.role !== 'USER' ) {
    return (
      <p>not authorized</p>
    )
  }
  return (
    <>
      <Link href={'user/dashboard'}><Button variant='link'>dashboard</Button></Link>
    </>
  )
}

export default page