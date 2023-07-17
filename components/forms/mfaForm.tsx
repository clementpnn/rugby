'use client'

import { useState } from 'react'
import { SubmitHandler, useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'react-hot-toast'

import { MFASchema } from '@/types/forms'
import Input from '../inputs/input'
import useUser from '@/hooks/useUser'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Button from '../buttons/button'

const MFAForm = () => {
  const router = useRouter()
  const [ isLoading, setIsloading ] = useState( false )
  const { email, password } = useUser()

  const { handleSubmit, control, formState: { errors } } = useForm( {
    resolver: zodResolver( MFASchema ),
    mode: 'onChange'
  } )

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
        toast.success( 'Sign In' )
        router.refresh()
      } )
    setIsloading( false )
  }

  return (
    <form onSubmit={handleSubmit( onSubmit )}>
      <Controller name="numberOne" control={control} render={( { field } ) => <Input id='numberOne' type='number' {...field} errors={errors} maxLength={1} disabled={isLoading} />} />
      <Controller name="numberTwo" control={control} render={( { field } ) => <Input id='numberTwo' type='number' {...field} errors={errors} maxLength={1} disabled={isLoading} />} />
      <Controller name="numberThree" control={control} render={( { field } ) => <Input id='numberThree' type='number' {...field} errors={errors} maxLength={1} disabled={isLoading} />} />
      <Controller name="numberFour" control={control} render={( { field } ) => <Input id='numberFour' type='number' {...field} errors={errors} maxLength={1} disabled={isLoading} />} />
      <Controller name="numberFive" control={control} render={( { field } ) => <Input id='numberFive' type='number' {...field} errors={errors} maxLength={1} disabled={isLoading} />} />
      <Controller name="numberSix" control={control} render={( { field } ) => <Input id='numberSix' type='number' {...field} errors={errors} maxLength={1} disabled={isLoading} />} />
      <Button disabled={isLoading} type='submit' variant='primary' size='md'>
          Envoyer
      </Button>
    </form>
  )
}

export default MFAForm
