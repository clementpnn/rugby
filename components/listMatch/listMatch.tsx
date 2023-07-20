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

  if ( selectedPoolNames.length === 0 ) {
    return <Empty />
  }
  // eslint-disable-next-line no-console
  console.log( matchs )

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
