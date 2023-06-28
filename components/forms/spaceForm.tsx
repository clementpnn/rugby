'use client'

import { useState } from 'react'
import { SubmitHandler, useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'react-hot-toast'

import { SpaceSchema } from '@/types/forms'
import Button from '../buttons/Button'
import { Space } from '@prisma/client'
import Select from '../inputs/Select'
import Input from '../inputs/Input'

const SpaceForm = () => {
  const [isLoading, setIsloading] = useState(false)

  const { handleSubmit, control, formState: { errors } } = useForm<Space>({
    resolver: zodResolver(SpaceSchema),
    defaultValues: { stadiumId: '', type: 'JOURNALIST', places: 0 },
    mode: 'onChange'
  })

  const onSubmit: SubmitHandler<Space> = async (data) => {
    setIsloading(true)

    await fetch('/api/create/space', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
      .then(() => {
        toast.success('Space added')
      })
      .catch(error => toast.error(`${error}`))
      .finally(() => setIsloading(false))
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
        {/* ajouter un select avec tous les sades */}
      <Controller name="type" control={control} render={({ field }) => <Select label='type' {...field} disabled={isLoading} options={[{ value: 'JOURNALIST', label: 'journalist' }, { value: 'PHOTOGRAPHER', label: 'photographer' }]} />} />
      <Controller name="places" control={control} render={({ field }) => <Input id='numberFour' type='number' {...field} errors={errors} maxLength={1} disabled={isLoading} />} />

      <div>
        <Button disabled={isLoading} type='submit'>
                Ajouter un space
        </Button>
      </div>
    </form>
  )
}

export default SpaceForm