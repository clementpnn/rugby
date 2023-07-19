import getCurrentUser from '@/actions/getCurrentUser'
import CreateStadium from './create'
import AdminContainer from '@/components/containers/adminContainer'

const page = async () => {

  const currentUser = await getCurrentUser()

  if ( !currentUser || currentUser.role !== 'ADMIN' ) {
    return (
      <p>not authorized</p>
    )
  }

  return (
    <>
      <AdminContainer>
        <div className='w-full h-full bg-neutral0 rounded-md overflow-hidden'>
          <CreateStadium></CreateStadium>
        </div>
      </AdminContainer>
    </>
  )
}

export default page