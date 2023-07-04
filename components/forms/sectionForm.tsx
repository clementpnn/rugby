'use client'

import { useState } from 'react'
import { SubmitHandler, useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'react-hot-toast'

import { SectionSchema } from '@/types/forms'
import Button from '../buttons/button'
import { Section } from '@prisma/client'
import Select from '../inputs/select'
import Input from '../inputs/input'

const SpaceForm = () => {
  const [isLoading, setIsloading] = useState(false)

  const { handleSubmit, control, formState: { errors } } = useForm<Section>({
    resolver: zodResolver(SectionSchema),
    defaultValues: { matchId: '', type: 'JOURNALIST', places: 0 },
    mode: 'onChange'
  })

  const onSubmit: SubmitHandler<Section> = async (data) => {
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
      <Controller name="type" control={control} render={({ field }) => <Select label='type' {...field} disabled={isLoading} options={[{ value: 'JOURNALIST', label: 'journalist', disabled: false }, { value: 'PHOTOGRAPHER', label: 'photographer', disabled: false }]} />} />
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