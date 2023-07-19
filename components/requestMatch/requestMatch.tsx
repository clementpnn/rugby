'use client'

import Image from 'next/image'
import Badge from '@/components/ui/badge'
import { MatchInformation } from '../modals/modalJoinWaitList'
import useCountries from '@/hooks/useCountries'
import { RESULT } from '@prisma/client'
// import { formatString } from '../modals/modalJoinWaitList'
interface MatchProperties {
  // variant: 'accepted_light' | 'rejected_light' | 'progress_light' | 'accepted_dark' | 'rejected_dark' | 'progress_dark'
  // label: string
  data: MatchInformation
  state: string
  stateClass: 'accepted_light' | 'rejected_light' | 'progress_light' | 'accepted_dark' | 'rejected_dark' | 'progress_dark'
}

const RequestMatch: React.FC<MatchProperties> = ( { data, stateClass, state } ) => {
  const { getByValue } = useCountries()
  const imgCountryLeft = getByValue( data.score.countryA )
  const imgCountryRight = getByValue( data.score.countryB )
  return (
    <div className="flex justify-between flex-col md:flex-row items-start md:items-center border-y-[1px] w-full h-fit px-5 md:px-20 py-6">
      <div className="w-[180px] flex flex-col items-start gap-y-2">
        <div className="md:h4-barlow-m h5-barlow-m text-blue6">{ data.time }</div>
        <div className="md:label-md label-sm text-blue6">{ data.stadium }</div>
      </div>
      <div className="flex items-center justify-center gap-x-10 md:w-hug w-full md:mt-0">
        <div className="flex items-center justify-end">
          <Image
            src= {imgCountryLeft?.flag || '/placeholder-image.png'}
            width={56}
            height={150}
            alt="flag"
          />
          <div className="text-blue9 h5-barlow-m uppercase text-left w-14 md:ml-4">
            { data.score.countryA.slice( 0, 3 ) }
          </div>
        </div>
        { data.score.scoreA===RESULT.NO_PLAYED || data.score.scoreB===RESULT.NO_PLAYED ? (
          <div className="h6-barlow-m text-blue6 flex justify-center w-16">VS</div>
        ) : (
          <div className="flex row w-16 justify-between">
            <div className="h6-barlow-m text-blue6">{ data.score.scoreA.slice( 0, 1 ) }</div>
            <div className="h6-barlow-m text-blue6">-</div>
            <div className="h6-barlow-m text-blue6">{ data.score.scoreB.slice( 0, 1 ) }</div>
          </div>
        )}

        <div className="flex items-center">
          <div className="text-blue9 h5-barlow-m text-right uppercase w-14 md:mr-4">
            { data.score.countryB.slice( 0, 3 ) }
          </div>
          <Image
            src= {imgCountryRight?.flag || '/placeholder-image.png'}
            width={56}
            height={150}
            alt="flag"
          />
        </div>
      </div>
      <div className="flex flex-row w-[180px] h-9 justify-end items-center md:mr-0 mr-4 md:mt-0 mt-3 right-0 absolute md:relative">
        <Badge size='md' variant={stateClass}>{ state }</Badge>
      </div>
    </div>

  )
}

export default RequestMatch