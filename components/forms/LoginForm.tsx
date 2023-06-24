'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'react-hot-toast'
import { z } from 'zod'

import Input from '../inputs/Input'
import Button from '../buttons/Button'
import { LoginSchema } from '@/types/Auth.d'
import useUser from '@/hooks/useUser'
import useStep, { STEPS } from '@/hooks/useStep'

const LoginForm = () => {
    const router = useRouter()
    const [isLoading, setIsloading] = useState(false)
    const { step, setStep } = useStep()
    const { setEmail, setPassword } = useUser()

    type FormData = z.infer<typeof LoginSchema>

    const { handleSubmit, control, formState: { errors } } = useForm<FormData>({
      resolver: zodResolver(LoginSchema),
      defaultValues: { email: '', password: '' },
      mode: 'onChange'
    })

    const onSubmit: SubmitHandler<FormData> = async (data) => {
        setIsloading(true)

        await fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
          })
          .then(() => {
            toast.success('Email send')
            setStep(step + 1 as STEPS)
            setEmail(data.email)
            setPassword(data.password)
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
                    Register 
                </Button>
            </div>
        </form>
    )
}

export default LoginForm