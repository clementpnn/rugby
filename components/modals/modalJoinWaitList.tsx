'use client'

import useCountries from '@/hooks/useCountries'
import { ButtonUI } from '../ui/button'
import Image from 'next/image'
import Badge from '../ui/badge'
import Modal from './dialog'
import { useEffect, useState } from 'react'
import RequestMatch from '../requestMatch/requestMatch'
import { PHASE, RESULT } from '@prisma/client'

// export interface MatchInformation {
//   date: string
//   time: string
//   state: STATE
//   stadium: string
//   score: {
//     countryA : string
//     scoreA : RESULT
//     countryB : string
//     scoreB : RESULT
//   }
// }
interface Teams {
  id: string
  matchId: string
  team: string
  result: RESULT | null
}

export interface Match{
  id: string
  date: string
  time: string
  phase: PHASE
  stadiumName: string
  userDemandStatus: string
  matchTeams: Teams[]
}

interface ModalJoinWaitListProperties {
  data: Match
  onClick?: ()=>void
}

export function formatString( inputString : string ) {
  let words = inputString.toLowerCase().split( '_' )

  for ( let index = 0; index < words.length; index++ ) {
    words[index] = words[index].charAt( 0 ).toUpperCase() + words[index].slice( 1 )
  }

  let formattedString = words.join( ' ' )

  return formattedString
}

const convertDateToEnglish = ( dateString : string ) => {
  const [ day, month, year ] = dateString.split( '-' )

  const monthsInEnglish = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]
  const monthInEnglish = monthsInEnglish[Number.parseInt( month ) - 1]

  const currentYear = new Date().getFullYear()
  const fullYear = currentYear - ( currentYear % 100 ) + Number.parseInt( year )

  const dateInEnglish = `${monthInEnglish} ${Number.parseInt( day )}, ${fullYear}`

  return dateInEnglish
}

const ModalJoinWaitList : React.FC<ModalJoinWaitListProperties> = ( { data, onClick } ) => {

  const countryLeft = formatString( data.matchTeams[0].team )
  const countryRight = formatString( data.matchTeams[1].team )

  const state = formatString( data.userDemandStatus )

  const [ stateClass, setStateClass ] = useState<'accepted_light' | 'rejected_light' | 'progress_light' | 'accepted_dark' | 'rejected_dark' | 'progress_dark' | 'disabled'>( 'accepted_light' )
  useEffect( () => {
    switch ( data.userDemandStatus ) {
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
    case 'NOT_DEMANDED': {
      setStateClass( 'disabled' )
      break
    }
    default: {
      setStateClass( 'accepted_light' )
      break
    }
    }
  }, [ data.userDemandStatus ] )

  const { getByValue } = useCountries()
  const imgCountryLeft = getByValue( data.matchTeams[0].team )
  const imgCountryRight = getByValue( data.matchTeams[1].team )
  const time = data.time.split( ' ' ).join( '' )
  const date = convertDateToEnglish( data.date )
  return(
    <Modal action={<button className='w-full bg-neutral0 hover:bg-neutral1'><RequestMatch data={data} state={state} stateClass={stateClass} time={time} admin={false}/></button>} title='Wait List'>
      <div className='w-full h-fit flex flex-col gap-8 p-6 sm:p-8'>
        <div className='flex flex-col gap-y-3'>
          <div className='w-full flex justify-between items-center'>
            <span className='h6-barlow-m text-blue6 sm:h6-barlow-d'>{ time }</span>
            <Badge size='md' variant={stateClass}>{ state }</Badge>
          </div>
          <div className='flex flex-col gap-y-1 sm:flex-row sm:justify-between'>
            <span className='label-sm text-blue6 sm:label-md'>{ date }</span>
            <span className='label-sm text-blue6 sm:label-md'>{ data.stadiumName }</span>
          </div>
        </div>
        <div className='flex gap-x-4'>
          <div className='h-fit w-full flex flex-col gap-y-4 sm:flex-row'>
            <div className='h-fit w-full px-4 py-2 gap-x-3 bg-blue1 rounded-md flex flex-row sm:px-4 sm:py-2'>
              <Image src={imgCountryLeft?.flag || '/placeholder-image.png'} alt="Flag" width={'28'} height={'28'}/>
              <span className='h6-inter-d text-blue6'>{countryLeft}</span>
            </div>
            {data.matchTeams[0].result===RESULT.NO_PLAYED || data.matchTeams[1].result===RESULT.NO_PLAYED ?
              <div className=' sm:flex sm:flex-row sm:gap-y-1 sm:items-center'>
                <span className='w-[96px] h6-barlow-m text-blue6 text-center h-8 sm:text-center'>VS</span>
              </div> : <div className='hidden sm:flex sm:flex-row sm:gap-y-1 sm:items-center'>
                <span className='h6-barlow-m text-blue6 text-center w-8 h-8 sm:text-right'>{ data.matchTeams[0].result?.slice( 0, 1 ) }</span>
                <span className='h6-barlow-m text-blue6 text-center w-8 h-8 sm:text-center'>-</span>
                <span className='h6-barlow-m text-blue6 text-center w-8 h-8 sm:text-left'>{ data.matchTeams[1].result?.slice( 0, 1 ) }</span>
              </div>}

            <div className='h-fit w-full px-4 py-2 gap-x-3 bg-blue1 rounded-md flex justify-end'>
              <Image src={imgCountryRight?.flag || '/placeholder-image.png'} alt="Flag" width={'28'} height={'28'} className='sm:hidden'/>
              <span className='h6-inter-d text-blue6'>{countryRight}</span>
              <Image src={imgCountryRight?.flag || '/placeholder-image.png'} alt="Flag" width={'28'} height={'28'} className='hidden sm:block'/>
            </div>
          </div>
          <div className='flex flex-col gap-y-1 sm:hidden'>
            <span className='h6-barlow-m text-blue6 text-center w-8 h-8'>{ data.matchTeams[0].result?.slice( 0, 1 ) }</span>
            <span className='h6-barlow-m text-blue6 text-center w-8 h-8'>-</span>
            <span className='h6-barlow-m text-blue6 text-center w-8 h-8'>{ data.matchTeams[0].result?.slice( 0, 1 ) }</span>
          </div>
        </div>
        {/* <ButtonUI variant={data.matchTeams[0].result!==RESULT.WINNER && data.matchTeams[0].result!==RESULT.LOSER && data.matchTeams[0].result!==RESULT.NULL || data.matchTeams[1].result!==RESULT.WINNER && data.matchTeams[1].result!==RESULT.LOSER && data.matchTeams[1].result!==RESULT.NULL ? 'primary' : 'disabled'} size='lg' onClick={onClick}>Join Wait List</ButtonUI> */}
        <ButtonUI variant={data.matchTeams[0].result===RESULT.NO_PLAYED || data.matchTeams[1].result===RESULT.NO_PLAYED ? 'primary' : 'disabled'} size='lg' onClick={onClick}>Join Wait List</ButtonUI>
      </div>
    </Modal>
  )
}

export default ModalJoinWaitList

