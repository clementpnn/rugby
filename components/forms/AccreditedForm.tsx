'use client'

import { useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'

import Input from '../inputs/Input'
import Button from '../Button'

const AccreditedForm = () => {

    const [isLoading, setIsloading] = useState(false)

    const { register, handleSubmit, formState: { errors } } = useForm<FieldValues>({
        defaultValues: {
            email: ''
        }
    })

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsloading(true)
        fetch('/api/email', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
          })
          .then(() => {
            toast.success('Sign in')
          })
          .catch(error => toast.error(`${error}`))
          .finally(() => setIsloading(false))
    }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
        <Input id='email' label='Email' type='email' register={register} errors={errors} disabled={isLoading} />

        <div>
            <Button disabled={isLoading} type='submit'>
                Envoyer 
            </Button>
        </div>

    </form>
  )
}

export default AccreditedForm