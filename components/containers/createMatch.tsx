// import { Team } from '@prisma/client'
// import z from 'zod'
// import toast from 'react-hot-toast'
// import Image from 'next/image'
// import { useEffect, useState } from 'react'
// import { Controller, SubmitHandler, useForm } from 'react-hook-form'
// import { zodResolver } from '@hookform/resolvers/zod'
// import { useRouter } from 'next/navigation'

// import useStep, { STEPS } from '@/hooks/useStep'
// import ImageContainer from './image'
// import Button from '../buttons/button'
// import { MatchSchema } from '@/types/forms'
// import Select from '../inputs/select'
// import ImageUpload from '../inputs/imageUpload'
// import Input from '../inputs/input'

// interface CreateMatchContainerProperties {
//     teams: Team[]
//   }

// const CreateMatchContainer: React.FC<CreateMatchContainerProperties> = ( { teams } ) => {
//   const [ isLoading, setIsloading ] = useState( false )
//   const [ isPoulePhase, setIsPoulePhase ] = useState( true )
//   const [ filteredTeams, setFilteredTeams ] = useState<{value: string, label: string, disabled?: boolean}[]>( [ { value: '--', label: '--', disabled: true } ] )
//   const [ tribuneImage, setTribuneImage ] = useState( '' )
//   const [ tribune, setTribune ] = useState<{id: string, tribuneImage: string, name: string, places: number}[]>( [] )
//   const { step, setStep } = useStep()
//   const router = useRouter()

//   const pouleOptions = [ { value: 'POULE_A', label: 'POULE A' }, { value: 'POULE_B', label: 'POULE B' }, { value: 'POULE_C', label: 'POULE C' }, { value: 'POULE_D', label: 'POULE D' } ]
//   const knockOutOption = [ { value: 'QUARTERFINAL', label: 'QUARTERFINAL' }, { value: 'SEMI_FINAL', label: 'SEMI FINAL' }, { value: 'FINAL', label: 'FINAL' } ]

//   const hours = Array.from( { length: 24 }, ( _v, index ) => index )
//   const hourOptions = hours.map( hour => { return { value: hour.toString().padStart( 2, '0' ), label: hour.toString().padStart( 2, '0' ) } } )

//   const minutes = Array.from( { length: 12 }, ( _v, index ) => index * 5 )
//   const minuteOptions = minutes.map( minute => { return { value: minute.toString().padStart( 2, '0' ), label: minute.toString().padStart( 2, '0' ) } } )

//   const defaultValues = { phase: isPoulePhase ? pouleOptions[0].value : knockOutOption[0].value, teamOne: filteredTeams[0]?.value, teamTwo: filteredTeams[0]?.value, hour: hourOptions[0]?.value, minute: minuteOptions[0]?.value, stadium: '', date: '' }
//   const { handleSubmit, control, watch, setValue, formState: { errors } } = useForm<z.infer<typeof MatchSchema>>( { resolver: zodResolver( MatchSchema ), defaultValues, mode: 'onChange' } )

//   const phase = watch( 'phase' )
//   const teamOne = watch( 'teamOne' )
//   const teamTwo = watch( 'teamTwo' )
//   const date = watch( 'date' )
//   const hour = watch( 'hour' )
//   const minute = watch( 'minute' )
//   const stadium = watch( 'stadium' )
//   const name = watch( 'name' )
//   const places = watch( 'places' )

//   useEffect( () => {
//     const filtered = teams.filter( team => team.phase === phase ).map( team => ( { value: team.country, label: team.country.replaceAll( '_', ' ' ) } ) )
//     const options = [ { value: '--', label: '--' }, ...filtered ]
//     setFilteredTeams( options )
//   }, [ phase, teams ] )

//   const onSubmit: SubmitHandler<z.infer<typeof MatchSchema>> = async () => {
//     setIsloading( true )

//     await fetch( '/api/match', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify( { phase, teamOne, teamTwo, date, hour, minute, stadium, tribune } ) } )
//       .then( ( callback ) => {
//         if ( callback.status === 200 ) { toast.success( `${callback.statusText}` ) }
//         if ( callback.status !== 200 ) { toast.error( `${callback.statusText}` ) }
//         router.refresh()
//       } )
//   }

//   let bodyContent = (
//     <div>Loading...</div>
//   )

