'use client'

import * as React from 'react'
import Image from 'next/image'
import Badge from '@/components/ui/badge'
import useCountries from '@/hooks/useCountries'

function RequestMatch() {

  const { getByValue } = useCountries()

  const NEW_ZEALAND = getByValue( 'NEW ZEALAND' )
  const ITALY = getByValue( 'ITALY' )

  return (
    <div className="flex justify-center">
      <div className="flex justify-between flex-col md:flex-row items-start md:items-center border-y-2 w-full text-black h-[156px] px-5 md:px-20 py-4">
        <div className="w-[180px]">
          <div className="md:h4-barlow-m h5-barlow-m text-blue-600">20:00</div>
          <div className="md:label-md label-sm text-blue-400">Stade de Marseille</div>
        </div>
        <div className="flex items-center justify-between md:w-[384px] w-full md:mt-0">
          <div className="flex items-center w-36 justify-between">
            <Image
              src= { ITALY?.flag as string }
              width={50}
              height={150}
              alt="flag"
            />
            <div className="text-blue-900 h5-barlow-m">
              { ITALY?.label }
            </div>
          </div>
          <div className="h6-barlow-m text-blue-600">VS</div>
          <div className="flex items-center w-36 justify-between">
            <div className="text-blue-900 h5-barlow-m">
              { NEW_ZEALAND?.label }
            </div>
            <Image
              src= { NEW_ZEALAND?.flag as string }
              width={50}
              height={150}
              alt="flag"
            />
          </div>
        </div>
        <div className="flex flex-row w-[180px] h-9 justify-end items-center md:mr-0 mr-4 md:mt-0 mt-3 right-0 absolute md:relative">
          <Badge variant="accepted_light" size="lg" circle_size="lg" circle="accepted_dark" label="accepted"/>
        </div>
      </div>
    </div>
  )
}

export default RequestMatch