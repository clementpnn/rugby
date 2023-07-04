'use client'

import { useState } from 'react'
import { SubmitHandler, useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'react-hot-toast'
import z from 'zod'

import { MatchSchema } from '@/types/forms'
import Button from '../buttons/button'
import Select from '../inputs/select'
import useCountries from '@/hooks/useCountries'
import { useRouter } from 'next/navigation'
import Input from '../inputs/input'

const TeamForm = () => {
  const [isLoading, setIsloading] = useState(false)
  const { getAll } = useCountries()
  const router = useRouter()

  const { handleSubmit, control, formState: { errors } } = useForm<z.infer<typeof MatchSchema>>({
      resolver: zodResolver(MatchSchema),
      defaultValues: {  date: '', time: '', type: 'POULE', stadium: '', teamOne: 'NEW_ZEALAND', teamTwo: 'NEW_ZEALAND' },
      mode: 'onChange'
  })
  
  const onSubmit: SubmitHandler<z.infer<typeof MatchSchema>> = async (data) => {
    
    setIsloading(true)
    
    await fetch('/api/match', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
      .then((callback) => {
        if (callback.status === 200) {
          toast.success(`${callback.statusText}`)
          router.refresh()
        }

        if (callback.status !== 200) {
          toast.error(`${callback.statusText}`)
        }

        setIsloading(false)
      })
  }

  const countries = getAll().map((country) => {return { value: country.value, label: country.value.replaceAll('_', ' ')}})
  const types = [{value: 'POULE', label: 'POULE'}, {value: 'QUARTERFINAL', label: 'QUARTERFINAL'}, {value: 'SEMI_FINAL', label: 'SEMI FINAL'}, {value: 'FINAL', label: 'FINAL'}]

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
        <Controller name="date" control={control} render={({ field }) => <Input id='date' {...field} errors={errors} disabled={isLoading} />} />
        <Controller name="time" control={control} render={({ field }) => <Input id='time' {...field} errors={errors} disabled={isLoading} />} />
        <Controller name="type" control={control} render={({ field }) => <Select id='type' label='type' {...field} errors={errors} disabled={isLoading} options={types} />} />
        <Controller name="stadium" control={control} render={({ field }) => <Input id='stadium' {...field} errors={errors} disabled={isLoading} />} />
        <Controller name="teamOne" control={control} render={({ field }) => <Select id='teamOne' label='teamOne' {...field} errors={errors} disabled={isLoading} options={countries} />} />
        <Controller name="teamTwo" control={control} render={({ field }) => <Select id='teamTwo' label='teamTwo' {...field} errors={errors} disabled={isLoading} options={countries} />} />
        <div>
            <Button disabled={isLoading} type='submit'>
                Ajouter une team
            </Button>
        </div>
    </form>
  )
}

export default TeamForm