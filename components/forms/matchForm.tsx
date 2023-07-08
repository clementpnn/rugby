// 'use client'

// import { useEffect, useState } from 'react'
// import { useForm, Controller } from 'react-hook-form'
// import { zodResolver } from '@hookform/resolvers/zod'
// // import { toast } from 'react-hot-toast'
// import z from 'zod'

// // // import { MatchSchema } from '@/types/forms'
// import Button from '../buttons/button'
// import Select from '../inputs/select'
// // import { useRouter } from 'next/navigation'
// import Input from '../inputs/input'
// import { Team } from '@prisma/client'
// import Image from 'next/image'
// import ImageUpload from '../inputs/imageUpload'
// import useImage from '@/hooks/useImage'
// import useStep, { STEPS } from '@/hooks/useStep'

// interface MatchFormProperties {
//   teams: Team[]
// }

// const MatchForm: React.FC<MatchFormProperties> = ( { teams } ) => {
//   // eslint-disable-next-line no-unused-vars
//   const [ isLoading, setIsloading ] = useState( false )
//   const [ isPoulePhase, setIsPoulePhase ] = useState( true )
//   const [ filteredTeams, setFilteredTeams ] = useState<{value: string, label: string, disabled?: boolean}[]>( [ { value: '--', label: '--', disabled: true } ] )
//   const { setImage } = useImage()
//   const { step, setStep } = useStep()
//   // const router = useRouter()

//   const pouleOptions = [ { value: 'POULE_A', label: 'POULE A' }, { value: 'POULE_B', label: 'POULE B' }, { value: 'POULE_C', label: 'POULE C' }, { value: 'POULE_D', label: 'POULE D' } ]
//   const knockOutOption = [ { value: 'QUARTERFINAL', label: 'QUARTERFINAL' }, { value: 'SEMI_FINAL', label: 'SEMI FINAL' }, { value: 'FINAL', label: 'FINAL' } ]

//   const hours = Array.from( { length: 24 }, ( _v, index ) => index )
//   const hourOptions = hours.map( hour => { return { value: hour.toString().padStart( 2, '0' ), label: hour.toString().padStart( 2, '0' ) } } )

//   const minutes = Array.from( { length: 12 }, ( _v, index ) => index * 5 )
//   const minuteOptions = minutes.map( minute => { return { value: minute.toString().padStart( 2, '0' ), label: minute.toString().padStart( 2, '0' ) } } )

//   const defaultValues = { phase: isPoulePhase ? pouleOptions[0].value : knockOutOption[0].value, teamOne: filteredTeams[0]?.value, teamTwo: filteredTeams[0]?.value, hour: hourOptions[0]?.value, minute: minuteOptions[0]?.value, stadium: '', date: '' }
//   const { control, watch, setValue, formState: { errors } } = useForm<z.infer<typeof MatchSchema>>( { resolver: zodResolver( MatchSchema ), defaultValues, mode: 'onChange' } )

//   const phase = watch( 'phase' )
//   const teamOne = watch( 'teamOne' )
//   const teamTwo = watch( 'teamTwo' )

//   useEffect( () => {
//     const filtered = teams.filter( team => team.phase === phase ).map( team => ( { value: team.country, label: team.country.replaceAll( '_', ' ' ) } ) )
//     const options = [ { value: '--', label: '--' }, ...filtered ]
//     setFilteredTeams( options )
//   }, [ phase, teams ] )

//   // const onSubmit: SubmitHandler<z.infer<typeof MatchSchema>> = async (data) => {
//   //   setIsloading(true)
//   //   console.log(data)

//   //   await fetch('/api/match', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({image, ...data}) })
//   //     .then((callback) => {
//   //       if (callback.status === 200) { toast.success(`${callback.statusText}`) }
//   //       if (callback.status !== 200) { toast.error(`${callback.statusText}`) }
//   //       router.refresh()
//   //     })
//   // }

//   return (
//     <>
//       <Button onclick={() => {setIsPoulePhase( true ); setValue( 'phase', pouleOptions[0].value )}}>POULE</Button>
//       <Button onclick={() => {setIsPoulePhase( false ); setValue( 'phase', knockOutOption[0].value )}}>KNOCK-OUT</Button>
//       {/* <form className='bg-rose-500' onSubmit={handleSubmit(onSubmit)}> */}
//       <Controller name="phase" control={control} render={( { field } ) => <Select id='phase' label='phase' {...field} errors={errors} disabled={isLoading} options={isPoulePhase ? pouleOptions : knockOutOption} />} />
//       <Controller name="teamOne" control={control} render={( { field } ) => <Select id='teamOne' label='teamOne' {...field} errors={errors} disabled={isLoading} options={filteredTeams.map( option => ( { ...option, disabled: option.value === '--' ? !!teamOne : option.value === teamTwo } ) )} />} />
//       <Image src={teamOne === '--' ? '/placeholder-image.png' : `/flags/${teamOne.slice( 0, 3 ).toLowerCase()}.svg`} alt='team' width={50} height={50} />
//       <Controller name="teamTwo" control={control} render={( { field } ) => <Select id='teamTwo' label='teamTwo' {...field} errors={errors} disabled={isLoading} options={filteredTeams.map( option => ( { ...option, disabled: option.value === '--' ? !!teamTwo : option.value === teamOne } ) )} />} />
//       <Image src={teamTwo === '--' ? '/placeholder-image.png' : `/flags/${teamTwo.slice( 0, 3 ).toLowerCase()}.svg`} alt='team' width={50} height={50} />
//       <Controller name="date" control={control} render={( { field } ) => <Input id='date' label='date' {...field} errors={errors} disabled={isLoading} />} />
//       <Controller name="hour" control={control} render={( { field } ) => <Select id='hour' label='hour' {...field} disabled={isLoading} options={hourOptions} />} />
//       <Controller name="minute" control={control} render={( { field } ) => <Select id='minute' label='minute' {...field} disabled={isLoading} options={minuteOptions} />} />
//       <Controller name="stadium" control={control} render={( { field } ) => <Input id='stadium' label='stadium' {...field} errors={errors} disabled={isLoading} />} />
//       <ImageUpload onChange={( value ) => setImage( value )} />
//       <div>
//         <Button disabled={isLoading} onclick={() => setStep( step + 1 as STEPS )} type='submit'>
//                     Ajouter une team
//         </Button>
//       </div>
//       {/* </form> */}
//     </>
//   )
// }

// eslint-disable-next-line unicorn/no-empty-file
// export default MatchForm