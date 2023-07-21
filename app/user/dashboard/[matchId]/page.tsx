import { getMatchByIdUser } from '@/actions/getMatch'
import MatchId from './match'
import getCurrentUser from '@/actions/getCurrentUser'
import Navbar from '@/components/navbar/navbar'

interface IParameters {
  matchId: string
}

const page = async ( { params }: {params: IParameters} ) => {
  const match = await getMatchByIdUser( params )
  const currentUser = await getCurrentUser()

  if ( !currentUser ) {
    return (
      <p>not logged</p>
    )
  }

  if ( !match ) {
    return (
      <p>not match</p>
    )
  }

  return (
    <>
      <Navbar />
      <MatchId match={match} currentUser={currentUser} />
    </>
  )
}

export default page