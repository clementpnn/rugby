'use client'

import useCountries from '@/hooks/useCountries'
import { ButtonUI } from '../ui/button'
import Image from 'next/image'
import Badge from '../ui/badge'
import Modal from './dialog'
import { RESULT, STATE } from '@prisma/client'
import { useEffect, useState } from 'react'
interface MatchInformation {
  date: string
  time: string
  state: STATE
  stadium: string
  score: {
    countryA : string
    scoreA : RESULT
    countryB : string
    scoreB : RESULT
  }
}
interface ModalJoinWaitListProperties {
  // children: React.ReactNode
  data: MatchInformation
  onClick: ()=>void
  button: React.ReactNode
}

function formatString( inputString : string ) {
  // Sépare les mots par les underscores et met chaque mot en minuscules
  let words = inputString.toLowerCase().split( '_' )

  // Capitalise chaque mot
  for ( let index = 0; index < words.length; index++ ) {
    words[index] = words[index].charAt( 0 ).toUpperCase() + words[index].slice( 1 )
  }

  // Rejoindre les mots pour former la chaîne finale
  let formattedString = words.join( ' ' )

  return formattedString
}

const ModalJoinWaitList : React.FC<ModalJoinWaitListProperties> = ( { data, onClick, button } ) => {

  const countryLeft = formatString( data.score.countryA )
  const countryRight = formatString( data.score.countryB )

  const state = formatString( data.state )

  const [ stateClass, setStateClass ] = useState<'accepted_light' | 'rejected_light' | 'progress_light' | 'accepted_dark' | 'rejected_dark' | 'progress_dark'>( 'accepted_light' )
  useEffect( () => {
    switch ( data.state ) {
    case 'ACCEPTED': {
      setStateClass( 'accepted_light' )
      break
    }
    case 'IN_PROGRESS': {
      setStateClass( 'progress_light' )
      break
    }
    case 'REJECTED': {
      setStateClass( 'rejected_light' )
      break
    }
    default: {
      // Set a default state in case 'data.state' doesn't match any of the cases
      setStateClass( 'accepted_light' )
      break
    }
    }
  }, [ data.state ] )

  const { getByValue } = useCountries()
  const imgCountryLeft = getByValue( data.score.countryA )
  const imgCountryRight = getByValue( data.score.countryB )
  return(
    <Modal action={<button className='w-full'>{button}</button>} title='Hey'>
      <div className='w-full h-fit flex flex-col gap-8 p-6 sm:p-8'>
        <div className='flex flex-col gap-y-3'>
          <div className='w-full flex justify-between items-center'>
            <span className='h6-barlow-m text-blue6 sm:h6-barlow-d'>{ data.time }</span>
            <Badge size='md' variant={stateClass}>{ state }</Badge>
          </div>
          <div className='flex flex-col gap-y-1 sm:flex-row sm:justify-between'>
            <span className='label-sm text-blue6 sm:label-md'>{ data.date }</span>
            <span className='label-sm text-blue6 sm:label-md'>{ data.stadium }</span>
          </div>
        </div>
        <div className='flex gap-x-4'>
          <div className='h-fit w-full flex flex-col gap-y-4 sm:flex-row'>
            <div className='h-fit w-full px-4 py-2 gap-x-3 bg-blue1 rounded-md flex flex-row sm:px-4 sm:py-2'>
              <Image src={imgCountryLeft?.flag || '/placeholder-image.png'} alt="Flag" width={'28'} height={'28'}/>
              <span className='h6-inter-d text-blue6'>{countryLeft}</span>
            </div>
            <div className='hidden sm:flex sm:flex-row sm:gap-y-1 sm:items-center'>
              <span className='h6-barlow-m text-blue6 text-center w-8 h-8 sm:text-right'>{ data.score.scoreA.slice( 0, 1 ) }</span>
              <span className='h6-barlow-m text-blue6 text-center w-8 h-8 sm:text-center'>-</span>
              <span className='h6-barlow-m text-blue6 text-center w-8 h-8 sm:text-left'>{ data.score.scoreB.slice( 0, 1 ) }</span>
            </div>
            <div className='h-fit w-full px-4 py-2 gap-x-3 bg-blue1 rounded-md flex flex-row'>
              <Image src={imgCountryRight?.flag || '/placeholder-image.png'} alt="Flag" width={'28'} height={'28'} className='sm:hidden'/>
              <span className='h6-inter-d text-blue6'>{countryRight}</span>
              <Image src={imgCountryRight?.flag || '/placeholder-image.png'} alt="Flag" width={'28'} height={'28'} className='hidden sm:block'/>
            </div>
          </div>
          <div className='flex flex-col gap-y-1 sm:hidden'>
            <span className='h6-barlow-m text-blue6 text-center w-8 h-8'>{ data.score.scoreA.slice( 0, 1 ) }</span>
            <span className='h6-barlow-m text-blue6 text-center w-8 h-8'>-</span>
            <span className='h6-barlow-m text-blue6 text-center w-8 h-8'>{ data.score.scoreB.slice( 0, 1 ) }</span>
          </div>
        </div>
        <ButtonUI className='' variant='primary' size='lg' onClick={onClick}>Join Wait List</ButtonUI>
      </div>
    </Modal>
  )
}

export default ModalJoinWaitList

