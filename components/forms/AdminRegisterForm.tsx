'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { signIn, useSession } from 'next-auth/react'
import { FieldValues, SubmitHandler, useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import ky from 'ky'
import { toast } from 'react-hot-toast'

import { SchemaAdminRegister } from '@/types/Auth'
import Input from '../inputs/Input'
import Select from '../inputs/Select'
import Button from '../Button'
import { User } from '@prisma/client'

interface AdminRegisterFormProperties {
  currentUser?: User | null
}

const AdminRegisterForm: React.FC<AdminRegisterFormProperties> = ({ currentUser }) => {
    const session = useSession()
    const router = useRouter()
    const [isLoading, setIsloading] = useState(false)

    useEffect(() => {
      if (session?.status === 'authenticated') {
        if (currentUser?.role === 'ADMIN') {
          router.push('/adminDashboard')
        }

        if (currentUser?.role === 'DEV') {
          router.push('/page') //this page don't exist
        }
      }
    }, [session?.status,currentUser?.role, router])

    type FormData = z.infer<typeof SchemaAdminRegister>

    const { handleSubmit, control, formState: { errors } } = useForm<FormData>({
      resolver: zodResolver(SchemaAdminRegister),
      defaultValues: { firstName: '', lastName: '', email: '', role: 'ADMIN', password: '', confirmPassword:'' },
      mode: 'onChange'
    })

    // eslint-disable-next-line unicorn/consistent-function-scoping
    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        setIsloading(true)

        await fetch('/api/adminRegister', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
          })
          .then(() => {
            signIn('credentials', data)
            toast.success('Sign in')
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
        <Controller name="firstName" control={control} render={({ field }) => <Input id='firstName' label='Prénom' {...field} errors={errors} disabled={isLoading} />} />
        <Controller name="lastName" control={control} render={({ field }) => <Input id='lastName' label='Nom' {...field} errors={errors} disabled={isLoading} />} />
        <Controller name="role" control={control} render={({ field }) => <Select label='role' {...field} disabled={isLoading} />} />
        <Controller name="email" control={control} render={({ field }) => <Input id='email' label='email' type='email' {...field} errors={errors} disabled={isLoading} />} />
        <Controller name="password" control={control} render={({ field }) => <Input id='password' label='Mot de passe' type='password' {...field} errors={errors} disabled={isLoading} />} />
        <Controller name="confirmPassword" control={control} render={({ field }) => <Input id='confirmPassword' label='Confirmez le mot de passe' type='password' {...field} errors={errors} disabled={isLoading} />} />
        <div>
            <Button disabled={isLoading} type='submit'>
                Register
            </Button>
        </div>
    </form>
  )
}

export default AdminRegisterForm