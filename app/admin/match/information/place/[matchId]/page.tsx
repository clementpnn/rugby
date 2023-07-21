import { getMatchUpdateById } from '@/actions/getMatch'
import Button from '@/components/buttons/button'
import Sidebar from '@/components/sidebar/sidebar'
import Image from 'next/image'
import Link from 'next/link'
import { PiArrowUDownLeft } from 'react-icons/pi'

interface IParameters {
  matchId: string
}

const page = async ( { params }: {params: IParameters} ) => {
  const match = await getMatchUpdateById( params )
  if ( !match ) {
    return(
      <p>not match</p>
    )
  }
  return (
    <div className="w-screen h-screen flex flex-row">
      <Sidebar/>
      <div className='w-full bg-neutral1 p-6 flex flex-col items-start gap-y-3'>
        <div className='flex flex-col items-start gap-y-6 bg-neutral1 w-full h-full rounded-md'>
          <div className='bg-neutral0 w-full h-fit rounded-md p-10 flex justify-between items-center'>
            <Link href={`/admin/match/information/${match.id}/`}>
              <Button size={'md'} variant={'outline'} iconPosition='left' icon={<PiArrowUDownLeft className='h-full w-full'/>}>
                Back
              </Button>
            </Link>
            <div className='flex flex-row items-center gap-x-8'>
              <div className='flex flex-row gap-x-4 items-center'>
                <Image src={`/flags/${match.matchTeams[0].team.slice( 0, 3 )}.svg`} alt={'flag'} width={60} height={60} className='rounded-full'/>
                <p className='w-[52px] h5-barlow-m text-blue9 text-right uppercase'>{match.matchTeams[0].team.slice( 0, 3 )}</p>
              </div>
              <div className='w-16 text-center'>
                <p className='h6-barlow-m text-blue6'>VS</p>
              </div>
              <div className='flex flex-row gap-x-4 items-center'>
                <p className='w-[52px] h5-barlow-m text-blue9 text-left uppercase'>{match.matchTeams[1].team.slice( 0, 3 )}</p>
                <Image src={`/flags/${match.matchTeams[1].team.slice( 0, 3 )}.svg`} alt={'flag'} width={60} height={60} className='rounded-full'/>
              </div>
            </div>
            <div className='text-neutral0 w-[99px]'>
            </div>
          </div>
          <div className='bg-neutral0 w-full h-full rounded-md p-10 flex flex-row gap-x-10'>
            <span>PLACE PAGE</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default page