'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { signIn, useSession } from 'next-auth/react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import Input from '../inputs/Input'
import Button from '../Button'
import ImageUpload from '../inputs/ImageUpload'
import SelectJob from '../inputs/SelectJob'
import { SchemaLogin } from '@/types/Auth'
import { toast } from 'react-hot-toast'
import { User } from '@prisma/client'

interface LoginFormProperties {
    currentUser?: User | null
}

const LoginForm: React.FC<LoginFormProperties> = ({ currentUser }) => {
    const session = useSession()
    const router = useRouter()
    const [isLoading, setIsloading] = useState(false)

    useEffect(() => {
        if (session?.status === 'authenticated') {
            if (currentUser?.role === 'USER') {
                router.push('/user') //this page don't exist
            }

            if (currentUser?.role === 'ADMIN') {
                router.push('/adminDashboard')
            }

            if (currentUser?.role === 'DEV') {
                router.push('/page') //this page don't exist
            }
        }
    }, [session?.status, currentUser?.role, router])

    type FormData = z.infer<typeof SchemaLogin>

    const { handleSubmit, control, formState: { errors } } = useForm<FormData>({
      resolver: zodResolver(SchemaLogin),
      defaultValues: { email: '', password: '' },
      mode: 'onChange'
    })

    const onSubmit: SubmitHandler<FormData> = async (data) => {
        setIsloading(true)

        try {
            await signIn('credentials', data)
            router.refresh()
        } catch (error) {
            toast.error(`${error}`)
        } finally {
            setIsloading(true) 
        }
    }

    // useEffect(() => {
    //     if (session?.status === 'authenticated') {
    //         if (!currentUser?.accreditation) {
    //             return (
    //                 <div>azerty</div>
    //             )
    //         }

    //         if (currentUser) {

    //         }
    //     }
    // }, [session?.status, currentUser, router])

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Controller name="email" control={control} render={({ field }) => <Input id='email' label='email' type='email' {...field} errors={errors} disabled={isLoading} />} />
            <Controller name="password" control={control} render={({ field }) => <Input id='password' label='Mot de passe' type='password' {...field} errors={errors} disabled={isLoading} />} />
            {/* <ImageUpload onChange={(value) => setCustomValue('accreditation', value)} value={accreditation}/> */}
            <div>
                <Button disabled={isLoading} type='submit'>
                    Register 
                </Button>
            </div>
        </form>
    )
}

export default LoginForm