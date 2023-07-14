import getStadiums from '@/actions/getStadiums'
import getTeams from '@/actions/getTeams'
import CreateMatch from './create'

const page = async () => {
  const stadiums = await getStadiums() || []
  const teams = await getTeams() || []

  return (
    <>
      <CreateMatch teams={teams} stadiums={stadiums} />
    </>
  )
}

export default page