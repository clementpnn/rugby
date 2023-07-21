import getCurrentUser from '@/actions/getCurrentUser'
import { getTeambyId } from '@/actions/getTeams'
import TeamForm from '@/components/forms/teamForm'

interface IParameters {
  teamId: string
}

const page = async ( { params }: {params: IParameters} ) => {
  const team = await getTeambyId( params )
  const currentUser = await getCurrentUser()

  if ( !currentUser || currentUser.role !== 'ADMIN' ) {
    return (
      <p>not authorized</p>
    )
  }

  if ( !team ) {
    <p>not team</p>
  }

  return (
    <>
      <TeamForm team={team} />
    </>
  )
}

export default page