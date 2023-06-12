'use client'

import { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { signIn, useSession } from 'next-auth/react'
import axios from 'axios'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'

import Input from '../inputs/Input'
import Button from '../Button'
import ImageUpload from '../inputs/ImageUpload'
import SelectJob from '../inputs/SelectJob'

type Variant = 'LOGIN' | 'REGISTER'

const AuthForm = () => {
    const session = useSession()
    const router = useRouter()
    const [variant, setVariant] = useState<Variant>('LOGIN')
    const [isLoading, setIsloading] = useState(false)

    useEffect(() => {
        if (session?.status === 'authenticated') {
            router.push('/user')
        }
    }, [session?.status, router])

    const toggleVariant = useCallback(() => {
        if (variant === 'LOGIN') {
            setVariant('REGISTER')
        } else {
            setVariant('LOGIN')
        }
    }, [variant])

    const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<FieldValues>({
        defaultValues: {
            firstName: '',
            lastName: '',
            company: '',
            job: '',
            accreditation: '',
            email: '',
            password: ''
        }
    })

    const accreditation = watch('accreditation')
    const job = watch('job')

    const setCustomValue = (id: string, value: any) => {
        setValue(id, value, {
          shouldDirty: true,
          shouldTouch: true,
          shouldValidate: true
        })
    }

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsloading(true)

        if (variant === 'REGISTER') {
            axios.post('/api/register', data)
            .then(() => signIn('credentials', data))
            .catch(() => console.log('toast'))
            .finally(() => setIsloading(false))
        }

        if (variant === 'LOGIN') {
            signIn('credentials', { ...data, redirect: false})
            .then((callback) => {
                if (callback?.ok) {
                    // toast
                    router.push('/user')
                }

                if (callback?.error) {
                    // toast
                }
            })
            .finally(() => setIsloading(false))
        }
    }

  return (
    <>
        <form onSubmit={handleSubmit(onSubmit)}>
            {variant === 'REGISTER' && (
                <>
                    <Input id='firstName' label='Prénom' register={register} errors={errors} disabled={isLoading} />
                    <Input id='lastName' label='Nom' register={register} errors={errors} disabled={isLoading} />
                    <Input id='company' label='Entreprise' register={register} errors={errors} disabled={isLoading} />
                    <SelectJob label='Métier' value={job} onChange={(value) => setCustomValue('job', value)} />
                    <ImageUpload onChange={(value) => setCustomValue('accreditation', value)} value={accreditation}/>
                </>
            )}
            <Input id='email' label='Email' type='email' register={register} errors={errors} disabled={isLoading} />
            <Input id='password' label='Password' type='password' register={register} errors={errors} disabled={isLoading} />
            <div>
                <Button disabled={isLoading} type='submit'>
                    {variant === 'LOGIN' ? 'Sign in' : 'Register'} 
                </Button>
            </div>
        </form>
        
        <div className='flex gap-2 text-sm mt-6 px-2 text-gray-500'>
                <div>
                    {variant === 'LOGIN' ? 'New to Message ?' : 'Already have an account ?'}
                </div>
                <div onClick={toggleVariant} className='underline cursor-pointer'>
                    {variant === 'LOGIN' ? 'Create an account' : 'Login '}
                </div>
        </div>
    </>
  )
}

export default AuthForm