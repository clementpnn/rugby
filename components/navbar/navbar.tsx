'use client'

import Image from 'next/image'
import Button from '../buttons/button'
import Link from 'next/link'

const Navbar = () => {
  return(
    <div className="bg-neutral0 w-screen h-fit px-20 py-6 border-b border-neutral3 flex flex-row justify-between items-center">
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
            <Button variant={'secondary'} size={'md'}>
              Schedule
            </Button>
          </Link>
          <Link href={'/'}>
            <Button variant={'secondary'} size={'md'}>
              Information
            </Button>
          </Link>
          <Link href={'/'}>
            <Button variant={'secondary'} size={'md'}>
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
