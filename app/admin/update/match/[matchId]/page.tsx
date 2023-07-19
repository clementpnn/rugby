import { getMatchUpdateById } from '@/actions/getMatch'
import getCurrentUser from '@/actions/getCurrentUser'
import MatchForm from '@/components/forms/matchForm'

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

  if ( !match?.matchTeams[0].team ) {
    return (
      <p>not match</p>
    )
  }

  return (
    <>
      <MatchForm match={match} />
    </>
  )
}

export default page