'use client'

import Image from 'next/image'
import Badge from '@/components/ui/badge'
import { matchData } from '@/app/table/match'

interface MatchProperties {
  variant: 'accepted_light' | 'rejected_light' | 'progress_light' | 'accepted_dark' | 'rejected_dark' | 'progress_dark'
  label: string
}

const RequestMatch: React.FC<MatchProperties> = ( { variant, label } ) => {

  return (
    <div className="flex justify-center">
      <div className="flex justify-between flex-col md:flex-row items-start md:items-center border-y-2 w-full text-black h-[156px] px-5 md:px-20 py-4">
        <div className="w-[180px]">
          <div className="md:h4-barlow-m h5-barlow-m text-blue-600">{ matchData[0].data.hour }</div>
          <div className="md:label-md label-sm text-blue-400">{ matchData[0].data.place }</div>
        </div>
        <div className="flex items-center justify-between md:w-[384px] w-full md:mt-0">
          <div className="flex items-center justify-end">
            <Image
              src= { matchData[0].data.firstTeamFlag as string }
              width={50}
              height={150}
              alt="flag"
            />
            <div className="text-blue-900 h5-barlow-m md:pl-4 pl-3">
              { matchData[0].data.firstTeam }
            </div>
          </div>
          { matchData[0].data.finish ? (
            <div className="h6-barlow-m text-blue-600 flex justify-center w-16">VS</div>
          ) : (
            <div className="flex row w-16 justify-between">
              <div className="h6-barlow-m text-blue-600">{ matchData[0].data.GPFirst }</div>
              <div className="h6-barlow-m text-blue-600">-</div>
              <div className="h6-barlow-m text-blue-600">{ matchData[0].data.GPSecond }</div>
            </div>
          )}

          <div className="flex items-center">
            <div className="text-blue-900 h5-barlow-m md:pr-4 pr-3">
              { matchData[0].data.secondTeam }
            </div>
            <Image
              src= { matchData[0].data.secondTeamFlag as string }
              width={50}
              height={150}
              alt="flag"
            />
          </div>
        </div>
        <div className="flex flex-row w-[180px] h-9 justify-end items-center md:mr-0 mr-4 md:mt-0 mt-3 right-0 absolute md:relative">
          <Badge variant={variant} size="md">{ label }</Badge>
        </div>
      </div>
    </div>
  )
}

export default RequestMatch