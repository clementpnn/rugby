/* eslint-disable no-console */
'use client'

import { useState } from 'react'
import { SubmitHandler, useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'react-hot-toast'

import Button from '../buttons/button'
import { AdminSchema } from '@/types/forms'
import Input from '../inputs/input'
import Select from '../inputs/select'
import { User } from '@prisma/client'
import useStep, { STEPS } from '@/hooks/useStep'
import useUser from '@/hooks/useUser'
import Container from '@/components/containers/container'

import { AiOutlineEye } from 'react-icons/ai'

const AdminForm = () => {
  const [ isLoading, setIsloading ] = useState( false )
  const { step, setStep } = useStep()
  const { setEmail, setPassword } = useUser()

  const {
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<User & { confirmPassword: string }>( {
    resolver: zodResolver( AdminSchema ),
    defaultValues: {
      firstName: '',
      lastName: '',
      role: 'ADMIN',
      email: '',
      password: '',
      confirmPassword: ''
    },
    mode: 'onChange'
  } )

  const onSubmit: SubmitHandler<User & { confirmPassword: string }> = async (
    data
  ) => {
    setIsloading( true )

    await fetch( '/api/create/admin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify( data )
    } )
      .then( () => {
        toast.success( 'Email send' )
        setStep( ( step + 1 ) as STEPS )
        setEmail( data.email )
        setPassword( data.password )
      } )
      .catch( ( error ) => toast.error( `${error}` ) )
      .finally( () => setIsloading( false ) )
  }

  return (
    <Container>
      <form onSubmit={handleSubmit( onSubmit )}>
        <Controller
          name='firstName'
          control={control}
          render={( { field } ) => (
            <Input
              id='firstName'
              label='Prénom'
              {...field}
              errors={errors}
              disabled={isLoading}
            />
          )}
        />
        <Controller
          name='lastName'
          control={control}
          render={( { field } ) => (
            <Input
              id='lastName'
              label='Nom'
              {...field}
              errors={errors}
              disabled={isLoading}
            />
          )}
        />
        <Controller
          name='role'
          control={control}
          render={( { field } ) => (
            <Select
              id='role'
              label='role'
              {...field}
              disabled={isLoading}
              options={[
                { value: 'ADMIN', label: 'Admin' },
                { value: 'DEV', label: 'Dev' },
                { value: 'dqdqdqz', label: 'DJNQKJDJKQ' }
              ]}
            />
          )}
        />
        <Controller
          name='email'
          control={control}
          render={( { field } ) => (
            <Input
              id='email'
              label='email'
              type='email'
              {...field}
              errors={errors}
              disabled={isLoading}
            />
          )}
        />
        <Controller
          name='password'
          control={control}
          render={( { field } ) => (
            <Input
              id='password'
              label='Mot de passe'
              type='password'
              {...field}
              errors={errors}
              disabled={isLoading}
            />
          )}
        />
        <Controller
          name='confirmPassword'
          control={control}
          render={( { field } ) => (
            <Input
              id='confirmPassword'
              label='Confirmez le mot de passe'
              type='password'
              {...field}
              errors={errors}
              disabled={isLoading}
            />
          )}
        />
        <div>
          <Button
            disabled={isLoading}
            type='submit'
            size='lg'
            icon={<AiOutlineEye className='w-full h-full' />}
            iconPosition='left'
            variant='primary'
            className='bg-green-700'
          >
            Button
          </Button>
        </div>

      </form>

    </Container>
  )
}

export default AdminForm
