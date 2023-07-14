import getMatchs from '@/actions/getMatch'
import MatchList from './matchList'

const page = async () => {
  const matchs = await getMatchs()

  if ( !matchs ) {
    return <p>No Match</p>
  }

  return (
    <>
      <MatchList matchs={matchs} />
    </>
  )
}

export default page