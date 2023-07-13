// eslint-disable-next-line check-file/folder-naming-convention
import { getMatchById } from '@/actions/getMatch'
import MatchIdContainer from '@/components/containers/matchId'

interface IParameters {
  matchId: string
}

const page = async ( { params }: {params: IParameters} ) => {

  const match = await getMatchById( params )

  return (
    <>
      <MatchIdContainer match={match} />
    </>
  )
}

export default page