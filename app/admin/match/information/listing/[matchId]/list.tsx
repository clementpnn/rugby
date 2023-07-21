'use client'

import Button from '@/components/buttons/button'
import Sidebar from '@/components/sidebar/sidebar'
import { DataTable } from '@/components/table/dataTable'
import Image from 'next/image'
import Link from 'next/link'
import { PiArrowUDownLeft } from 'react-icons/pi'
import { columns } from './columns'
import useStep, { STEPS } from '@/hooks/useStep'
import { JOB, Match, MatchTeam, STATE } from '@prisma/client'

interface DemandInfo {
    demandState: STATE
    name: string
    company: string
    status: JOB
    email: string
    emailVerified: boolean
    amount: number
    accepted: number
    refused: number
    processing: number
  }

  interface ListProperties {
    match: Match & { matchTeams: MatchTeam[] }
    ACCEPTED: DemandInfo[]
    REJECTED: DemandInfo[]
    IN_PROGRESS: DemandInfo[]
  }

const List: React.FC<ListProperties> = ( { match, ACCEPTED, REJECTED, IN_PROGRESS } ) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  let { step, setStep } = useStep()

  let data: any[] = []

  switch ( step ) {
  case 0: {
    data = [ ...ACCEPTED, ...REJECTED, ...IN_PROGRESS ]
    break
  }
  case 1: {
    data = REJECTED
    break
  }
  case 2: {
    data = IN_PROGRESS
    break
  }
  case 3: {
    data = ACCEPTED
    break
  }
  }

  return (
    <div className='w-full h-screen flex flex-row fixed'>
      <Sidebar/>
      <div className='w-full h-screen bg-neutral1 p-6 flex flex-col items-start gap-y-3'>
        <div className='flex flex-col items-start gap-y-6 bg-neutral1 w-full h-full rounded-md'>
          <div className='bg-neutral0 w-full h-fit rounded-md p-10 flex justify-between items-center'>
            <div className='w-[155px]'>
              <Link href={`/admin/match/information/${match.id}/`}>
                <Button size={'md'} variant={'outline'} iconPosition='left' icon={<PiArrowUDownLeft className='h-full w-full'/>}>
                  Back
                </Button>
              </Link>
            </div>
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
            <div className='flex flex-row gap-x-4'>
              <Button variant={'primary'} size={'md'}>Stop</Button>
              <Button variant={'outline'} size={'md'}>Start</Button>
            </div>
          </div>
          <div className='bg-neutral0 w-full h-full rounded-md p-10 flex flex-col gap-y-12'>
            <div className='flex justify-between flex-row'>
              <p className={`h3-barlow-m uppercase
              ${step === STEPS.ONE ? 'text-blue6' : ''}
              ${step === STEPS.TWO ? 'text-red6' : ''}
              ${step === STEPS.THREE ? 'text-warning6' : ''}
              ${step === STEPS.FOUR ? 'text-success6' : ''}
              `}>
                {step === STEPS.ONE ? 'Postulants List' :
                  // eslint-disable-next-line unicorn/no-nested-ternary
                  ( step === STEPS.TWO ? 'Refuse List' : step === STEPS.THREE ? 'Wait List' : step === STEPS.FOUR ? 'Validate List' : '' )}
              </p>
              <Button variant={'primary'} size={'md'} className={`
               ${step === STEPS.ONE ? 'bg-blue6' : ''}
               ${step === STEPS.TWO ? 'bg-red6' : ''}
               ${step === STEPS.THREE ? 'bg-warning6' : ''}
               ${step === STEPS.FOUR ? 'bg-success6' : ''}
              `}>
                {step === STEPS.ONE ? 'Postulants List' :
                  // eslint-disable-next-line unicorn/no-nested-ternary
                  ( step === STEPS.TWO ? 'Refuse List' : step === STEPS.THREE ? 'Wait List' : step === STEPS.FOUR ? 'Validate List' : '' )}
              </Button>
            </div>
            <div className='flex justify-end gap-4 flex-row'>
              <Button variant='primary' size='md' onClick={() => setStep( step = 0 )}>Postulants List</Button>
              <Button variant='primary' size='md' className='bg-red6' onClick={() => setStep( step = 1 )}>Refuse List</Button>
              <Button variant='primary' size='md' className='bg-warning6' onClick={() => setStep( step = 2 )}>Wait List</Button>
              <Button variant='primary' size='md' className='bg-success6' onClick={() => setStep( step = 3 )}>Validate List</Button>
            </div>
            {/* remplacer 500px */}
            <div className='w-full max-h-[500px] overflow-auto no-scrollbar'>
              <DataTable columns={columns} data={data} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default List