'use client'

import Image from 'next/image'
import Button from '../buttons/button'
import Link from 'next/link'
import { SetStateAction, useState } from 'react'

const Navbar = () => {
  const [ activeButton, setActiveButton ] = useState( 'Information' )

  const handleButtonClick = ( buttonName: SetStateAction<string> ) => {
    setActiveButton( buttonName )
  }
  return(
    <div className="bg-neutral0 w-screen h-fit px-20 py-6 border-b-[1px] border-neutral3 flex flex-row justify-between items-center">
      <div className='flex flex-row gap-x-12'>
        <Link href={'/'}>
          <Image
            src={'/images/logoBlueInline.svg'}
            height={48}
            width={132}
            alt='blue logo inline'
          />
        </Link>
        <div className='flex flex-row'>
          <Link href={'/'}>
            <Button variant='secondary' className={activeButton === 'schedule' ? 'text-blue6' : 'text-blue9'} size={'md'} onClick={() => handleButtonClick( 'schedule' )}>
              Schedule
            </Button>
          </Link>
          <Link href={'/'}>
            <Button variant='secondary' className={activeButton === 'Information' ? 'text-blue6' : 'text-blue9'} size={'md'} onClick={() => handleButtonClick( 'Information' )}>
              Information
            </Button>
          </Link>
          <Link href={'/'}>
            <Button variant='secondary' className={activeButton === 'Profile' ? 'text-blue6' : 'text-blue9'} size={'md'} onClick={() => handleButtonClick( 'Profile' )}>
              Profile
            </Button>
          </Link>
        </div>
      </div>
      <Button size={'lg'}>
        Official Website
      </Button>
    </div>
  )
}

export default Navbar
