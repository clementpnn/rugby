'use client'

import * as React from 'react'
import Button from '../buttons/button'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { formatString } from '../modals/modalJoinWaitList'
import Image from 'next/image'
import useCountries from '@/hooks/useCountries'
import { useFilterStore } from '@/hooks/useFilter'
import ProfileCard from '../cards/profile'

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

const ProfilePageFilter: React.FC<FilterProperties> = () => {
  const { getByValue } = useCountries()
  const [ parent ] = useAutoAnimate()

  const {
    activeTab,
    pools,
    setActiveTab,
    handlePoolClick,
    handleTeamClick
  } = useFilterStore()

  const handleClickTab = ( tab: string ) => {
    setActiveTab( tab )
  }

  return (
    <div className='bg-neutral0 w-full h-full filter-container flex flex-col'>
      <h1 className='text-blue6 h2-barlow-m sm:h1-barlow-m pb-2 pt-14 pl-7'>PROFIL</h1>
      <div className='flex justify items-start pt-12 pl-7'>
        <ProfileCard showLogoutButton={false} />
      </div>
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
      <h5 className='text-blue6 h5-barlow-m pb-2 pt-3 pl-7'>FILTER</h5>
      <div className='w-full h-full max-h-[calc(100vh-57px-150px-136px-101px)] overflow-auto scroll-smooth no-scrollbar border-y-[1px]'>
        {activeTab === 'pools' && (
          <>
            <div ref={parent} className='flex flex-col divide divide-neutral3 bg-neutral0 h-fit'>
              {pools.map( ( pool : Pool, index: number ) => (
                <React.Fragment key={index}>
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
                            alt='flag'
                          />
                          <span className='h5-inter-m text-blue9'>{formatString( team.team )}</span>
                        </div>
                      ) ) }
                    </div>

                  )}
                </React.Fragment>

              ) )}
            </div>

          </>
        )}
        {activeTab === 'knock-out' && (
          <>
            <div className='flex flex-col divide-y divide-neutral3 bg-neutral0 h-fit'>

              <div className='flex items-center cursor-pointer p-5 pl-7 bg-neutral0 hover:bg-neutral1 opacity-30 py-3'>
                <div className='h2-barlow-m w-10 text-blue6'>1</div>
                <div className='h4-barlow-m text-blue9'>FINAL</div>
              </div>

              <div className='flex items-center cursor-pointer p-5 pl-7 bg-neutral0 hover:bg-neutral1 opacity-30 py-3'>
                <div className='h2-barlow-m w-10 text-blue6'>2</div>
                <div className='h4-barlow-m text-blue9'>SEMI FINAL</div>
              </div>

              <div className='flex items-center cursor-pointer p-5 pl-7 bg-neutral0 hover:bg-neutral1 opacity-30 py-3'>
                <div className='h2-barlow-m w-10 text-blue6'>3</div>
                <div className='h4-barlow-m text-blue9'>QUARTER FINAL</div>
              </div>
            </div>

          </>
        )}
      </div>
    </div>
  )
}

export default ProfilePageFilter
