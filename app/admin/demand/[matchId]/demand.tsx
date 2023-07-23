'use client'

import toast from 'react-hot-toast'
import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'

import useStep, { STEPS } from '@/hooks/useStep'
import ImageContainer from '@/components/containers/image'
import Button from '@/components/buttons/button'
import { Demand, Match, MatchTeam, STATE, Stadium, Tribune, User } from '@prisma/client'
import { BsArrowReturnLeft } from 'react-icons/bs'
import Select from '@/components/inputs/select'
import Input from '@/components/inputs/input'

interface UserDemandInfo {
    demand: Demand
    user: User | null
  }

  interface MatchDetails {
    match: Match & {
      matchTeams: MatchTeam[]
      demands: UserDemandInfo[]
    }
    stadium: Stadium & {
      tribunes: Tribune[]
    }
  }

  interface DemandMatchProperties {
    matchData: MatchDetails | undefined
  }

const DemandMatch: React.FC<DemandMatchProperties> = ( { matchData } ) => {
  const [ isLoading, setIsloading ] = useState( false )
  const [ tribuneImage, setTribuneImage ] = useState( '' )
  const [ points, setPoints ] = useState<{name?: string, type?: 'JOURNALIST'|'PHOTOGRAPHER', places?: number, image?: string, x: number, y: number}[]>( [] )
  const [ userOptions, setUserOptions ] = useState<{value: string, label: string}[]>( [] )
  const [ tribune, setTribune ] = useState( '' )
  const { step, setStep } = useStep()
  const point = matchData?.match.demands
  point
  const router = useRouter()

  useEffect( () => {
    const userOptions = ( matchData?.match.demands || [] )
      .filter( ( demand ) => demand.demand.state === STATE.IN_PROGRESS )
      .map( ( demand ) => ( {
        value: demand.demand.id || '',
        label: `${demand?.user?.firstName} ${demand.user?.lastName}` || ''
      } ) )

    setUserOptions( userOptions )
  }, [ matchData ] )

  const { reset, watch, control, formState: { errors } } = useForm<any>( { defaultValues: { type: userOptions && userOptions[0] ? userOptions[0].value : '' }, mode: 'onChange' } )

  const userSelect = watch()

  const submit= async () => {
    setIsloading( true )

    await fetch( '/api/accepte', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify( { demandId: userSelect.type, points, tribuneId: tribune } ) } )
      .then( ( callback ) => {
        if ( callback.status === 200 ) {
          toast.success( `${callback.statusText}` )
          setStep( step - 1 as STEPS )
          reset()
          router.refresh()
        }
        if ( callback.status !== 200 ) {
          toast.error( `${callback.statusText}` )
          setIsloading( true )
        }
      } )
  }

  function countAcceptedDemands( tribune: Tribune, demands: UserDemandInfo[] ): number {
    // eslint-disable-next-line unicorn/no-array-reduce
    return demands.reduce( ( accumulator, demand ) => {
      if ( demand.demand.state === STATE.ACCEPTED && demand.demand.tribuneId === tribune.id ) {
        return accumulator + 1
      }
      return accumulator
    }, 0 )
  }

  let bodyContent = (
    <div>Loading...</div>
  )

  if ( step === STEPS.ONE ) {
    bodyContent = (
      <div className='flex h-full w-full'>
        <div className='bg-neutral0 m-6 mr-0 h-[calc(100%-48px)] w-full flex justify-center items-center rounded-md overflow-hidden' style={{ boxShadow: '0px 0px 14px rgba(0, 0, 0, 0.1)' }} >
          <ImageContainer
            image={matchData?.stadium.image as string}
            tribunes={matchData?.stadium.tribunes as Tribune[]}
          />
        </div>
        <div className='p-10 w-[480px] h-full flex flex-col'>
          <h2 className='h2-barlow-m text-blue6 mb-10'>SECTIONS PLACE</h2>
          <div className='w-full h-full bg-neutral1 rounded-md p-2 flex flex-col gap-y-2 overflow-auto scroll-smooth no-scrollbar'>
            {matchData?.stadium.tribunes.map( ( tribune, index ) => {
              const acceptedDemandsCount = countAcceptedDemands( tribune, matchData.match.demands )
              return (
                <div key={index} className='relative bg-neutral0 group cursor-pointer'>
                  <div className='flex flex-col p-8 rounded-md' onClick={() => {
                    setStep( step + 1 as STEPS )
                    setTribuneImage( tribune.image )
                    setTribune( tribune.id )
                  }} >
                    <p className='h6-barlow-m text-blue6'>TRIBUNE {index + 1}</p>
                    <p className='h5-inter-m text-blue9 mb-3'>{tribune.name}</p>
                    <p className='base-sm text-blue9'>For {tribune.type.charAt( 0 ).toUpperCase() + tribune.type.slice( 1 ).toLowerCase()}</p>
                    <p className='base-sm text-blue9'>Number of places : {acceptedDemandsCount} / {tribune.places.toString()}</p>
                  </div>
                </div>
              ) } ) }
          </div>
        </div>
      </div>
    )
  }

  const clamp = ( value: number, min: number, max: number ): number => { return Math.min( Math.max( value, min ), max )}

  const calculatePoint = ( event: React.MouseEvent<HTMLDivElement, MouseEvent>, pointSize: number ) => {
    const rect = ( event.target as Element ).getBoundingClientRect()
    let x = event.clientX - rect.left
    let y = event.clientY - rect.top
    x = clamp( x, pointSize, rect.width - pointSize )
    y = clamp( y, pointSize, rect.height - pointSize )
    return { x, y }
  }

  if ( step === STEPS.TWO ) {
    bodyContent = (
      <>
        <div className='flex h-full w-full'>
          <div className='bg-neutral0 m-6 mr-0 h-[calc(100%-48px)] w-full flex justify-center items-center rounded-md overflow-hidden' style={{ boxShadow: '0px 0px 14px rgba(0, 0, 0, 0.1)' }} >
            <ImageContainer image={tribuneImage} tribunes={points} onClick={ ( event ) => {
              const pointSize = 30
              const points = calculatePoint( event, pointSize )
              setPoints( previousPoints => [ ...previousPoints, { name: 'string', type: 'JOURNALIST', places: 0, image: '', x: points.x, y: points.y } ] )

              setStep( step + 1 as STEPS )
            }} />
          </div>
          <div className='p-10 w-[480px] h-full'>
            <h2 className='h2-barlow-m text-blue6 mb-10'>VALIDATE USERS</h2>
            <Button type='button' variant='outline' size='md' iconPosition='left' icon={<BsArrowReturnLeft className="w-full h-full" />} onClick={() => {
              setStep( step - 1 as STEPS )
              setTribuneImage( '' )
            }}>
              Back
            </Button>
            <p className='base-md text-blue9 my-6'>Click on the frame to attribute a place</p>
            <div className='w-full h-[calc(100%-260px)] bg-neutral1 rounded-md p-2 flex flex-col gap-y-2 overflow-auto scroll-smooth no-scrollbar'>
              {matchData?.match.demands
                .filter( ( demand ) => demand.demand.state === STATE.IN_PROGRESS )
                .map( ( demand, index ) => (
                  <div key={index} className='bg-neutral0 rounded-md p-4'>
                    <p className='label-md text-blue9'>{demand.user?.firstName} {demand.user?.lastName}</p>
                  </div>
                ) )
              }
            </div>
          </div>
        </div>
      </>
    )
  }

  if ( step === STEPS.THREE ) {
    bodyContent = (
      <>
        <div className='flex h-full w-full'>
          <div className='bg-neutral0 m-6 mr-0 h-[calc(100%-48px)] w-full flex justify-center items-center rounded-md overflow-hidden' style={{ boxShadow: '0px 0px 14px rgba(0, 0, 0, 0.1)' }} >
            <ImageContainer image={tribuneImage} tribunes={points} />
          </div>
          <div className='p-10 w-[480px] h-full'>
            <h2 className='h2-barlow-m text-blue6 mb-10'>PLACE ASSIGNATION</h2>
            <Button type='button' variant='outline' size='md' iconPosition='left' icon={<BsArrowReturnLeft className="w-full h-full" />} onClick={() => {
              setStep( step - 1 as STEPS )
            }}>
                Back
            </Button>
            <div className='grid gap-y-6 mt-6'>
              <Controller name="name" control={control} render={( { field } ) => <Input id='name' label='Stadium place' {...field} errors={errors} disabled={isLoading} />} />
              <Controller name="user" control={control} render={( { field } ) => <Select id='user' label='user' {...field} errors={errors} disabled={isLoading} options={userOptions || ''} />} />
              <form>
                <Button type='submit' variant='primary' className='w-full' size='md' onClick={() => {
                  setStep( step - 1 as STEPS )
                  submit()
                }}>
              Assign
                </Button>
              </form>
            </div>
          </div>
        </div>
      </>
    )
  }

  return (
    bodyContent
  )
}

export default DemandMatch