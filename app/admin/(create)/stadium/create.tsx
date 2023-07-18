'use client'

import toast from 'react-hot-toast'
import { useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'

import useStep, { STEPS } from '@/hooks/useStep'
import ImageContainer from '@/components/containers/image'
import Button from '@/components/buttons/button'
import ImageUpload from '@/components/inputs/imageUpload'
import Input from '@/components/inputs/input'
import Select from '@/components/inputs/select'
import { PiUploadSimpleBold } from 'react-icons/pi'

const CreateStadium = () => {
  const [ isLoading, setIsloading ] = useState( false )
  const [ stadiumImage, setStadiumImage ] = useState( '' )
  const [ stadium, setStadium ] = useState<{name: string, reference: string}>( { name: '', reference: '' } )
  const [ tribuneImage, setTribuneImage ] = useState( '' )
  const [ stadiumPoint, setStadiumPoint ] = useState<{x: number, y: number}>( { x: 0, y: 0 } )
  const [ tribunes, setTribunes ] = useState<{name: string, type: 'JOURNALIST'|'PHOTOGRAPHER', places: number, image: string, x: number, y: number}[]>( [] )
  const { step, setStep } = useStep()
  const router = useRouter()

  const { handleSubmit, control, watch, reset, formState: { errors } } = useForm<any>( { defaultValues: { type: 'JOURNALIST' }, mode: 'onChange' } )
  const onSubmit: SubmitHandler<any> = async () => {
    setIsloading( true )

    await fetch( '/api/stadium', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify( { ...stadium, stadiumImage, tribunes } ) } )
      .then( ( callback ) => {
        if ( callback.status === 200 ) {
          toast.success( `${callback.statusText}` )
          setStep( step - 1 as STEPS )
          setStadiumImage( '' )
          setStadium( { name: '', reference: '' } )
          setStadiumPoint( { x: 0, y: 0 } )
          reset()
          router.refresh()
        }
        if ( callback.status !== 200 ) {
          toast.error( `${callback.statusText}` )
          setIsloading( true )
        }
      } )
  }

  const { name, reference, nameTribune, type, places } = watch()

  let bodyContent = (
    <div>Loading...</div>
  )

  if ( step === STEPS.ONE ) {
    bodyContent = (
      <div className='flex h-full w-full'>
        <div className='bg-neutral0 m-6 mr-0 h-[calc(100%-48px)] w-full flex justify-center items-center rounded-md' style={{ boxShadow: '0px 0px 14px rgba(0, 0, 0, 0.1)' }}>
          <ImageContainer image={stadiumImage} />
        </div>
        <div className='p-10 w-[480px] h-full'>
          <h2 className='h2-barlow-m text-blue6 mb-10'>CREATE STADIUM</h2>
          <div className='grid gap-y-4'>
            <Controller name="reference" control={control} render={( { field } ) => <Input id='reference' label='Reference' placeholder='Enter the reference' {...field} errors={errors} disabled={isLoading} />} />
            <Controller name="name" control={control} render={( { field } ) => <Input id='name' label='Name' placeholder='Enter the stadium name' {...field} errors={errors} disabled={isLoading} />} />
            <ImageUpload onChange={( value ) => setStadiumImage( value )}><PiUploadSimpleBold className='h-6 w-6'/>Upload Stade Image</ImageUpload>
            <Button type='button' variant='primary' size='md' disabled={isLoading} onClick={() => {
              setStep( step + 1 as STEPS )
              setStadium( { name, reference } )
            }}>
              Valider
            </Button>
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
        <ImageContainer
          image={stadiumImage}
          tribunes={tribunes}
          onClick={ ( event ) => {
            const pointSize = 30
            const point = calculatePoint( event, pointSize )
            setStadiumPoint( point )
            setStep( step + 1 as STEPS )
          }}
        />
        <div>
          {tribunes.map( ( tribune, index ) => (
            <div key={index} className='relative group'>
              <div className='flex p-8 justify-around border border-spacing-2 m-8'>
                <p> Index : {index + 1}</p>
                <p>Name : {tribune.name}</p>
                <p>Type : {tribune.type}</p>
                <p>Number of places : {tribune.places.toString()}</p>
              </div>
              <button className="absolute top-0 right-8 w-6 h-6 rounded-full bg-red-500 text-white transform translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 cursor-pointer" onClick={() => setTribunes( tribunes.filter( ( _, itemIndex ) => itemIndex !== index ) )}>
                X
              </button>
            </div>
          ) )}

          <form onSubmit={handleSubmit( onSubmit )}>
            <Button type='button' variant='outline' size='md' onClick={() => {
              setStep( step - 1 as STEPS )
              setStadiumImage( '' )
              setTribunes( [] )
            }}>
              Cancel
            </Button>
            <Button disabled={isLoading} type='submit' variant='primary' size='md'>
              Valider
            </Button>
          </form>
        </div>
      </>
    )
  }

  if ( step === STEPS.THREE ) {
    bodyContent = (
      <>
        <ImageContainer image={tribuneImage} />
        <div>
          <Controller name="nameTribune" control={control} render={( { field } ) => <Input id='nameTribune' label='Name' {...field} errors={errors} disabled={isLoading} />} />
          <Controller name="type" control={control} render={( { field } ) => <Select id='type' label='type' {...field} errors={errors} disabled={isLoading} options={[ { value: 'JOURNALIST', label: 'JOURNALIST' }, { value: 'PHOTOGRAPHER', label: 'PHOTOGRAPHER' } ]} />} />
          <Controller name="places" control={control} render={( { field } ) => <Input id='places' label='Number of places' type='number' {...field} errors={errors} disabled={isLoading} />} />
          <ImageUpload onChange={( value ) => setTribuneImage( value )}> Upload Tribune Image</ImageUpload>
        </div>
        <div>
          <Button type='button' variant='outline' size='md' onClick={() => {
            setStep( step - 1 as STEPS )
            setTribuneImage( '' )
            reset( {
              nameTribune: '',
              type: 'JOURNALIST',
              places: undefined
            } )
          }}>
            Cancel
          </Button>
          <Button variant='primary' size='md' onClick={() => {
            setTribunes( [ ...tribunes, { name: nameTribune, type: type as 'JOURNALIST' | 'PHOTOGRAPHER', places, image: tribuneImage, x: stadiumPoint.x, y: stadiumPoint.y } ] )
            setStep( step - 1 as STEPS )
            setTribuneImage( '' )
            reset( {
              nameTribune: '',
              type: 'JOURNALIST',
              places: undefined
            } )
          }}>
            Valider
          </Button>
        </div>
      </>
    )
  }

  return (
    bodyContent
  )
}

export default CreateStadium