import getMatch from '@/actions/getMatchs'
import MatchContainer from '@/components/containers/match'

const page = async () => {
  const matchs = await getMatch()

  return (
    <>
      <MatchContainer matchs={matchs} />
    </>
  )
}

export default page