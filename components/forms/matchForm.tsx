'use client'

import { useState } from 'react'
import { SubmitHandler, useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'react-hot-toast'
import Image from 'next/image'
import Button from '../buttons/button'
import Input from '../inputs/input'
import Select from '../inputs/select'
import { MatchUpdateSchema } from '@/types/forms'
import Container from '../containers/container'
import { Match, MatchTeam } from '@prisma/client'
import { useRouter } from 'next/navigation'

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

  return (
    <div className='w-screen h-screen box-border flex justify-center items-center'>
      <Container>
        <form onSubmit={handleSubmit( onSubmit )}>
          <div className='h-fit w-[calc(100vw-40px)] flex flex-col max-w-[400px]'>
            <Image
              src={'/images/logoBlueInline.svg'}
              height={48}
              width={132}
              alt='logo blue inline'
              className='mb-[60px]'
            />
            <div className='mb-20'>
              <p className='text-blue7 h2-barlow-m sm:h1-barlow-m'>azerty</p>
              <p className='text-blue6 h2-barlow-m sm:h1-barlow-m'>azerty</p>
            </div>
            <div className='flex flex-col gap-y-10'>
              <div className='flex flex-col gap-y-6'>
                <Controller
                  name='team1Result'
                  control={control}
                  render={( { field } ) => (
                    <Select
                      id='team1Result'
                      label='team1Result'
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
                <Controller
                  name='team2Result'
                  control={control}
                  render={( { field } ) => (
                    <Select
                      id='team2Result'
                      label='team2Result'
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
                <Controller name="team1Points" control={control} render={( { field } ) => <Input id='team1Points' type='number' className='h-[60px]' {...field} errors={errors} disabled={isLoading} />}/>
                <Controller name="team2Points" control={control} render={( { field } ) => <Input id='team2Points' type='number' className='h-[60px]' {...field} errors={errors} disabled={isLoading} />}/>
                <Controller name="team1Bonus" control={control} render={( { field } ) => <Input id='team1Bonus' type='number' className='h-[60px]' {...field} errors={errors} disabled={isLoading} />}/>
                <Controller name="team2Bonus" control={control} render={( { field } ) => <Input id='team2Bonus' type='number' className='h-[60px]' {...field} errors={errors} disabled={isLoading} />}/>
                <Controller name="team1DefenseBonus" control={control} render={( { field } ) => <Input id='team1DefenseBonus' type='number' className='h-[60px]' {...field} errors={errors} disabled={isLoading} />}/>
                <Controller name="team2DefenseBonus" control={control} render={( { field } ) => <Input id='team2DefenseBonus' type='number' className='h-[60px]' {...field} errors={errors} disabled={isLoading} />}/>
              </div>
              <Button className='w-full' disabled={isLoading} type='submit' variant='primary' size='md'>
                Send reset link
              </Button>
            </div>
          </div>
        </form>
      </Container>
    </div>
  )
}

export default MatchForm
