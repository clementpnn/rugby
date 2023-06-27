'use client'

import { useState } from 'react'
import { SubmitHandler, useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'react-hot-toast'

import { StadiumSchema } from '@/types/Forms'
import Input from '../inputs/Input'
import Button from '../buttons/Button'
import { Stadium } from '@prisma/client'

const StadiumForm = () => {
  const [isLoading, setIsloading] = useState(false)

  const { handleSubmit, control, formState: { errors } } = useForm<Stadium>({
    resolver: zodResolver(StadiumSchema),
    defaultValues: { name: '', adress: ''},
    mode: 'onChange'
  })

  // eslint-disable-next-line unicorn/consistent-function-scoping
  const onSubmit: SubmitHandler<Stadium> = async (data) => {
      setIsloading(true)

      await fetch('/api/...', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        })
        .then(() => {
          toast.success('ok')
        })
        .catch(error => toast.error(`${error}`))
        .finally(() => setIsloading(false))
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
        <Controller name="name" control={control} render={({ field }) => <Input id='name' label='Nom du stade' {...field} errors={errors} disabled={isLoading} />} />
        <Controller name="adress" control={control} render={({ field }) => <Input id='adress' label='Adresse' {...field} errors={errors} disabled={isLoading} />} />
        <div>
            <Button disabled={isLoading} type='submit'>
                Ajouter un stade
            </Button>
        </div>
    </form>
  )
}

export default StadiumForm