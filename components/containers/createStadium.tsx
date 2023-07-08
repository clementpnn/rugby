'use client'

import z from 'zod'
import toast from 'react-hot-toast'
import { useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'

import useStep, { STEPS } from '@/hooks/useStep'
import ImageContainer from './image'
import Button from '../buttons/button'
import { StadiumSchema } from '@/types/forms'
import ImageUpload from '../inputs/imageUpload'
import Input from '../inputs/input'
import Select from '../inputs/select'

const CreateStadiumContainer = () => {
  const [ isLoading, setIsloading ] = useState( false )
  const [ stadiumImage, setStadiumImage ] = useState( '' )
  const [ tribuneImage, setTribuneImage ] = useState( '' )
  const [ stadiumPoints, setStadiumPoints ] = useState<{x: Number, y: Number}[]>( [] )
  const [ tribunes, setTribunes ] = useState<{name: String, type: 'JOURNALIST'|'PHOTOGRAPHER', places: Number, image: String}[]>( [] )
  const { step, setStep } = useStep()
  const router = useRouter()

  const { handleSubmit, control, watch, formState: { errors } } = useForm<z.infer<typeof StadiumSchema>>( { resolver: zodResolver( StadiumSchema ), defaultValues: { name: '', reference: '', nameTribune: '', type: 'JOURNALIST' }, mode: 'onChange' } )
  const onSubmit: SubmitHandler<z.infer<typeof StadiumSchema>> = async () => {
    setIsloading( true )

    await fetch( '/api/stadium', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify( { reference, name, stadiumImage, tribunes } ) } )
      .then( ( callback ) => {
        if ( callback.status === 200 ) { toast.success( `${callback.statusText}` ) }
        if ( callback.status !== 200 ) { toast.error( `${callback.statusText}` ) }
        router.refresh()
      } )
  }

  const { reference, name, nameTribune, type, places } = watch()

  let bodyContent = (
    <div>Loading...</div>
  )

  if ( step === STEPS.ONE ) {
    bodyContent = (
      <>
        <ImageContainer image={stadiumImage} />
        <div>
          <Controller name="reference" control={control} render={( { field } ) => <Input id='reference' label='reference' {...field} errors={errors} disabled={isLoading} />} />
          <Controller name="name" control={control} render={( { field } ) => <Input id='name' label='name' {...field} errors={errors} disabled={isLoading} />} />
          <ImageUpload onChange={( value ) => setStadiumImage( value )}>Upload Stade Image</ImageUpload>
          <div>
            <Button disabled={isLoading} onclick={() => setStep( step + 1 as STEPS )} type='button'>
                        Valider
            </Button>
          </div>
        </div>
      </>
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
          points={stadiumPoints}
          onClick={ ( event ) => {
            const pointSize = 10
            const newPoint = calculatePoint( event, pointSize )
            setStadiumPoints( [ ...stadiumPoints, newPoint ] )
            setStep( step + 1 as STEPS )
          }}
        />
        <div>
          {tribunes.map( ( tribune, index ) => (
            <div key={index}>
              <div>
                <p>{index}</p>
                <p>Name</p>
                <p>{tribune.name}</p>
                <p>Type</p>
                <p>{tribune.type}</p>
                <p>Places</p>
                <p>{tribune.places.toString()}</p>
              </div>
            </div>
          ) )}
          <form className='bg-rose-500' onSubmit={handleSubmit( onSubmit )}>
            <Button onclick={() => setStep( step - 1 as STEPS )} type='button'>
                        Cancel
            </Button>
            <Button disabled={isLoading} type='submit'>
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
          <Button onclick={() => setStep( step - 1 as STEPS )} type='button'>
                    Cancel
          </Button>
          <Button onclick={() => {
            setTribunes( [ ...tribunes, { name: nameTribune, type: type as 'JOURNALIST' | 'PHOTOGRAPHER', places, image: tribuneImage } ] )
            setStep( step - 1 as STEPS )
          }}
          >
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

export default CreateStadiumContainer