'use client'

import { Stadium, Team } from '@prisma/client'
import z from 'zod'
import toast from 'react-hot-toast'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'

import Button from '@/components/buttons/button'
import { MatchSchema } from '@/types/forms'
import Select from '@/components/inputs/select'
import Input from '@/components/inputs/input'

interface CreateMatchProperties {
    teams: Team[]
    stadiums: Stadium[]
  }

const CreateMatch: React.FC<CreateMatchProperties> = ( { teams, stadiums } ) => {
  const [ isLoading, setIsloading ] = useState( false )
  const [ isPoulePhase, setIsPoulePhase ] = useState( true )
  const [ filteredTeams, setFilteredTeams ] = useState<{value: string, label: string, disabled?: boolean}[]>( [ { value: '--', label: '--', disabled: true } ] )
  const router = useRouter()

  const pouleOptions = [ { value: 'POULE_A', label: 'POULE A' }, { value: 'POULE_B', label: 'POULE B' }, { value: 'POULE_C', label: 'POULE C' }, { value: 'POULE_D', label: 'POULE D' } ]
  const knockOutOption = [ { value: 'QUARTERFINAL', label: 'QUARTERFINAL' }, { value: 'SEMI_FINAL', label: 'SEMI FINAL' }, { value: 'FINAL', label: 'FINAL' } ]

  const hours = Array.from( { length: 24 }, ( _v, index ) => index )
  const hourOptions = hours.map( hour => { return { value: hour.toString().padStart( 2, '0' ), label: hour.toString().padStart( 2, '0' ) } } )

  const minutes = Array.from( { length: 12 }, ( _v, index ) => index * 5 )
  const minuteOptions = minutes.map( minute => { return { value: minute.toString().padStart( 2, '0' ), label: minute.toString().padStart( 2, '0' ) } } )

  const stadiumsOptions = stadiums.map( stadium => ( { value: stadium.id, label: `${stadium.name}, ${stadium.reference}` } ) )

  const defaultValues = { phase: isPoulePhase ? pouleOptions[0].value : knockOutOption[0].value, teamOne: filteredTeams[0]?.value, teamTwo: filteredTeams[0]?.value, hour: hourOptions[0]?.value, minute: minuteOptions[0]?.value, stadium: stadiumsOptions[0].value, date: '' }
  const { handleSubmit, control, watch, setValue, formState: { errors } } = useForm<z.infer<typeof MatchSchema>>( { resolver: zodResolver( MatchSchema ), defaultValues, mode: 'onChange' } )

  const phase = watch( 'phase' )
  const teamOne = watch( 'teamOne' )
  const teamTwo = watch( 'teamTwo' )
  const date = watch( 'date' )
  const hour = watch( 'hour' )
  const minute = watch( 'minute' )
  const stadium = watch( 'stadium' )

  useEffect( () => {
    const filtered = teams.filter( team => team.phase === phase ).map( team => ( { value: team.country, label: team.country.replaceAll( '_', ' ' ) } ) )
    const options = [ { value: '--', label: '--' }, ...filtered ]
    setFilteredTeams( options )
  }, [ phase, teams ] )

  const onSubmit: SubmitHandler<z.infer<typeof MatchSchema>> = async () => {
    setIsloading( true )

    await fetch( '/api/match', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify( { phase, teamOne, teamTwo, date, hour, minute, stadiumId: stadium } ) } )
      .then( ( callback ) => {
        if ( callback.status === 200 ) { toast.success( `${callback.statusText}` ) }
        if ( callback.status !== 200 ) { toast.error( `${callback.statusText}` ) }
        setIsloading( false )
        router.refresh()
      } )
  }

  return (
    <>
      <div>
        <Button variant='primary' size='md' onClick={() => {
          setIsPoulePhase( true )
          setValue( 'phase', pouleOptions[0].value )
        } }>
            POULE
        </Button>
        <Button variant='primary' size='md' onClick={() => {
          setIsPoulePhase( false )
          setValue( 'phase', knockOutOption[0].value )
        } } >
            KNOCK-OUT
        </Button>
        <form onSubmit={handleSubmit( onSubmit )}>
          <Controller name="phase" control={control} render={( { field } ) => <Select id='phase' label='phase' {...field} errors={errors} disabled={isLoading} options={isPoulePhase ? pouleOptions : knockOutOption} />} />
          <Controller name="teamOne" control={control} render={( { field } ) => <Select id='teamOne' label='teamOne' {...field} errors={errors} disabled={isLoading} options={filteredTeams.map( option => ( { ...option, disabled: option.value === '--' ? !!teamOne : option.value === teamTwo } ) )} />} />
          <Image src={teamOne === '--' ? '/placeholder-image.png' : `/flags/${teamOne.slice( 0, 3 ).toLowerCase()}.svg`} alt='team' width={50} height={50} />
          <Controller name="teamTwo" control={control} render={( { field } ) => <Select id='teamTwo' label='teamTwo' {...field} errors={errors} disabled={isLoading} options={filteredTeams.map( option => ( { ...option, disabled: option.value === '--' ? !!teamTwo : option.value === teamOne } ) )} />} />
          <Image src={teamTwo === '--' ? '/placeholder-image.png' : `/flags/${teamTwo.slice( 0, 3 ).toLowerCase()}.svg`} alt='team' width={50} height={50} />
          <Controller name="date" control={control} render={( { field } ) => <Input id='date' label='date' {...field} errors={errors} disabled={isLoading} />} />
          <Controller name="hour" control={control} render={( { field } ) => <Select id='hour' label='hour' {...field} disabled={isLoading} options={hourOptions} />} />
          <Controller name="minute" control={control} render={( { field } ) => <Select id='minute' label='minute' {...field} disabled={isLoading} options={minuteOptions} />} />
          <Controller name="stadium" control={control} render={( { field } ) => <Select id='stadium' label='Stadium' {...field} errors={errors} disabled={isLoading} options={stadiumsOptions} />} />
          <div>
            <Button disabled={isLoading} type='submit' variant='primary' size='md'>
                Valider
            </Button>
          </div>
        </form>
      </div>
    </>
  )
}

export default CreateMatch
