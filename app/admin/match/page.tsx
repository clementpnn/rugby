import { getMatchsInfoByUser } from '@/actions/getMatch'
import MatchList from './matchList'
import getCurrentUser from '@/actions/getCurrentUser'
import { Match } from '@/components/modals/modalJoinWaitList'

const page = async () => {
  const currentUser = await getCurrentUser()
  const matchs = await getMatchsInfoByUser( { userId : currentUser?.id || '' } ) || []

  const matchsByDate : { [date: string]: Match[] } = {}

  for ( const match of matchs ) {
    // eslint-disable-next-line unicorn/no-await-expression-member
    const matchDate = new Date( ( await match ).date ).toDateString()
    if ( !matchsByDate[matchDate] ) {
      matchsByDate[matchDate] = []
    }
    matchsByDate[matchDate].push( await match )
  }

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
      <MatchList matchs={matchsByDate} />
    </>
  )
}

export default page