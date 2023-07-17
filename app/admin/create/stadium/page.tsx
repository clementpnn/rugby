import getCurrentUser from '@/actions/getCurrentUser'
import CreateStadium from './create'

const page = async () => {
  const currentUser = await getCurrentUser()

  if ( !currentUser || currentUser.role !== 'ADMIN' ) {
    return (
      <p>not authorized</p>
    )
  }

  return (
    <>
      <CreateStadium />
    </>
  )
}

export default page