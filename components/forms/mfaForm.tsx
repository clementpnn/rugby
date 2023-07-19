'use client'

import { useState } from 'react'
import { SubmitHandler, useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'react-hot-toast'
import Image from 'next/image'
import { MFASchema } from '@/types/forms'
import Input from '../inputs/input'
import useUser from '@/hooks/useUser'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Button from '../buttons/button'
import Container from '../containers/container'

const MFAForm = () => {
  const router = useRouter()
  const [ isLoading, setIsloading ] = useState( false )
  const { email, password } = useUser()

  const { handleSubmit, control, formState: { errors } } = useForm( {
    resolver: zodResolver( MFASchema ),
    mode: 'onChange'
  } )

  // const handleInputChange = ( currentInputName: string, nextInputName: string ) => ( event: { target: { value: any } } ) => {
  //   const currentValue = event.target.value

  //   if ( currentValue !== '' ) {
  //     const nextInput = document.querySelector( `#${nextInputName}` ) as HTMLInputElement | null
  //     nextInput?.focus()
  //   }
  // }

  const onSubmit: SubmitHandler<any> = async ( data ) => {
    setIsloading( true )
    const mfaToken = `${Number( data.numberOne )}${Number( data.numberTwo )}${Number( data.numberThree )}${Number( data.numberFour )}${Number( data.numberFive )}${Number( data.numberSix )}`
    await fetch( '/api/mfa', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify( { mfaToken } )
    } )
      .then( () => {
        signIn( 'credentials', { email, password } )
          .then( ( callback ) => {
            if ( callback?.ok ) {
              toast.success( 'Logged in !' )
              router.refresh()

              if ( callback?.error ) {
                toast.error( 'Invalid credentials' )
              }
            }
          } )
      } )
    setIsloading( false )
  }

  return (
    <div className='w-screen h-screen box-border flex justify-center'>
      <Container>
        <form onSubmit={handleSubmit( onSubmit )}>
          <div className='h-fit w-[calc(100vw-40px)] flex flex-col max-w-[400px] pt-14 sm:pt-20'>
            <Image
              src={'/images/logoBlueInline.svg'}
              height={48}
              width={132}
              alt='logo blue inline'
              className='mb-[60px]'
            />
            <div className='mb-20'>
              <p className='text-blue7 h2-barlow-m sm:h1-barlow-m'>ENTER</p>
              <p className='text-blue6 h2-barlow-m sm:h1-barlow-m'>THE CODE</p>
            </div>
            <p className='text-neutral11 base-md'>A code has been sent to you by email.</p>
            <p className='text-neutral11 base-md mb-6'>Pick it up to log in.</p>
            <span className='text-neutral5 label-md'>Code</span>
            <div className='flex flex-row gap-x-2 mb-10'>
              <Controller name="numberOne" control={control} render={( { field } ) => <Input id='numberOne' type='number' className='h-[60px]' {...field} errors={errors} variant='code' disabled={isLoading} style={{ appearance: 'none', WebkitAppearance: 'none', MozAppearance: 'textfield' }} maxLength={1} />}/>
              <Controller name="numberTwo" control={control} render={( { field } ) => <Input id='numberTwo' type='number' className='h-[60px]' {...field} errors={errors} variant='code' disabled={isLoading} style={{ appearance: 'none', WebkitAppearance: 'none', MozAppearance: 'textfield' }} maxLength={1} />} />
              <Controller name="numberThree" control={control} render={( { field } ) => <Input id='numberThree' type='number' className='h-[60px]' {...field} errors={errors} variant='code' disabled={isLoading} style={{ appearance: 'none', WebkitAppearance: 'none', MozAppearance: 'textfield' }} maxLength={1} />} />
              <Controller name="numberFour" control={control} render={( { field } ) => <Input id='numberFour' type='number' className='h-[60px]' {...field} errors={errors} variant='code' disabled={isLoading} style={{ appearance: 'none', WebkitAppearance: 'none', MozAppearance: 'textfield' }} maxLength={1} />} />
              <Controller name="numberFive" control={control} render={( { field } ) => <Input id='numberFive' type='number' className='h-[60px]' {...field} errors={errors} variant='code' disabled={isLoading} style={{ appearance: 'none', WebkitAppearance: 'none', MozAppearance: 'textfield' }} maxLength={1} />} />
              <Controller name="numberSix" control={control} render={( { field } ) => <Input id='numberSix' type='number' className='h-[60px]' {...field} errors={errors} variant='code' disabled={isLoading} style={{ appearance: 'none', WebkitAppearance: 'none', MozAppearance: 'textfield' }} maxLength={1} />} />
            </div>
            <Button disabled={isLoading} type='submit' variant='primary' size='lg' className='w-full'>
              Validate
            </Button>
          </div>
        </form>
      </Container>
    </div>
  )
}

export default MFAForm
