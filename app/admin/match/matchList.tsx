'use client'

import Container from '@/components/containers/container'
import Empty from '@/components/containers/empty'
import { Match } from '@/components/modals/modalJoinWaitList'
import RequestMatch from '@/components/requestMatch/requestMatch'
import { useFilterStore } from '@/hooks/useFilter'
import { useAutoAnimate } from '@formkit/auto-animate/react'

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
  const { pools } = useFilterStore()
  const [ parent ] = useAutoAnimate()
  const selectedPoolNames = pools.filter( ( pool ) => pool.selected ).map( ( pool ) => pool.poolName )
  const reformSelectedPoolNames = selectedPoolNames.map( ( item ) => 'POULE_' + item )

  if ( reformSelectedPoolNames.length === 0 ) {
    return <Empty />
  }

  function getSelectedTeamsByPool() {
    const selectedTeams: string[] = []
    for ( const pool of pools ) {
      if ( pool.selected ) {
        for ( const team of pool.teams ) {
          if ( team.selected ) {
            selectedTeams.push( team.team )
          }
        }
      }
    }
    return selectedTeams
  }

  function filterBySelectedPool( data: Match[] ) {
    const selectedTeams = getSelectedTeamsByPool()
    return data.filter( ( item ) =>
      item.matchTeams.every( ( mt ) => selectedTeams.includes( mt.team ) )
    )
  }

  const result = Object.fromEntries(
    Object.entries( matchs ).map( ( [ key, value ] ) => [ key, filterBySelectedPool( value ) ] )
  )

  return (
    <>
      {Object.entries( result ).map( ( [ date, matches ] ) => (
        <div ref={parent} key={date}>
          {matches.length === 0 ? (
            ''
          ) : (
            <>
              <Container>
                <h2 className='pt-12 pb-4 label-lg text-blue9'>{date}</h2>
              </Container>
              <div className='border-y-[1px] border-neutral3 divide-y divide-neutral3'>
                {matches.map( ( match: Match ) => (
                  <div key={match.id}>
                    <RequestMatch data={match} state='disabled' stateClass='disabled' time='25:30'></RequestMatch>
                  </div>
                ) )}
              </div>
            </>
          )}
        </div>
      ) )}
    </>
  )
}

export default MatchList