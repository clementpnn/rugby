import getMatchs from '@/actions/getMatch'
import MatchContainer from '@/components/containers/match'

const page = async () => {
  const matchs = await getMatchs()

  return (
    <>
      <MatchContainer matchs={matchs} />
    </>
  )
}

export default page