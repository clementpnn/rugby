import * as React from 'react'
import Image from 'next/image'
import Button from '@/components/buttons/button'
import { LuLogOut } from 'react-icons/lu'

type ProfileCardProperties = {
  showLogoutButton: boolean;
};

const ProfileCard = ( { showLogoutButton }: ProfileCardProperties ) => {
  return (
    <div className='flex items-center'>
      <div className='bg-neutral0 rounded-lg border border-neutral3 max-w-[350px] mx-auto'>
        <div className='bg-blue6 rounded-t-lg flex items-center justify-between text-neutral0 p-4'>
          <h1 className='h6-barlow-m uppercase'>Tournament Pass</h1>
          <Image
            src='/images/logoWhiteInline.svg'
            height={24}
            width={66}
            alt='logo White inline'
          />
        </div>
        <div className='flex flex-col lg:flex-row'>
          <div className='w-full lg:w-[112px] p-4'>
            <Image
              src=''
              alt='Profile Photo'
              className='w-full h-[112px] rounded-lg'
            />
          </div>
          <div className='w-full lg:w-[202px] p-4'>
            <h2 className='text-blue10 h5-barlow-m uppercase'>Albus Trouduc</h2>
            <p className='text-neutral5 label-sm pb-5 pt-2'>Journaliste Poudlard</p>
            {showLogoutButton && (
              <Button
                className='text-blue9'
                variant='outline'
                size='sm'
                icon={<LuLogOut className='w-full h-full text-blue9' />}
                iconPosition='left'
              >
                Logout
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileCard