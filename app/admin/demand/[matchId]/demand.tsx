'use client'

import toast from 'react-hot-toast'
import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'

import useStep, { STEPS } from '@/hooks/useStep'
import ImageContainer from '@/components/containers/image'
import Button from '@/components/buttons/button'
import Select from '@/components/inputs/select'
import { Demand, Match, MatchTeam, STATE, Stadium, Tribune, User } from '@prisma/client'

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
  // eslint-disable-next-line no-console

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
        <div className='p-10 w-[480px] h-full'>
          <h2 className='h2-barlow-m text-blue6 mb-10'>SECTIONS PLACE</h2>
          {matchData?.stadium.tribunes.map( ( tribune, index ) => {
            const acceptedDemandsCount = countAcceptedDemands( tribune, matchData.match.demands )
            return (
              <div key={index} className='relative group cursor-pointer'>
                <div className='flex p-8 justify-around border border-spacing-2 m-8' onClick={() => {
                  setStep( step + 1 as STEPS )
                  setTribuneImage( tribune.image )
                  setTribune( tribune.id )
                }} >
                  <p> Index : {index + 1}</p>
                  <p>Name : {tribune.name}</p>
                  <p>Type : {tribune.type}</p>
                  <p>Number of places : {acceptedDemandsCount} / {tribune.places.toString()}</p>
                </div>
              </div>
            ) } ) }
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
        <ImageContainer image={tribuneImage} tribunes={points} onClick={ ( event ) => {
          const pointSize = 30
          const points = calculatePoint( event, pointSize )
          setPoints( previousPoints => [ ...previousPoints, { name: 'string', type: 'JOURNALIST', places: 0, image: '', x: points.x, y: points.y } ] )

          setStep( step + 1 as STEPS )
        }} />
        <div>
          {matchData?.match.demands
            .filter( ( demand ) => demand.demand.state === STATE.IN_PROGRESS )
            .map( ( demand, index ) => (
              <div key={index}>
                <p>{demand.user?.firstName} {demand.user?.lastName}</p>
              </div>
            ) )
          }
          <Button type='button' variant='outline' size='md' onClick={() => {
            setStep( step - 1 as STEPS )
            setTribuneImage( '' )
          }}>
            Cancel
          </Button>
        </div>
      </>
    )
  }

  if ( step === STEPS.THREE ) {
    bodyContent = (
      <>
        <div>
          <Controller name="user" control={control} render={( { field } ) => <Select id='user' label='user' {...field} errors={errors} disabled={isLoading} options={userOptions || ''} />} />
        </div>
        <Button type='button' variant='outline' size='md' onClick={() => {
          setStep( step - 1 as STEPS )
        }}>
            Cancel
        </Button>
        <form>
          <Button type='submit' variant='primary' size='md' onClick={() => {
            setStep( step - 1 as STEPS )
            submit()
          }}>
            Valider
          </Button>
        </form>
      </>
    )
  }

  return (
    bodyContent
  )
}

export default DemandMatch