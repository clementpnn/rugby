/* eslint-disable no-console */
'use client'

import Container from '../containers/container'
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
  const selectedPoolNames = pools.filter( ( pool ) => pool.selected ).map( ( pool ) => pool.poolName )
  const reformSelectedPoolNames = selectedPoolNames.map( ( item ) => 'POOL_' + item )

  if ( reformSelectedPoolNames.length === 0 ) {
    return <Empty />
  }

  const filteredMatches: MatchsByDate = {}
  for ( const [ date, matches ] of Object.entries( matchs ) ) {
    const selectedMatchesForDate = matches.filter( ( match ) => reformSelectedPoolNames.includes( match.phase ) )
    if ( selectedMatchesForDate.length > 0 ) {
      filteredMatches[date] = selectedMatchesForDate
    }
  }

  return (
    <>
      {Object.entries( matchs ).map( ( [ date, matches ] ) => (
        <div key={date}>
          <Container>
            <h2 className='pt-12 pb-4 label-lg text-blue9'>Date: {date}</h2>
          </Container>
          <div className='border-y-[1px] border-neutral3 divide-y divide-neutral3'>
            {matches.map( ( match : Match ) => (
              <div key={match.id}>
                <ModalJoinWaitList data={match} />
              </div>
            ) )}
          </div>
        </div>
      ) )}
    </>
  )
}

export default ListMatch
