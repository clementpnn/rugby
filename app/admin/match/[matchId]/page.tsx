// eslint-disable-next-line check-file/folder-naming-convention
import { getMatchById } from '@/actions/getMatch'
import MatchId from './match'
import getCurrentUser from '@/actions/getCurrentUser'

interface IParameters {
  matchId: string
}

const page = async ( { params }: {params: IParameters} ) => {
  const match = await getMatchById( params )
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
      <MatchId match={match} />
    </>
  )
}

export default page