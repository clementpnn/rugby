/* eslint-disable react/no-string-refs */
'use client'

import * as React from 'react'
import Button from '../buttons/button'
import { useState } from 'react'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { formatString } from '../modals/modalJoinWaitList'
import Image from 'next/image'
import useCountries from '@/hooks/useCountries'

type Team = {
  team: string
  selected: boolean
}

type Pool = {
  poolName: string
  selected: boolean
  teams: Team[]
}

type FilterProperties = {
  height: number
  width: number
}

const Filter: React.FC<FilterProperties> = ( { /* height,*/ /* width */ } ) => {
  const { getByValue } = useCountries()
  const [ parent ] = useAutoAnimate()
  const [ activeTab, setActiveTab ] = useState( 'pools' )
  const [ pools, setPools ] = useState<Pool[]>( [
    {
      poolName: 'A',
      selected: false,
      teams: [
        {
          team: 'NEW_ZEALAND',
          selected: true
        },
        {
          team: 'FRANCE',
          selected: true
        },
        {
          team: 'ITALY',
          selected: true
        },
        {
          team: 'URUGUAY',
          selected: true
        },
        {
          team: 'NAMIBIA',
          selected: true
        }
      ]
    },
    {
      poolName: 'B',
      selected: false,
      teams: [
        {
          team: 'SOUTH_AFRICA',
          selected: true
        },
        {
          team: 'IRELAND',
          selected: true
        },
        {
          team: 'SCOTLAND',
          selected: true
        },
        {
          team: 'TONGUA',
          selected: true
        },
        {
          team: 'ROMANIA',
          selected: true
        }
      ]
    },
    {
      poolName: 'C',
      selected: false,
      teams: [
        {
          team: 'WALES',
          selected: true
        },
        {
          team: 'AUSTRALIA',
          selected: true
        },
        {
          team: 'FIJI',
          selected: true
        },
        {
          team: 'GEORGIA',
          selected: true
        },
        {
          team: 'PORTUGAL',
          selected: true
        }
      ]
    },
    {
      poolName: 'D',
      selected: false,
      teams: [
        {
          team: 'ENGLAND',
          selected: true
        },
        {
          team: 'JAPAN',
          selected: true
        },
        {
          team: 'ARGENTINA',
          selected: true
        },
        {
          team: 'SAMOA',
          selected: true
        },
        {
          team: 'CHILE',
          selected: true
        }
      ]
    }
  ] )

  const handleClickTab = ( tab: string ) => {
    setActiveTab( tab )
  }

  const handlePoolClick = ( index: number ) => {
    const updatedPools = pools.map( ( pool, index_ ) => ( {
      ...pool,
      selected: index_ === index ? !pool.selected : pool.selected
    } ) )
    setPools( updatedPools )
  }

  const handleTeamClick = ( poolIndex: number, teamIndex: number ) => {
    const updatedPools = pools.map( ( pool, index ) => {
      if ( index === poolIndex ) {
        const updatedTeams = pool.teams.map( ( team, tIndex ) => {
          if ( tIndex === teamIndex ) {
            return { ...team, selected: !team.selected }
          }
          return team
        } )
        return { ...pool, teams: updatedTeams }
      }
      return pool
    } )
    setPools( updatedPools )
  }

  return (
    <div className='bg-neutral0 w-full h-full filter-container flex flex-col'>
      <h1 className='text-blue6 h2-barlow-m sm:h1-barlow-m pb-2 pt-14 pl-7'>PLANNING</h1>
      <div className='flex space-x-3 pb-12 pt-12 pl-7'>
        <Button
          size='lg'
          variant={`${activeTab === 'pools' ? 'primary' : 'outline'}`}
          className='w-[150px]'
          onClick={() => handleClickTab( 'pools' )}
        >
          Pools
        </Button>
        <Button
          size='lg'
          variant={`${activeTab === 'knock-out' ? 'primary' : 'outline'}`}
          className='w-[150px]'
          onClick={() => handleClickTab( 'knock-out' )}
        >
          Knock-out
        </Button>
      </div>
      <h5 className='text-blue6 h5-barlow-m pb-2 pt-3 pl-7 border-b-[1px]'>FILTER</h5>
      <div className='w-full h-full max-h-[calc(100vh-57px-150px-136px-101px)] overflow-auto scroll-smooth no-scrollbar'>
        {activeTab === 'pools' && (
          <>
            <div ref={parent} className='flex flex-col divide-y divide-neutral3 bg-neutral0 h-fit'>
              {pools.map( ( pool : Pool, index: number ) => (
                <>
                  <div key={index} className={`flex items-center cursor-pointer p-5 pl-7 bg-neutral0 hover:bg-neutral1 ${pool.selected === false && 'opacity-30 py-3'}`} onClick={() => handlePoolClick( index )}>
                    <div className='h2-barlow-m w-10 text-blue6'>{pool.poolName}</div>
                    <div className='h4-barlow-m text-blue9'>
                    POOL
                    </div>
                  </div>
                  {pool.selected === true && (
                    <div className='divide-y divide-neutral3 cursor-pointer'>
                      { pool.teams.map( ( team: Team, teamIndex: number ) => (
                        <div key={teamIndex} className={`pl-7 flex bg-neutral1 gap-x-3 p-5 hover:bg-neutral2 ${team.selected===false && 'opacity-30'}`} onClick={() => handleTeamClick( index, teamIndex )}>
                          <Image
                            src= {getByValue( team.team )?.flag || '/placeholder-image.png'}
                            width={28}
                            height={28}
                            alt="flag"
                          />
                          <span className='h5-inter-m text-blue9'>{formatString( team.team )}</span>
                        </div>
                      ) ) }
                    </div>

                  )}
                </>

              ) )}
            </div>

          </>
        )}
        {activeTab === 'knock-out' && (
          <>
            <div className='flex flex-col pb-2 pt-2'>
              <div className='border-l-2 border-r-2 border-t-2 p-2 pl-7'>
                <div className='flex items-center space-x-2'>
                  <div className='h2-barlow-m text-blue6 pr-3'>1</div>
                  <div className='h4-barlow-m text-blue9'>FINAL</div>
                </div>
              </div>
              <div className='border-l-2 border-r-2 border-t-2 p-2 pl-7'>
                <div className='flex items-center space-x-2'>
                  <div className='h2-barlow-m text-blue6 pr-3'>2</div>
                  <div className='h4-barlow-m text-blue9'>SEMI FINAL</div>
                </div>
              </div>
              <div className='border-2 p-2 pl-7'>
                <div className='flex items-center space-x-2'>
                  <div className='h2-barlow-m text-blue6 pr-3'>3</div>
                  <div className='h4-barlow-m text-blue9'>QUARTER FINAL</div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>

  )
}

export default Filter
