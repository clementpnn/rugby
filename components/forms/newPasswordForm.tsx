'use client'

import { useState } from 'react'
import { SubmitHandler, useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'react-hot-toast'
import Image from 'next/image'
import Button from '../buttons/button'
import { NewPasswordShema } from '@/types/forms'
import Input from '../inputs/input'
import Container from '../containers/container'
import { AiOutlineEye } from 'react-icons/ai'
import { AiOutlineEyeInvisible } from 'react-icons/ai'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import z from 'zod'
import { User } from '@prisma/client'

interface NewPasswordFormProperties {
  resetToken: string
  user: User
}

const NewPasswordForm: React.FC<NewPasswordFormProperties> = ( { resetToken, user } ) => {
  const [ isLoading, setIsloading ] = useState( false )
  const router = useRouter()

  const { handleSubmit, control, formState: { errors } } = useForm( {
    resolver: zodResolver( NewPasswordShema ),
    defaultValues: { newPassword: '', newPasswordConfirm: '' },
    mode: 'onChange'
  } )

  const onSubmit: SubmitHandler<z.infer<typeof NewPasswordShema>> = async ( data ) => {
    setIsloading( true )

    await fetch( '/api/resetPassword', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify( { password: data.newPassword, resetToken } )
    } )
      .then( ( callback ) => {
        if ( callback.status === 200 ) {
          toast.success( `${callback.statusText}` )
          signIn( 'credentials', { email: user.email, password: data.newPassword } )
            .then( ( callback ) => {
              if ( callback?.ok ) {
                toast.success( 'Logged in !' )
                if ( user.role === 'ADMIN' ) {
                  router.push( '/admin' )
                }

                if ( user.role === 'USER' ) {
                  router.push( '/user' )
                }
              }
              if ( callback?.error ) {
                toast.error( 'Invalid credentials' )
              }
            } )
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
                <Controller name="newPassword" control={control} render={( { field } ) => <Input id='newPassword' label='newPassword' type='New Password' placeholder='Enter your new password' {...field} errors={errors} disabled={isLoading} iconPosition='right' icon={<AiOutlineEye className="w-full h-full" />} iconActive={<AiOutlineEyeInvisible className='w-full h-full' />}/>} />
                <Controller name="newPasswordConfirm" control={control} render={( { field } ) => <Input id='newPasswordConfirm' label='New Password Confirm' type='password' placeholder='Confirm your new password' {...field} errors={errors} disabled={isLoading} iconPosition='right' icon={<AiOutlineEye className="w-full h-full" />} iconActive={<AiOutlineEyeInvisible className='w-full h-full' />}/>} />
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
