'use client'

import Image from 'next/image'
import Button from '../buttons/button'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const Navbar = () => {
  // const [ activeButton, setActiveButton ] = useState( 'Information' )
  const pathname = usePathname()

  // const handleButtonClick = ( buttonName: SetStateAction<string> ) => {
  //   setActiveButton( buttonName )
  // }
  return(
    <div className="bg-neutral0 w-full h-fit px-20 py-6 border-b-[1px] border-neutral3 flex flex-row justify-between items-center">
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
          <Link href={'/user/planning'}>
            <Button variant='secondary' className={`${pathname === '/user/planning' ? 'ext-blue6' : 'text-blue9'}`} size={'md'}>
              Schedule
            </Button>
          </Link>
          <Link href={'/user/information'}>
            <Button variant='secondary' className={`${pathname === '/user/information' ? 'ext-blue6' : 'text-blue9'}`} size={'md'}>
              Information
            </Button>
          </Link>
          <Link href={''}>
            <Button variant='secondary' className={`${pathname === '/admin/update' ? 'ext-blue6' : 'text-blue9'}`} size={'md'}>
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
