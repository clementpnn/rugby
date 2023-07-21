import { getMatchById } from '@/actions/getMatch'
import Button from '@/components/buttons/button'
import Sidebar from '@/components/sidebar/sidebar'
// import { DataTable } from '@/components/table/dataTable'
import Image from 'next/image'
import Link from 'next/link'
import { PiArrowUDownLeft, PiPrinter } from 'react-icons/pi'
// import { columns } from './columns'

interface IParameters {
  matchId: string
}

const page = async ( { params }: {params: IParameters} ) => {
  const match = await getMatchById( params )
  if ( !match ) {
    return(
      <p>not match</p>
    )
  }
  return (
    <div className='w-screen h-screen flex flex-row fixed'>
      <Sidebar/>
      <div className='w-full bg-neutral1 p-6 flex flex-col items-start gap-y-3'>
        <div className='flex flex-col items-start gap-y-6 bg-neutral1 w-full h-full rounded-md'>
          <div className='bg-neutral0 w-full h-fit rounded-md p-10 flex justify-between items-center'>
            <div className='w-[141px]'>
              <Link href={`/admin/match/information/${match.match.id}/`}>
                <Button size={'md'} variant={'outline'} iconPosition='left' icon={<PiArrowUDownLeft className='h-full w-full'/>}>
                  Back
                </Button>
              </Link>
            </div>
            <div className='flex flex-row items-center gap-x-8'>
              <div className='flex flex-row gap-x-4 items-center'>
                <Image src={`/flags/${match.match.matchTeams[0].team.slice( 0, 3 )}.svg`} alt={'flag'} width={60} height={60} className='rounded-full'/>
                <p className='w-[52px] h5-barlow-m text-blue9 text-right uppercase'>{match.match.matchTeams[0].team.slice( 0, 3 )}</p>
              </div>
              <div className='w-16 text-center'>
                <p className='h6-barlow-m text-blue6'>VS</p>
              </div>
              <div className='flex flex-row gap-x-4 items-center'>
                <p className='w-[52px] h5-barlow-m text-blue9 text-left uppercase'>{match.match.matchTeams[1].team.slice( 0, 3 )}</p>
                <Image src={`/flags/${match.match.matchTeams[1].team.slice( 0, 3 )}.svg`} alt={'flag'} width={60} height={60} className='rounded-full'/>
              </div>
            </div>
            <Button size={'md'} variant={'primary'} iconPosition='left' icon={<PiPrinter className='h-full w-full'/>}>
              Print Users
            </Button>
          </div>
          <div className='bg-neutral1 w-full h-full rounded-md grid grid-cols-3 gap-x-6'>
            <div className='bg-neutral0 rounded-md p-10 col-span-2 w-full max-h-[700px] overflow-auto no-scrollbar'>
              {/* <DataTable columns={columns} data={match.demands} /> */}
            </div>
            <div className='bg-neutral0 rounded-md p-10 col-span-1 w-full max-h-[700px] overflow-auto no-scrollbar'>
              {/* si un User est selectionné alors on affiche sa carte */}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default page