import getCurrentUser from '@/actions/getCurrentUser'
import PoolsOrKnockouts from '@/components/containers/poolsOrKnockouts'
import InformationBar from '@/components/informationBar/informationBar'
import Navbar from '@/components/navbar/navbar'

const UserInformation = async () => {
  const currentUser = await getCurrentUser()

  if ( !currentUser || currentUser.role !== 'USER' ) {
    return (
      <p>not authorized</p>
    )
  }
  return(
    <div className='flex flex-col w-full h-screen'>
      <Navbar/>
      <InformationBar/>
      <PoolsOrKnockouts/>
    </div>
  )
}

export default UserInformation