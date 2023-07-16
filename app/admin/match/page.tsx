import getMatchs from '@/actions/getMatch'
import MatchList from './matchList'
import getCurrentUser from '@/actions/getCurrentUser'

const page = async () => {
  const matchs = await getMatchs()
  const currentUser = await getCurrentUser()

  if ( !currentUser || currentUser.role !== 'ADMIN' ) {
    return (
      <p>not authorized</p>
    )
  }

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