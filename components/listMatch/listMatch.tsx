'use client'

import { useAutoAnimate } from '@formkit/auto-animate/react'
import Container from '../containers/container'
// import { Demand, MatchTeam, User } from '@prisma/client'
import Empty from '../containers/empty'
import ModalJoinWaitList, { Match } from '../modals/modalJoinWaitList'
import { useFilterStore } from '@/hooks/useFilter'

interface MatchsByDate {
    [date: string]: Match[]
}

interface ListMatchProperties {
    matchs: MatchsByDate
}

const ListMatch : React.FC<ListMatchProperties> = ( { matchs } ) => {
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
                    <ModalJoinWaitList data={match} />
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

export default ListMatch
