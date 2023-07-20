'use client'

import { Match } from '@/components/modals/modalJoinWaitList'

// interface MatchListProperties {
//   matchs: ( Match & { matchTeams: MatchTeam[] } )[]
// }

interface MatchsByDate {
  [date: string]: Match[]
}

interface MatchListProperties {
    matchs: MatchsByDate
}

const MatchList: React.FC<MatchListProperties> = ( { matchs } ) => {

  return (
    <>
      {/* {matchs.map( ( match ) => {
        return (
          <Link href={`/admin/match/${match.id}`} key={match.id}> */}
      {/* <h1 className='mt-6'>{match.phase}</h1>
            <p>{match.date}</p>
            <p>{match.time}</p>
            {match.matchTeams.map( ( team ) => {
              return (
                <div key={team.id}>
                  <p>{team.team}</p>
                  <p>{team.result ?? '?'}</p>
                </div>
              )
            } ) } */}
      {/* <RequestMatch data={match} state='disabled' stateClass='disabled' time='25:30'></RequestMatch>
          </Link>
        )
      } ) } */}
    </>
  )
}

export default MatchList