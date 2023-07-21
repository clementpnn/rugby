import getCurrentUser from '@/actions/getCurrentUser'
import { getMatchDemandById } from '@/actions/getMatch'
import DemandMatch from './demand'
import AdminContainer from '@/components/containers/adminContainer'

interface IParameters {
  matchId: string
}

const page = async ( { params }: {params: IParameters} ) => {
  const matchData = await getMatchDemandById( params )
  const currentUser = await getCurrentUser()

  if ( !currentUser || currentUser.role !== 'ADMIN' ) {
    return (
      <p>not authorized</p>
    )
  }

  if ( !matchData ) {
    <p>not team</p>
  }

  return (
    <>
      <AdminContainer>
        <div className='w-full h-full bg-neutral0 rounded-md overflow-hidden'>
          <DemandMatch matchData={matchData} />
        </div>
      </AdminContainer>

    </>
  )
}

export default page