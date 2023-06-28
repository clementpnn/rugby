'use client'

import { useState } from 'react'
import { SubmitHandler, useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'react-hot-toast'

import { StadiumSchema } from '@/types/forms'
import Button from '../buttons/Button'
import { Team } from '@prisma/client'
import Select from '../inputs/Select'

const TeamForm = () => {
  const [isLoading, setIsloading] = useState(false)

  const { handleSubmit, control } = useForm<Team>({
    resolver: zodResolver(StadiumSchema),
    defaultValues: { country: '', poule: 'A' },
    mode: 'onChange'
  })

  const onSubmit: SubmitHandler<Team> = async (data) => {
    setIsloading(true)

    await fetch('/api/create/team', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
      .then(() => {
        toast.success('Stadium added')
      })
      .catch(error => toast.error(`${error}`))
      .finally(() => setIsloading(false))
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller name="poule" control={control} render={({ field }) => <Select label='poule' {...field} disabled={isLoading} options={[{ value: 'A', label: 'Poule A' }, { value: 'B', label: 'Poule B' }, { value: 'C', label: 'Poule C' }, { value: 'D', label: 'Poule D' }]} />} />
      {/* attendre lib pour country */}
      <div>
        <Button disabled={isLoading} type='submit'>
                Ajouter une team
        </Button>
      </div>
    </form>
  )
}

export default TeamForm