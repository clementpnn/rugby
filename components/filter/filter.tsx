'use client'

import * as React from 'react'
import Button from '../buttons/button'
import { useState } from 'react'
import Image from 'next/image'

// type Pool = {
//   id: string
//   name: string
//   teams: Team[]
// }

type Team = {
  id: string
  name: string
  image: string
}

type FilterProperties = {
  height: number
  width: number
}

const Filter: React.FC<FilterProperties> = ( { /* height,*/ /* width */ } ) => {
  const [ activeTab, setActiveTab ] = useState( 'pools' )
  const [ activePool, setActivePool ] = useState( '' )

  const handleClickTab = ( tab: string ) => {
    setActiveTab( tab )
    setActivePool( '' )
  }

  const handleClickPool = ( poolId: string ) => {
    setActivePool( poolId === activePool ? '' : poolId )
  }

  const generateTeams = ( poolId: string ): Team[] => {
    switch ( poolId ) {
    case 'A': {
      return [
        { id: 'A1',
          name: 'Team A1',
          image: 'https://via.placeholder.com/28x28' },

        { id: 'A2',
          name: 'Team A2',
          image: 'https://via.placeholder.com/28x28' },

        { id: 'A3',
          name: 'Team A3',
          image: 'https://via.placeholder.com/28x28' },

        { id: 'A4',
          name: 'Team A4',
          image: 'https://via.placeholder.com/28x28' },

        { id: 'A5',
          name: 'Team A5',
          image: 'https://via.placeholder.com/28x28' }
      ]
    }
    case 'B': {
      return [
        { id: 'B1',
          name: 'Team B1',
          image: 'https://via.placeholder.com/28x28' },

        { id: 'B2',
          name: 'Team B2',
          image: 'https://via.placeholder.com/28x28' },

        { id: 'B3',
          name: 'Team B3',
          image: 'https://via.placeholder.com/28x28' },

        { id: 'B4',
          name: 'Team B4',
          image: 'https://via.placeholder.com/28x28' },

        { id: 'B5',
          name: 'Team B5',
          image: 'https://via.placeholder.com/28x28' }
      ]
    }
    case 'C': {
      return [
        { id: 'C1',
          name: 'Team C1',
          image: 'https://via.placeholder.com/28x28' },

        { id: 'C2',
          name: 'Team C2',
          image: 'https://via.placeholder.com/28x28' },

        { id: 'C3',
          name: 'Team C3',
          image: 'https://via.placeholder.com/28x28' },

        { id: 'C4',
          name: 'Team C4',
          image: 'https://via.placeholder.com/28x28' },

        { id: 'C5',
          name: 'Team C5',
          image: 'https://via.placeholder.com/28x28' }
      ]
    }
    case 'D': {
      return [
        { id: 'D1',
          name: 'Team D1',
          image: 'https://via.placeholder.com/28x28' },

        { id: 'D2',
          name: 'Team D2',
          image: 'https://via.placeholder.com/28x28' },

        { id: 'D3',
          name: 'Team D3',
          image: 'https://via.placeholder.com/28x28' },

        { id: 'D4',
          name: 'Team D4',
          image: 'https://via.placeholder.com/28x28' },

        { id: 'D5',
          name: 'Team D5',
          image: 'https://via.placeholder.com/28x28' }
      ]
    }
    default: {
      return []
    }
    }
  }

  return (
    <div className='filter-container flex flex-col h-screen overflow-y-auto'>
      <h1 className='text-blue6 h2-barlow-m sm:h1-barlow-m pb-2 pt-14 pl-7'>PLANNING</h1>
      <div className='flex space-x-3 pb-12 pt-12 pl-7'>
        <Button
          size={'lg'}
          className={`h-12 w-40 border-2 ${
            activeTab === 'pools' ? 'bg-blue6 text-neutral0' : 'bg-neutral0 text-blue6'
          }`}
          onClick={() => handleClickTab( 'pools' )}
        >
          Pools
        </Button>
        <Button
          size={'lg'}
          className={`h-12 w-40 border-2 ${
            activeTab === 'knock-out' ? 'bg-blue6 text-neutral0' : 'bg-neutral0 text-blue6'
          }`}
          onClick={() => handleClickTab( 'knock-out' )}
        >
          Knock-out
        </Button>
      </div>
      <div className='flex-grow'>
        {activeTab === 'pools' && (
          <>
            <h5 className='text-blue6 h5-barlow-m pb-2 pt-3 pl-7'>FILTER</h5>
            <div className='flex flex-col pb-3'>
              {[ 'A', 'B', 'C', 'D' ].map( ( poolId ) => (
                <div key={poolId} className='border-l-2 border-r-2 border-t-2 p-2 pl-7'>
                  <div
                    className={`flex items-center space-x-2 cursor-pointer ${
                      poolId === activePool ? 'text-blue6' : 'text-blue6'
                    }`}
                    onClick={() => handleClickPool( poolId )}
                  >
                    <div className='h2-barlow-m pr-3'>{poolId}</div>
                    <div className={`h2-barlow-m ${poolId === activePool ? 'text-blue9' : 'text-blue9'}`}>
                      POOL
                    </div>
                  </div>
                  {poolId === activePool && (
                    <div /*className=''*/>
                      {generateTeams( poolId ).map( ( team ) => (
                        <div key={team.id} className='border-t-2 p-5 flex items-center space-x-2 pt-5'>
                          {/*<img/>*/}<Image src={team.image} alt='team logo' className='h-7 w-7 rounded-full' />
                          <div className='h6-lato-d'>{team.name}</div>
                        </div>
                      ) )}
                    </div>
                  )}
                </div>
              ) )}
            </div>
          </>
        )}
        {activeTab === 'knock-out' && (
          <>
            <h5 className='text-blue6 h5-barlow-m pb-2 pt-3 pl-7'>FILTER</h5>
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