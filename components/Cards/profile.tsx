'use client'

import * as React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { useState } from 'react'

const ProfileCard = () => {
  return (
    <div className='flex justify-center items-center min-h-screen'>
      <div className='bg-neutral0 rounded-lg border border-neutral3 max-w-2xl mx-auto'>
        <div className='bg-blue6 rounded-t-lg'>
          <div className='flex items-center justify-between text-neutral0 p-4'>
            <h1 className='text-2xl font-bold'>Tournament Pass</h1>
            <Image src='' alt='Logo' className='w-8 h-8'/>
          </div>
        </div>
        <div className='flex flex-col lg:flex-row p-4'>
          <Image src='' alt='Profile Photo' className='w-full lg:w-1/2 mr-4 rounded-lg mb-4 lg:mb-0' />
          <div>
            <h2 className='text-blue10 font-bold text-3xl'>Albus Trouduc</h2>
            <p className='text-neutral5 mb-4 pt-2'>
          Journaliste Poudlarddzdzdzdzdzddz
            </p>
            <Button className='text-neutral10 ' size='sm' variant='outline'>
          Logout
            </Button>
          </div>
        </div>
      </div>
    </div>

  )
}


export default ProfileCard

