'use client'

import Button from '../buttons/button'
import useIsPools from '@/hooks/usePoolsOrKnockouts'

const InformationBar = () => {
  const { isPools, setIsPools } = useIsPools()
  return (
    <div className='bg-neutral0 w-screen h-fit flex flex-row justify-between items-center px-20 pb-12 pt-[72px] border-b-[1px] border-neutral3'>
      <p className='text-blue6 h1-barlow-m'>INFORMATION</p>
      <div className='flex flex-row gap-x-4'>
        <Button variant={isPools ? 'primary' : 'outline'} size={'md'} onClick={() => setIsPools( true )}>Pools</Button>
        <Button variant={isPools ? 'outline' : 'primary'} size={'md'} onClick={() => setIsPools( false )}>Knockouts</Button>
      </div>
    </div>
  )
}

export default InformationBar
