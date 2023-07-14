import getStadiums from '@/actions/getStadiums'
import getTeams from '@/actions/getTeams'
import CreateMatchContainer from '@/components/containers/createMatch'

const page = async () => {
  const stadiums = await getStadiums() || []
  const teams = await getTeams() || []

  return (
    <>
      <CreateMatchContainer teams={teams} stadiums={stadiums} />
    </>
  )
}

export default page