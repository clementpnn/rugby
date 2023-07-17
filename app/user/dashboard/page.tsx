import Link from 'next/link'

import getMatchs from '@/actions/getMatch'
import getCurrentUser from '@/actions/getCurrentUser'

const page = async () => {
  const matchs = await getMatchs()
  const currentUser = await getCurrentUser()

  if ( !currentUser || currentUser.role !== 'USER' ) {
    return (
      <p>not authorized</p>
    )
  }

  if ( !matchs ) {
    return (
      <>
        <div>no matchs</div>
      </>
    )
  }

  return (
    <>
      {matchs.map( ( match ) => {
        return (
          <Link href={`dashboard/${match.id}`} key={match.id}>
            <div>{match.date}</div>
            <div>{match.time}</div>
            <div>{match.phase}</div>
            {match.matchTeams.map( ( matchTeam ) => {
              return (
                <div key={matchTeam.id}>
                  <div>{matchTeam.team}</div>
                  <div>{matchTeam.result ?? ''}</div>
                </div>
              )
            } ) }
          </Link>
        )
      } )
      }
    </>
  )
}

export default page