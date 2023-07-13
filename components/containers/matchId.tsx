'use client'

import { Match, MatchTeam } from '@prisma/client'

interface MatchIdProperties {
    match: ( Match & { matchTeams: MatchTeam[] } ) | undefined
}

const MatchIdContainer: React.FC<MatchIdProperties> = ( { match } ) => {

  if ( !match ) {
    return <p>No Match</p>
  }

  return (
    <div className='bg-blue-500' key={match.id}>
      <h1>{match.phase}</h1>
      <p>{match.date}</p>
      <p>{match.time}</p>
      {match.matchTeams.map( ( team ) => {
        return (
          <div key={team.id}>
            <p>{team.team}</p>
            <p>{team.result ?? '?'}</p>
          </div>
        )
      } ) }
    </div>
  )
}

export default MatchIdContainer