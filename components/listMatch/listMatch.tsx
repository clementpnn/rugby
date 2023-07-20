/* eslint-disable no-console */
'use client'

import Container from '../containers/container'
// import { Demand, MatchTeam, User } from '@prisma/client'
import Empty from '../containers/empty'
import ModalJoinWaitList, { Match } from '../modals/modalJoinWaitList'
import { useFilterStore } from '@/hooks/useFilter'

interface MatchsByDate {
    [date: string]: Match[]
}

// interface Martchss {
//   match: { stadiumName: string
//     userDemandStatus: string
//     matchTeams: MatchTeam[]
//     demandes: Demand & {
//       user: User
//     }
//   }
//   }

interface ListMatchProperties {
    matchs: MatchsByDate
}

const ListMatch : React.FC<ListMatchProperties> = ( { matchs } ) => {
  const { pools } = useFilterStore()
  const selectedPoolNames = pools.filter( ( pool ) => pool.selected ).map( ( pool ) => pool.poolName )
  const reformSelectedPoolNames = selectedPoolNames.map( ( item ) => 'POULE_' + item )

  if ( reformSelectedPoolNames.length === 0 ) {
    return <Empty />
  }

  console.log( matchs )

  // function filterBySelectedPool( data: Match[] ) {
  //   return data.filter( ( item ) => reformSelectedPoolNames.includes( item.phase ) )
  // }

  // const matchs = {
  //   'Sat Jul 15 2023': [
  //     { date: '2023-07-15', time: '14:05', phase: 'POULE_A', stadiumId: '64b8e8aec890c124a4cf9c8e', matchTeams: [ { team:'WALES', result: 'NULL' }, { team:'FRANCE', result: 'NULL' } ] },
  //     { date: '2023-07-15', time: '16:30', phase: 'POULE_B', stadiumId: '64b8e8aec890c124a4cf9c8f', matchTeams: [ { team:'FIJI', result: 'NULL' }, { team:'GERMAN', result: 'NULL' } ] },
  //     { date: '2023-07-15', time: '18:50', phase: 'POULE_C', stadiumId: '64b8e8aec890c124a4cf9c8g', matchTeams: [ { team:'CHINA', result: 'NULL' }, { team:'AMERICA', result: 'NULL' } ] }
  //   ]
  // }

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

  // Filtrer les matchs en fonction des équipes sélectionnées pour chaque pool
  function filterBySelectedPool( data: Match[] ) {
    const selectedTeams = getSelectedTeamsByPool()
    console.log( selectedTeams )
    return data.filter( ( item ) =>
      item.matchTeams.every( ( mt ) => selectedTeams.includes( mt.team ) )
    )
  }

  const result = Object.fromEntries(
    Object.entries( matchs ).map( ( [ key, value ] ) => [ key, filterBySelectedPool( value ) ] )
  )

  console.log( result )

  console.log( reformSelectedPoolNames )

  return (
    <>
      {Object.entries( result ).map( ( [ date, matches ] ) => (
        <div key={date}>
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
