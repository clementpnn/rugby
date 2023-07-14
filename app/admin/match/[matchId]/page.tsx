// eslint-disable-next-line check-file/folder-naming-convention
import { getMatchById } from '@/actions/getMatch'
import MatchId from './match'

interface IParameters {
  matchId: string
}

const page = async ( { params }: {params: IParameters} ) => {
  const match = await getMatchById( params )

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