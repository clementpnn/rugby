'use client'

import { useEffect } from 'react'
import Button from '@/components/buttons/button'
import { CiImport } from 'react-icons/ci'

const Import = async () => {
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
        icon={<CiImport className='w-full h-full ' />}
        iconPosition='left'
        variant='primary'
        className="label-md-bold"
      >
                Import Users
      </Button>
    </div>
  )
}

export default Import