//   if ( step === STEPS.ONE ) {
//     bodyContent = (
//       <>
//         <ImageContainer />
//         <div>
//           <Button onclick={() => {setIsPoulePhase( true ); setValue( 'phase', pouleOptions[0].value )}}>POULE</Button>
//           <Button onclick={() => {setIsPoulePhase( false ); setValue( 'phase', knockOutOption[0].value )}}>KNOCK-OUT</Button>
//           <Controller name="phase" control={control} render={( { field } ) => <Select id='phase' label='phase' {...field} errors={errors} disabled={isLoading} options={isPoulePhase ? pouleOptions : knockOutOption} />} />
//           <Controller name="teamOne" control={control} render={( { field } ) => <Select id='teamOne' label='teamOne' {...field} errors={errors} disabled={isLoading} options={filteredTeams.map( option => ( { ...option, disabled: option.value === '--' ? !!teamOne : option.value === teamTwo } ) )} />} />
//           <Image src={teamOne === '--' ? '/placeholder-image.png' : `/flags/${teamOne.slice( 0, 3 ).toLowerCase()}.svg`} alt='team' width={50} height={50} />
//           <Controller name="teamTwo" control={control} render={( { field } ) => <Select id='teamTwo' label='teamTwo' {...field} errors={errors} disabled={isLoading} options={filteredTeams.map( option => ( { ...option, disabled: option.value === '--' ? !!teamTwo : option.value === teamOne } ) )} />} />
//           <Image src={teamTwo === '--' ? '/placeholder-image.png' : `/flags/${teamTwo.slice( 0, 3 ).toLowerCase()}.svg`} alt='team' width={50} height={50} />
//           <Controller name="date" control={control} render={( { field } ) => <Input id='date' label='date' {...field} errors={errors} disabled={isLoading} />} />
//           <Controller name="hour" control={control} render={( { field } ) => <Select id='hour' label='hour' {...field} disabled={isLoading} options={hourOptions} />} />
//           <Controller name="minute" control={control} render={( { field } ) => <Select id='minute' label='minute' {...field} disabled={isLoading} options={minuteOptions} />} />
//           <Controller name="stadium" control={control} render={( { field } ) => <Input id='stadium' label='stadium' {...field} errors={errors} disabled={isLoading} />} />
//           <ImageUpload onChange={( value ) => setImage( value )} />
//           <div>
//             <Button disabled={isLoading} onclick={() => setStep( step + 1 as STEPS )} type='button'>
//                         Ajouter une team
//             </Button>
//           </div>
//         </div>
//       </>
//     )
//   }

//   if ( step === STEPS.TWO ) {
//     bodyContent = (
//       <>
//         <ImageContainer />
//         <form className='bg-rose-500' onSubmit={handleSubmit( onSubmit )}>
//           {tribune.map( ( tribune ) => (
//             <div key={tribune.id}>
//               <div className='w-30 h-30 relative'>
//                 <Image alt='tribune' fill style={{ objectFit: 'cover' }} src={tribune.tribuneImage === '' ? '/placeholder-image.png' : tribune.tribuneImage} />
//               </div>
//               <div>
//                 <p>Name</p>
//                 <p>{tribune.name}</p>
//                 <p>Places</p>
//                 <p>{tribune.places}</p>
//               </div>
//             </div>
//           ) )}
//           <Button onclick={() => setStep( step + 1 as STEPS )} type='button'>
//                     Ajouter une tribune
//           </Button>
//           <div>
//             <Button onclick={() => setStep( step - 1 as STEPS )} type='button'>
//                     Cancel
//             </Button>
//             <Button disabled={isLoading} type='submit'>
//                     Valider
//             </Button>
//           </div>
//         </form>
//       </>
//     )
//   }

//   if ( step === STEPS.THREE ) {
//     bodyContent = (
//       <>
//         <div className='w-64 h-64 relative'>
//           <Image alt='tribune' fill style={{ objectFit: 'cover' }} src={tribuneImage === '' ? '/placeholder-image.png' : tribuneImage} />
//         </div>
//         <div>
//           <Controller name="name" control={control} render={( { field } ) => <Input id='name' label='Name' {...field} errors={errors} disabled={isLoading} />} />
//           <Controller name="places" control={control} render={( { field } ) => <Input id='places' label='Places' type='number' {...field} errors={errors} disabled={isLoading} />} />
//           <ImageUpload onChange={( value ) => setTribuneImage( value )} />
//         </div>
//         <div>
//           <Button onclick={() => setStep( step - 1 as STEPS )} type='button'>
//                     Cancel
//           </Button>
//           <Button onclick={() => { setTribune( previousTribune => [ ...previousTribune, { id: uuidv4(), tribuneImage, name, places } ] ); setStep( step - 1 as STEPS ) }} type='submit'>
//                     Valider
//           </Button>
//         </div>
//       </>
//     )
//   }

//   return (
//     bodyContent
//   )
// }

// export default CreateMatchContainer
// eslint-disable-next-line unicorn/no-empty-file
