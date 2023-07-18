'use client'

import Link from 'next/link'

import { Match, MatchTeam } from '@prisma/client'

  interface MatchListProperties {
    matchs: ( Match & { matchTeams: MatchTeam[] } )[]
  }

const MatchList: React.FC<MatchListProperties> = ( { matchs } ) => {

  return (
    <>
      {matchs.map( ( match ) => {
        return (
          <Link href={`/admin/match/${match.id}`} key={match.id}>
            <h1 className='mt-6'>{match.phase}</h1>
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
          </Link>
        )
      } ) }
    </>
  )
}

export default MatchList