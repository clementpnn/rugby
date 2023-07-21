import { getMatchUpdateById } from '@/actions/getMatch'
import getCurrentUser from '@/actions/getCurrentUser'
import MatchForm from '@/components/forms/matchForm'
import AdminContainer from '@/components/containers/adminContainer'

interface IParameters {
  matchId: string
}

const page = async ( { params }: {params: IParameters} ) => {
  const match = await getMatchUpdateById( params )
  const currentUser = await getCurrentUser()

  if ( !currentUser || currentUser.role !== 'ADMIN' ) {
    return (
      <p>not authorized</p>
    )
  }

  if ( !match ) {
    return (
      <p>not match</p>
    )
  }

  return (
    <>
      <AdminContainer>
        <div className='bg-neutral0 rounded-md w-full h-full overflow-auto'>
          <MatchForm match={match} />
        </div>
      </AdminContainer>
    </>
  )
}

export default page