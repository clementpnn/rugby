import { getMatchById } from '@/actions/getMatch'
import List from './list'

interface IParameters {
  matchId: string
}

const page = async ( { params }: {params: IParameters} ) => {
  const match = await getMatchById( params )

  if ( !match ) {
    return(
      <p>not match</p>
    )
  }

  const ACCEPTED = match.demands.filter( demand => demand.demandState === 'ACCEPTED' )
  const REJECTED = match.demands.filter( demand => demand.demandState === 'REJECTED' )
  const IN_PROGRESS = match.demands.filter( demand => demand.demandState === 'IN_PROGRESS' )

  return (
    <List match={match.match} ACCEPTED={ACCEPTED} REJECTED={REJECTED} IN_PROGRESS={IN_PROGRESS} />
  )
}

export default page