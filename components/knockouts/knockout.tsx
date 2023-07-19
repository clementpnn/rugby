'use client'

import Image from 'next/image'
import useCountries from '@/hooks/useCountries'
import { Teams } from '@/app/knockouts/knockoutslayout'
import { formatString } from '@/components/modals/modalJoinWaitList'

interface KnockoutsProperties{
    data: Teams
}

const Knockout: React.FC<KnockoutsProperties> = ( { data } ) => {
  const { getByValue } = useCountries()
  const country1 = getByValue( data.data[0].teamName )
  const country2 = getByValue( data.data[1].teamName )
  return(
    <div className=' h-[120px w-[278px]'>
      <div className='flex px-6 py-4 justify-between items-center rounded-t-lg border-neutral-200 border-solid border-[1px]'>
        <div className='flex space-x-3 '>
          <Image src={ country1?.flag || '/placeholder-image.png'} alt='Flag' width={'28'} height={'28'} className={'mr-4'}/>
          <div className='text-blue-900 h6-inter-d '>{formatString( data.data[0].teamName )}</div>
        </div>
        <div className='h6-barlow-m text-blue-700 w-7 text-center'>{data.data[0].result}</div>
      </div>
      <div className='flex px-6 py-4 justify-between items-center rounded-b-lg border-neutral-200 border-solid border-[1px]'>
        <div className='flex space-x-3'>
          <Image src={ country2?.flag || '/placeholder-image.png'} alt='Flag' width={'28'} height={'28'} className={'mr-4'}/>
          <div className='text-blue-900 h6-inter-d w-[140px]'>{formatString( data.data[1].teamName )}</div>
        </div>
        <div className='h6-barlow-m text-blue-700 w-7 text-center'>{data.data[1].result}</div>
      </div>
    </div>
  )
}
export default Knockout