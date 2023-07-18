'use client'

import { useState } from 'react'
import { SubmitHandler, useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'react-hot-toast'
import Image from 'next/image'
import Button from '../buttons/button'
import { LoginSchema } from '@/types/forms'
import Input from '../inputs/input'
import useStep, { STEPS } from '@/hooks/useStep'
import useUser from '@/hooks/useUser'
import Container from '../containers/container'
import { AiOutlineEye } from 'react-icons/ai'
import { AiOutlineEyeInvisible } from 'react-icons/ai'

const NewPasswordForm = () => {
  const [ isLoading, setIsloading ] = useState( false )
  const { step, setStep } = useStep()
  const { setEmail, setPassword } = useUser()

  const { handleSubmit, control, formState: { errors } } = useForm( {
    resolver: zodResolver( LoginSchema ),
    defaultValues: { password: '', newPassword: '' },
    mode: 'onChange'
  } )

  const onSubmit: SubmitHandler<any> = async ( data ) => {
    setIsloading( true )

    await fetch( '/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify( data )
    } )
      .then( ( callback ) => {
        if ( callback.status === 200 ) {
          toast.success( `${callback.statusText}` )
          setStep( step + 1 as STEPS )
          setEmail( data.email )
          setPassword( data.newPassword )
        }
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
              <p className='text-blue7 h2-barlow-m sm:h1-barlow-m'>NEW</p>
              <p className='text-blue6 h2-barlow-m sm:h1-barlow-m'>PASSWORD</p>
            </div>
            <div className='flex flex-col gap-y-10'>
              <div className='flex flex-col gap-y-6'>
                <Controller name="password" control={control} render={( { field } ) => <Input id='password' label='Password' type='password' placeholder='Enter your actual password' {...field} errors={errors} disabled={isLoading} iconPosition='right' icon={<AiOutlineEye className="w-full h-full" />} iconActive={<AiOutlineEyeInvisible className='w-full h-full' />}/>} />
                <Controller name="newPassword" control={control} render={( { field } ) => <Input id='newPassword' label='New Password' type='password' placeholder='Enter your new password' {...field} errors={errors} disabled={isLoading} iconPosition='right' icon={<AiOutlineEye className="w-full h-full" />} iconActive={<AiOutlineEyeInvisible className='w-full h-full' />}/>} />
              </div>
              <Button className='w-full' disabled={isLoading} type='submit' variant='primary' size='md'>
                Change
              </Button>
            </div>
          </div>
        </form>
      </Container>
    </div>
  )
}

export default NewPasswordForm
