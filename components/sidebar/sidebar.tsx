'use client'

import { PiDownloadSimpleBold } from 'react-icons/pi';
import { PiPlusSquare } from 'react-icons/pi';
import { PiListMagnifyingGlass } from 'react-icons/pi';
import { PiIdentificationCard } from 'react-icons/pi';
import { MdOutlineLogout } from 'react-icons/md';
import Image from 'next/image';
import Button from '@/components/buttons/button'
import Link from 'next/link'

const Sidebar = () => {
  return (
    <div className="bg-neutral0 h-screen w-fit px-6 py-[60px] flex flex-col justify-between">
      <div className='flex flex-col gap-y-12 items-center w-fit'>
        <div>
        <Link href="/adminHome">
          <Image
            src='/images/logoBlueNoText.svg'
            width={40}
            height={40}
            alt='Logo blue to text'
          />
        </Link>  
        </div>
        <div className='flex flex-col gap-y-6 items-center w-fit'>
        <Link href="/adminImport">
          <Button variant='secondary' size='iconLg'>
            <PiDownloadSimpleBold className='h-6 w-6'/>
          </Button>
        </Link>
        <Link href="/adminMatch">
          <Button variant='secondary' size='iconLg'>
            <PiPlusSquare className='h-6 w-6'/>
          </Button>
        </Link>
        <Link href="/adminStadium">
          <Button variant='secondary' size='iconLg'>
            <PiListMagnifyingGlass className='h-6 w-6'/>
          </Button>
        </Link>
        <Link href="/adminSad">
          <Button variant='secondary' size='iconLg'>
            <PiIdentificationCard className='h-6 w-6'/>
          </Button>
        </Link>
        </div>
      </div>
      <div>
        <Button variant='secondary' size='iconLg'>
          <MdOutlineLogout className='h-6 w-6'/>
        </Button>
      </div>
    </div>
  );
}

export default Sidebar;
