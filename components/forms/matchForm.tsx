'use client'

import { useState } from 'react'
import { SubmitHandler, useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'react-hot-toast'
import Button from '../buttons/button'
import Input from '../inputs/input'
import Select from '../inputs/select'
import { MatchUpdateSchema } from '@/types/forms'
import { Match, MatchTeam } from '@prisma/client'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import useCountries from '@/hooks/useCountries'

interface MatchFormProperties {
    match: ( Match & { matchTeams: MatchTeam[] } )
}

const MatchForm: React.FC<MatchFormProperties> = ( { match } ) => {
  const [ isLoading, setIsloading ] = useState( false )
  const router = useRouter()

  const { handleSubmit, control, setValue, formState: { errors } } = useForm( {
    resolver: zodResolver( MatchUpdateSchema ),
    defaultValues: match ? {
      team1Result: match.matchTeams[0]?.result as string || 'NO_PLAYED',
      team2Result: match.matchTeams[1]?.result as string || 'NO_PLAYED',
      team1Points: undefined,
      team2Points: undefined,
      team1Bonus: undefined,
      team2Bonus: undefined,
      team1DefenseBonus: undefined,
      team2DefenseBonus: undefined
    } : {},
    mode: 'onChange'
  } )

  const onSubmit: SubmitHandler<any> = async ( data ) => {
    setIsloading( true )

    await fetch( '/api/match', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify( { matchId: match?.id, ...data } )
    } )
      .then( ( callback ) => {
        if ( callback.status === 200 ) {
          toast.success( `${callback.statusText}` )
          router.refresh()
        }
        if ( callback.status !== 200 ) { toast.error( `${callback.statusText}` ) }
      } )

    setIsloading( false )
  }

  const resultOptions = [ { value: 'WINNER', label: 'Win' }, { value: 'LOSER', label: 'Loss' }, { value: 'NULL', label: 'Draw' }, { value: 'NO_PLAYED', label: 'No played' } ]

  const handleTeam1ResultChange = ( value: any ) => {
    switch ( value ) {
    case 'WINNER': {
      setValue( 'team2Result', 'LOSER' )
      break
    }
    case 'LOSER': {
      setValue( 'team2Result', 'WINNER' )
      break
    }
    case 'NULL':
    case 'NO_PLAYED': {
      setValue( 'team2Result', value )
      break
    }
    }
  }

  const handleTeam2ResultChange = ( value: any ) => {
    switch ( value ) {
    case 'WINNER': {
      setValue( 'team1Result', 'LOSER' )
      break
    }
    case 'LOSER': {
      setValue( 'team1Result', 'WINNER' )
      break
    }
    case 'NULL':
    case 'NO_PLAYED': {
      setValue( 'team1Result', value )
      break
    }
    }
  }

  const { getByValue } = useCountries()
  const imgCountryLeft = getByValue( match.matchTeams[0].team )
  const imgCountryRight = getByValue( match.matchTeams[1].team )

  // eslint-disable-next-line no-console
  console.log( match.matchTeams )

  return (
    <div className='flex justify-center items-center'>
      <form onSubmit={handleSubmit( onSubmit )} className='w-[400px]'>
        <div className='h-fit flex flex-col max-w-[400px]'>
          <div className="flex items-center justify-center gap-x-10 mb-10 md:w-hug w-full md:mt-0">
            <div className="flex items-center justify-end ">
              <Image
                src= {imgCountryLeft?.flag || '/placeholder-image.png'}
                width={56}
                height={56}
                alt="flag"
                className='rounded-full'
                style={{ boxShadow: '0px 0px 14px rgba(0, 0, 0, 0.1)' }}
              />
              <div className="text-blue9 h5-barlow-m uppercase text-left w-14 md:ml-4">
                { match.matchTeams[0].team.slice( 0, 3 ) }
              </div>
            </div>
            <div className="h6-barlow-m text-blue6 flex justify-center w-16">VS</div>
            <div className="flex items-center">
              <div className="text-blue9 h5-barlow-m text-right uppercase w-14 md:mr-4">
                { match.matchTeams[1].team.slice( 0, 3 ) }
              </div>
              <Image
                src= {imgCountryRight?.flag || '/placeholder-image.png'}
                width={56}
                height={56}
                alt="flag"
                className='rounded-full'
                style={{ boxShadow: '0px 0px 14px rgba(0, 0, 0, 0.1)' }}
              />
            </div>
          </div>
        </div>
        <div className='flex flex-col gap-y-10'>
          <div className='flex flex-col gap-y-8'>
            <div className='grid gap-y-2'>
              <Controller
                name='team1Result'
                control={control}
                render={( { field } ) => (
                  <Select
                    id='team1Result'
                    label={match.matchTeams[0].team}
                    {...field}
                    disabled={isLoading}
                    value={field.value || 'NO_PLAYED'}
                    options={resultOptions}
                    onChange={( value ) => {
                      field.onChange( value )
                      handleTeam1ResultChange( value )
                    }}
                  />
                )}
              />
              <div className='grid grid-cols-3 gap-x-4'>
                <Controller name="team1Points" control={control} render={( { field } ) => <Input id='team1Points' placeholder='Pts' type='number' {...field} errors={errors} disabled={isLoading} />}/>
                <Controller name="team1Bonus" control={control} render={( { field } ) => <Input id='team1Bonus' placeholder='B' type='number' {...field} errors={errors} disabled={isLoading} />}/>
                <Controller name="team1DefenseBonus" control={control} render={( { field } ) => <Input id='team1DefenseBonus' placeholder='DP' type='number' {...field} errors={errors} disabled={isLoading} />}/>
              </div>
            </div>
            <div className='grid gap-y-2'>
              <Controller
                name='team2Result'
                control={control}
                render={( { field } ) => (
                  <Select
                    id='team2Result'
                    label={match.matchTeams[1].team}
                    {...field}
                    disabled={isLoading}
                    value={field.value || 'NO_PLAYED'}
                    options={resultOptions}
                    onChange={( value ) => {
                      field.onChange( value )
                      handleTeam2ResultChange( value )
                    }}
                  />
                )}
              />
              <div className='grid grid-cols-3 gap-x-4'>
                <Controller name="team2Points" control={control} render={( { field } ) => <Input id='team2Points' placeholder='Pts' type='number' {...field} errors={errors} disabled={isLoading} />}/>
                <Controller name="team2Bonus" control={control} render={( { field } ) => <Input id='team2Bonus' placeholder='B' type='number' {...field} errors={errors} disabled={isLoading} />}/>
                <Controller name="team2DefenseBonus" control={control} render={( { field } ) => <Input id='team2DefenseBonus' placeholder='DP' type='number' {...field} errors={errors} disabled={isLoading} />}/>
              </div>
            </div>

          </div>

          <Button className='w-full' disabled={isLoading} type='submit' variant='primary' size='md'>
            Update
          </Button>
        </div>

      </form>
    </div>
  )
}

export default MatchForm
