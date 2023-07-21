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
import { PiUploadSimpleBold } from 'react-icons/pi'
import { BsArrowReturnLeft } from 'react-icons/bs'
import { RxCross2 } from 'react-icons/rx'
import Select from '@/components/inputs/select'

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
        <div className='bg-neutral0 m-6 mr-0 h-[calc(100%-48px)] w-full flex justify-center items-center rounded-md overflow-hidden' style={{ boxShadow: '0px 0px 14px rgba(0, 0, 0, 0.1)' }} >
          <ImageContainer image={stadiumImage}/>
        </div>
        <div className='p-10 w-[480px] h-full'>
          <h2 className='h2-barlow-m text-blue6 mb-10'>CREATE STADIUM</h2>
          <div className='grid gap-y-4'>
            <Controller name="reference" control={control} render={( { field } ) => <Input id='reference' label='Reference' placeholder='Enter the reference' {...field} errors={errors} disabled={isLoading} />} />
            <Controller name="name" control={control} render={( { field } ) => <Input id='name' label='Name' placeholder='Enter the stadium name' {...field} errors={errors} disabled={isLoading} />} />
            <ImageUpload onChange={( value ) => setStadiumImage( value )}><PiUploadSimpleBold className='h-6 w-6'/>Upload Stade Image</ImageUpload>
            <Button type='button' variant='primary' className='mt-6' size='md' disabled={isLoading} onClick={() => {
              setStep( step + 1 as STEPS )
              setStadium( { name, reference } )
            }}>
              Next
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
      <div className='flex h-full w-full'>
        <div className='bg-neutral0 m-6 mr-0 h-[calc(100%-48px)] w-full flex justify-center items-center rounded-md overflow-hidden' style={{ boxShadow: '0px 0px 14px rgba(0, 0, 0, 0.1)' }} >
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
        </div>
        <div className='p-10 w-[480px] h-full'>
          <h2 className='h2-barlow-m text-blue6 mb-10'>SECTIONS PLACE</h2>
          <Button type='button' variant='outline' size='md' iconPosition='left' icon={<BsArrowReturnLeft className="w-full h-full" />} onClick={() => {
            setStep( step - 1 as STEPS )
            setStadiumImage( '' )
            setTribunes( [] )
          }}>
              Back
          </Button>
          <p className='base-md text-blue9 my-6'>Click on the frame to put sections</p>
          <div className='bg-neutral1 w-full h-96 rounded-md'>
            <div className='w-full h-full p-2 flex flex-col gap-y-2 overflow-auto scroll-smooth no-scrollbar'>
              {tribunes.map( ( tribune, index ) => (
                <div key={index} className='bg-neutral0 relative'>
                  <div className='flex flex-col p-8 border border-spacing-2 rounded-md'>
                    <p className='h6-barlow-m text-blue6'>TRIBUNE {index + 1}</p>
                    <p className='h5-inter-m text-blue9 mb-3'>{tribune.name}</p>
                    <p className='base-sm text-blue9'>For {tribune.type.charAt( 0 ).toUpperCase() + tribune.type.slice( 1 ).toLowerCase()}</p>
                    <p className='base-sm text-blue9'>Number of places : {tribune.places.toString()}</p>
                  </div>
                  <button className="absolute right-6 cursor-pointer top-8 z-10 w-6 h-6 rounded-full text-blue6 transform translate-x-1/2 -translate-y-1/2 group-hover:opacity-100" onClick={() => setTribunes( tribunes.filter( ( _, itemIndex ) => itemIndex !== index ) )}>
                    <RxCross2 />
                  </button>
                </div>
              ) )}
            </div>
          </div>
          <form onSubmit={handleSubmit( onSubmit )}>
            <Button disabled={isLoading} type='submit' variant='primary' size='lg' className='w-full mt-6'>
              Create the Stadium
            </Button>
          </form>
        </div>
      </div>
    )
  }

  if ( step === STEPS.THREE ) {
    bodyContent = (
      <>
        {/* <ImageContainer image={tribuneImage} />
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
        </div> */}
        <div className='flex h-full w-full'>
          <div className='bg-neutral0 m-6 mr-0 h-[calc(100%-48px)] w-full flex justify-center items-center rounded-md overflow-hidden' style={{ boxShadow: '0px 0px 14px rgba(0, 0, 0, 0.1)' }} >
            <ImageContainer image={tribuneImage} />
          </div>
          <div className='p-10 w-[480px] h-full'>
            <h2 className='h2-barlow-m text-blue6 mb-10'>CREATE TRIBUNE</h2>
            <Button type='button' variant='outline' size='md' iconPosition='left' icon={<BsArrowReturnLeft className="w-full h-full" />} onClick={() => {
              setStep( step - 1 as STEPS )
              setTribuneImage( '' )
              reset( {
                nameTribune: '',
                type: 'JOURNALIST',
                places: undefined
              } )
            }}>
            Back
            </Button>
            <div className='grid gap-y-4 mt-6'>
              <Controller name="nameTribune" control={control} render={( { field } ) => <Input id='nameTribune' label='Name' {...field} errors={errors} disabled={isLoading} />} />
              <Controller name="type" control={control} render={( { field } ) => <Select id='type' label='Type' {...field} errors={errors} disabled={isLoading} options={[ { value: 'JOURNALIST', label: 'JOURNALIST' }, { value: 'PHOTOGRAPHER', label: 'PHOTOGRAPHER' } ]} />} />
              <Controller name="places" control={control} render={( { field } ) => <Input id='places' label='Number of places' type='number' {...field} errors={errors} disabled={isLoading} />} />
              <div className='mt-6'>
                <ImageUpload onChange={( value ) => setTribuneImage( value )}> Upload Tribune Image</ImageUpload>
              </div>
              <Button variant='primary' size='md' className='mt-6' onClick={() => {
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
          </div>
        </div>
      </>
    )
  }

  return (
    bodyContent
  )
}

export default CreateStadium