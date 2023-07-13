'use client'

import { Match, MatchTeam } from '@prisma/client'

  interface MatchProperties {
    matchs: ( Match & { matchTeams: MatchTeam[] } )[] | undefined
  }

const MatchContainer: React.FC<MatchProperties> = ( { matchs =[] } ) => {
  return (
    <>
      {matchs.map( ( match ) => {
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
            } )
            }
          </div>
        )
      } )
      }
    </>
  )
}

export default MatchContainer