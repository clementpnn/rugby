'use client'

import Image from 'next/image'
import Badge from '@/components/ui/badge'
// import { MatchInformation } from '../modals/modalJoinWaitList'
import useCountries from '@/hooks/useCountries'
import { RESULT } from '@prisma/client'
import { Matchs } from '../modals/modalJoinWaitList'
// import { formatString } from '../modals/modalJoinWaitList'
interface MatchProperties {
  // variant: 'accepted_light' | 'rejected_light' | 'progress_light' | 'accepted_dark' | 'rejected_dark' | 'progress_dark'
  // label: string
  data: Matchs
  state: string
  stateClass: 'accepted_light' | 'rejected_light' | 'progress_light' | 'accepted_dark' | 'rejected_dark' | 'progress_dark'
}

const RequestMatch: React.FC<MatchProperties> = ( { data, stateClass, state } ) => {
  const { getByValue } = useCountries()
  const imgCountryLeft = getByValue( data.matchTeams[0].team )
  const imgCountryRight = getByValue( data.matchTeams[1].team )
  return (
    <div className="flex justify-between flex-col md:flex-row items-start md:items-center border-y-[1px] w-full h-fit px-5 md:px-20 py-6">
      <div className="w-[280px] flex flex-col items-start gap-y-2">
        <div className="md:h4-barlow-m h5-barlow-m text-blue6">{ data.time }</div>
        <div className="label-sm text-blue6">{ data.stadiumName }</div>
      </div>
      <div className="flex items-center justify-center gap-x-10 md:w-hug w-full md:mt-0">
        <div className="flex items-center justify-end">
          <Image
            src= {imgCountryLeft?.flag || '/placeholder-image.png'}
            width={56}
            height={56}
            alt="flag"
            className='rounded-full'
            style={{ boxShadow: '0px 0px 14px rgba(0, 0, 0, 0.1)' }}
          />
          <div className="text-blue9 h5-barlow-m uppercase text-left w-14 md:ml-4">
            { data.matchTeams[0].team.slice( 0, 3 ) }
          </div>
        </div>
        { data.matchTeams[0].result===RESULT.WINNER || data.matchTeams[1].result===RESULT.WINNER ? (
          <div className="h6-barlow-m text-blue6 flex justify-center w-16">VS</div>
        ) : (
          <div className="flex row w-16 justify-between">
            <div className="h6-barlow-m text-blue6">{ data.matchTeams[0].result?.slice( 0, 1 ) }</div>
            <div className="h6-barlow-m text-blue6">-</div>
            <div className="h6-barlow-m text-blue6">{ data.matchTeams[1].result?.slice( 0, 1 ) }</div>
          </div>
        )}

        <div className="flex items-center">
          <div className="text-blue9 h5-barlow-m text-right uppercase w-14 md:mr-4">
            { data.matchTeams[1].team.slice( 0, 3 ) }
          </div>
          <Image
            src= {imgCountryRight?.flag || '/placeholder-image.png'}
            width={56}
            height={56}
            alt="flag"
            className='rounded-full'
            style={{ boxShadow: '0px 0px 14px rgba(0, 0, 0, 0.1)' }}
          />
        </div>
      </div>
      <div className="flex flex-row w-[280px] h-9 justify-end items-center md:mr-0 mr-4 md:mt-0 mt-3 right-0 absolute md:relative">
        <Badge size='md' variant={stateClass}>{ state }</Badge>
      </div>
    </div>

  )
}

export default RequestMatch