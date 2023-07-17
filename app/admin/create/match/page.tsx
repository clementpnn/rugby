import getStadiums from '@/actions/getStadiums'
import getTeams from '@/actions/getTeams'
import CreateMatch from './create'
import getCurrentUser from '@/actions/getCurrentUser'

const page = async () => {
  const stadiums = await getStadiums() || []
  const teams = await getTeams() || []
  const currentUser = await getCurrentUser()

  if ( !currentUser || currentUser.role !== 'ADMIN' ) {
    return (
      <p>not authorized</p>
    )
  }

  return (
    <>
      <CreateMatch teams={teams} stadiums={stadiums} />
    </>
  )
}

export default page