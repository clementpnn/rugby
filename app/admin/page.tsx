import getCurrentUser from '@/actions/getCurrentUser'
import SignOutButton from '@/components/buttons/signOutButton'

const page = async () => {
  const currentUser = await getCurrentUser()

  if ( !currentUser || currentUser.role !== 'ADMIN' ) {
    return (
      <p>not authorized</p>
    )
  }

  return (
    <>
      <SignOutButton />
    </>
  )
}

export default page