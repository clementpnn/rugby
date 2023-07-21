'use client'

import { TeamsData } from '@/app/knockouts/knockoutslayout'
import Knockout from './knockout'

const MatchResults = async () => {
  return(
    <div className="h-[678px] w-[978px]">
      <div className='flex flex-row h5-barlow-m pb-12'>
        <div className='text-blue-600 ml-[65px]'>QUARTER FINAL</div>
        <div className='text-blue-600 ml-[210px]'>SEMI FINAL</div>
        <div className='text-blue-600 ml-[265px]'>FINAL</div>
      </div>
      <div className='flex flex-row'>
        <div className='space-y-[62px]'>
          <div className='space-y-8'>
            <Knockout data={TeamsData[0]}/>
            <Knockout data={TeamsData[1]}/>
          </div>
          <div className='space-y-8'>
            <Knockout data={TeamsData[2]}/>
            <Knockout data={TeamsData[3]}/>
          </div>
        </div>
        <div className='space-y-[192px] mt-[65px]'>
          <div className=' flex justify-items-end'>
            <div className='border-y-[1px] border-r-[1px] border-neutral-200 border-solid w-[32px] h-[164px]'></div>
            <div className='w-[36px] h-[82px] border-b-[1px] border-neutral-200 border-solid'></div>
          </div>
          <div className=' flex justify-items-end'>
            <div className='border-y-[1px] border-r-[1px] border-neutral-200 border-solid w-[32px] h-[164px]'></div>
            <div className='w-[36px] h-[82px] border-b-[1px] border-neutral-200 border-solid'></div>
          </div>
        </div>
        <div className='mt-[81px] space-y-[225px]'>
          <Knockout data={TeamsData[4]}/>
          <Knockout data={TeamsData[5]}/>
        </div>
        <div className=' flex justify-itemsf-end mt-[146px]'>
          <div className='border-y-[1px] border-r-[1px] border-neutral-200 border-solid w-[32px] h-[357px]'></div>
          <div className='w-[36px] h-[178px] border-b-[1px] border-neutral-200 border-solid'></div>
        </div>
        <div className='mt-[258px]'>
          <Knockout data={TeamsData[6]}/>
        </div>
      </div>
    </div>
  )
}
export default MatchResults