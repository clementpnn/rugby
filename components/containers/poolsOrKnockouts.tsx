'use client'

import useIsPools from '@/hooks/usePoolsOrKnockouts'
import InformationDescription from '../informationDescription/informationDescription'
import Pool from '../pools/pool'
import { poulesData } from '@/app/pool/poolayout'

const PoolsOrKnockouts = () => {
  const { isPools } = useIsPools()
  const dataList = [
    {
      shortcut: 'MP',
      title: 'Match played',
      description: 'A team gets one match point played each time they play a match.'
    },
    {
      shortcut: 'W',
      title: 'Win',
      description: 'A team gets a win point each time they win the game.'
    },
    {
      shortcut: 'D',
      title: 'Draw',
      description: 'A team gets a draw point each time they draw.'
    },
    {
      shortcut: 'L',
      title: 'Lose',
      description: 'A team gets a lose point each time they lose the game.'
    },
    {
      shortcut: 'DB',
      title: 'Defensive Bonus',
      description: 'A team gets a defensive bonus point if they lose the game with a small point spread.'
    },
    {
      shortcut: 'B',
      title: 'Bonus',
      description: 'A team that scores at least four tries in a match automatically wins an attacking bonus point, regardless of the final result of the match.'
    },
    {
      shortcut: 'PTS',
      title: 'Points',
      description: 'A team earns 4 points for a win, 2 points for a draw, and no points for a loss, but can get an offensive bonus point by scoring 3 more tries than their opponent, or a defensive bonus point by losing with a difference of 5 points or less.'
    }
  ]
  return(
    <div className='w-full h-full max-h-[calc(100%-294.9px)]'>
      {isPools ? (
        <div className='w-full h-full grid grid-cols-3'>
          <div className='w-full h-full grid col-span-2 overflow-auto scroll-smooth no-scrollbar'>
            <Pool data={poulesData[0]}/>
            <Pool data={poulesData[0]}/>
            <Pool data={poulesData[0]}/>
          </div>
          <div className='overflow-auto w-full h-full scroll-smooth no-scrollbar'>
            <div className='flex flex-col gap-y-12 w-hug pl-12 pr-20 py-12'>
              {dataList.map( ( data, index ) => (
                <InformationDescription key={index} data={data} />
              ) )}
            </div>
          </div>
        </div>
      ) : (
        <div className='bg-blue1 w-full h-full'>
          Add knockout Component
        </div>
      )}
    </div>
  )
}

export default PoolsOrKnockouts