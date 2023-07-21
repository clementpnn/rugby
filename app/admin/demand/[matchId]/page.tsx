import getCurrentUser from '@/actions/getCurrentUser'
import { getMatchDemandById } from '@/actions/getMatch'
import DemandMatch from './demand'

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
      <DemandMatch matchData={matchData} />
    </>
  )
}

export default page