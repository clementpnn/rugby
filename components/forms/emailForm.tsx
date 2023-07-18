'use client'

import { useState } from 'react'
import { SubmitHandler, useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'react-hot-toast'
import Image from 'next/image'
import Button from '../buttons/button'
import Input from '../inputs/input'
import { EmailShema } from '@/types/forms'
import Container from '../containers/container'

const EmailForm = () => {
  const [ isLoading, setIsloading ] = useState( false )

  const { handleSubmit, control, formState: { errors } } = useForm( {
    resolver: zodResolver( EmailShema ),
    defaultValues: { email: '' },
    mode: 'onChange'
  } )

  const onSubmit: SubmitHandler<any> = async ( data ) => {
    setIsloading( true )

    await fetch( '/api/sendReset', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify( data )
    } )
      .then( ( callback ) => {
        if ( callback.status === 200 ) { toast.success( `${callback.statusText}` ) }
        if ( callback.status !== 200 ) { toast.error( `${callback.statusText}` ) }
      } )

    setIsloading( false )
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
              <p className='text-blue7 h2-barlow-m sm:h1-barlow-m'>WELCOME</p>
              <p className='text-blue6 h2-barlow-m sm:h1-barlow-m'>BACK</p>
            </div>
            <div className='flex flex-col gap-y-10'>
              <div className='flex flex-col gap-y-6'>
                <Controller name="email" control={control} render={( { field } ) => <Input id='email' label='Email' type='email' placeholder='Enter your email' {...field} errors={errors} disabled={isLoading} />} />
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

export default EmailForm
