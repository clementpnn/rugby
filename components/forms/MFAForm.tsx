'use client'

import { useEffect, useState } from 'react'
import { SubmitHandler, useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import ky from 'ky'
import { toast } from 'react-hot-toast'

import { MFASchema } from '@/types/Forms'
import Input from '../inputs/Input'
import useUser from '@/hooks/useUser'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Button from '../buttons/Button'

const MFAForm = () => {
  const router = useRouter()
  const [isLoading, setIsloading] = useState(false)
  const { email, password } = useUser()

  type FormData = z.infer<typeof MFASchema>

  const { handleSubmit, control, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(MFASchema),
    mode: 'onChange'
  })
  
  // eslint-disable-next-line unicorn/consistent-function-scoping
  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setIsloading(true)
    const mfaToken = `${Number(data.numberOne)}${Number(data.numberTwo)}${Number(data.numberThree)}${Number(data.numberFour)}${Number(data.numberFive)}${Number(data.numberSix)}`
    
    await fetch('/api/mfa', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({mfaToken})
    })
    .then(() => {
      signIn('credentials', {email, password})
      toast.success('Sign In')
      router.refresh()
    })
    .catch(error => toast.error(`${error}`))
    .finally(() => setIsloading(false))
      
      // try {
      //     await ky.post('/api/adminRegister', data).json()
      //     console.log('ok')
      //     // signIn('credentials', data)
      // } catch (error: any) {
      //     const errorData = await error.response.json()
      //     toast.error(`${errorData.message}`)
      // } finally {
      //     setIsloading(false);
      // }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
        <Controller name="numberOne" control={control} render={({ field }) => <Input id='numberOne' type='number' {...field} errors={errors} maxLength={1} disabled={isLoading} />} />
        <Controller name="numberTwo" control={control} render={({ field }) => <Input id='numberTwo' type='number' {...field} errors={errors} maxLength={1} disabled={isLoading} />} />
        <Controller name="numberThree" control={control} render={({ field }) => <Input id='numberThree' type='number' {...field} errors={errors} maxLength={1} disabled={isLoading} />} />
        <Controller name="numberFour" control={control} render={({ field }) => <Input id='numberFour' type='number' {...field} errors={errors} maxLength={1} disabled={isLoading} />} />
        <Controller name="numberFive" control={control} render={({ field }) => <Input id='numberFive' type='number' {...field} errors={errors} maxLength={1} disabled={isLoading} />} />
        <Controller name="numberSix" control={control} render={({ field }) => <Input id='numberSix' type='number' {...field} errors={errors} maxLength={1} disabled={isLoading} />} />
        <Button disabled={isLoading} type='submit'>
          Envoyer
        </Button>
    </form>
  )
}

export default MFAForm