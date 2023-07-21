'use client'

import * as React from 'react'
import { AiOutlineMenu } from 'react-icons/ai'
import { AiOutlineClose } from 'react-icons/ai'
import Image from 'next/image'
// import { Button } from '@/components/ui/button'
import { useState } from 'react'
// import autoAnimate from '@formkit/auto-animate'
// import { useAutoAnimate } from '@formkit/auto-animate/react'

function Menu() {
  const [ showDrawer, setShowDrawer ] = useState( false )

  const handleShowDrawer = () => {
    setShowDrawer( !showDrawer )
  }

  // const [parent] = useAutoAnimate()

  return (
    <div className='flex justify-center'>
      <div className='fixed bottom-8 bg-blue6 w-[calc(100vw-40px)] h-fit pl-5 pr-1.5 py-2 rounded-lg max-w-[350px]'>
        {showDrawer &&
                    <div className='grid grid-cols-1  gap-y-2 mt-5 mb-4 pr-3.5' onClick={handleShowDrawer}>
                      <button className='text-left px-6 py-3 rounded-md border border-blue-400 text-white hover:bg-blue-500 focus:bg-blue-400'>Pools</button>
                      <button className='text-left px-6 py-3 rounded-md border border-blue-400 text-white hover:bg-blue-500 focus:bg-blue-400'>Knock-out</button>
                      <button className='text-left px-6 py-3 rounded-md border border-blue-400 text-white hover:bg-blue-500 focus:bg-blue-400'>Profil</button>
                    </div>
        }
        <div className='flex justify-between'>
          <Image
            src='/image/logoWhiteInline.svg'
            width={100}
            height={36}
            alt='Picture of the author'
          />
          {showDrawer ?
            <button className='p-4' onClick={handleShowDrawer}><AiOutlineClose className='w-6 h-6 fill-white'/></button>
            :
            <button className='p-4' onClick={handleShowDrawer}><AiOutlineMenu className='w-6 h-6 fill-white'/></button>
          }
        </div>
      </div>
    </div>
  )
}

export default Menu