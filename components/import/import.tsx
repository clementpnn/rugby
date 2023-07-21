'use client'

import { useEffect } from 'react'
import Button from '@/components/buttons/button'
import { PiDownloadSimpleBold } from 'react-icons/pi'

const Import = () => {
  useEffect( () => {
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [] )
  return (
    <div className="bg-neutral0 w-full h-36 p-10 mr-5 flex justify-between rounded-xl">
      <div className="uppercase text-blue6 h2-barlow-m">import</div>
      <Button
        size='lg'
        icon={<PiDownloadSimpleBold className='w-full h-full ' />}
        iconPosition='left'
        variant='primary'
      >
        Import Users
      </Button>
    </div>
  )
}

export default Import
