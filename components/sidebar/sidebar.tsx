'use client'

import { PiDownloadSimpleBold } from 'react-icons/pi'
import { PiPlusSquare } from 'react-icons/pi'
import { MdOutlineStadium } from 'react-icons/md'
import { MdOutlineScoreboard } from 'react-icons/md'
import { LuLogOut } from 'react-icons/lu'
import Image from 'next/image'
import Button from '@/components/buttons/button'
import Link from 'next/link'
import { styled } from '@stitches/react'

const Sidebar = () => {
  const ThickPiDownloadSimpleBold = styled( PiDownloadSimpleBold, {
    strokeWidth: '1px'
  } )
  const ThickMdOutlineStadium = styled( MdOutlineStadium, {
    strokeWidth: '0px'
  } )
  const ThickPiPlusSquare = styled( PiPlusSquare, {
    strokeWidth: '6px'
  } )
  const ThickMdOutlineScoreboard = styled( MdOutlineScoreboard, {
    strokeWidth: '0px'
  } )
  const ThickLuLogOut = styled( LuLogOut, {
    strokeWidth: '2.2px'
  } )
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
          <Link href="/admin/import">
            <Button variant='secondary' size='iconLg'>
              <ThickPiDownloadSimpleBold className='h-6 w-6'/>
            </Button>
          </Link>
          <Link href="/adminStadium">
            <Button variant='secondary' size='iconLg'>
              <ThickMdOutlineStadium className='h-6 w-6'/>
            </Button>
          </Link>
          <Link href="/adminMatch">
            <Button variant='secondary' size='iconLg'>
              <ThickPiPlusSquare className='h-6 w-6'/>
            </Button>
          </Link>
          <Link href="/adminSad">
            <Button variant='secondary' size='iconLg'>
              <ThickMdOutlineScoreboard className='h-6 w-6'/>
            </Button>
          </Link>
        </div>
      </div>
      <div>
        <Button variant='secondary' size='iconLg'>
          <ThickLuLogOut className='h-6 w-6'/>
        </Button>
      </div>
    </div>
  )
}

export default Sidebar
