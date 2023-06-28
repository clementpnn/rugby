'use client'

import { useState } from 'react'
import { SubmitHandler, useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'react-hot-toast'

import Button from '../buttons/button'
import { LoginSchema } from '@/types/forms'
import Input from '../inputs/input'
import useStep, { STEPS } from '@/hooks/useStep'
import useUser from '@/hooks/useUser'

const LoginForm = () => {
  const [isLoading, setIsloading] = useState(false)
  const { step, setStep } = useStep()
  const { setEmail, setPassword } = useUser()

  const { handleSubmit, control, formState: { errors } } = useForm({
    resolver: zodResolver(LoginSchema),
    defaultValues: { email: '', password: '' },
    mode: 'onChange'
  })

  const onSubmit: SubmitHandler<any> = async (data) => {
    setIsloading(true)

    await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
      .then((callback) => {
        if (callback?.ok) {
          toast.success('Email send')
          setStep(step + 1 as STEPS)
          setEmail(data.email)
          setPassword(data.password)
        }
      })
      .catch(error => toast.error(`${error}`))
      .finally(() => setIsloading(false))
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller name="email" control={control} render={({ field }) => <Input id='email' label='email' type='email' {...field} errors={errors} disabled={isLoading} />} />
      <Controller name="password" control={control} render={({ field }) => <Input id='password' label='Mot de passe' type='password' {...field} errors={errors} disabled={isLoading} />} />
      <div>
        <Button disabled={isLoading} type='submit'>
                Login
        </Button>
      </div>
    </form>
  )
}

export default LoginForm
