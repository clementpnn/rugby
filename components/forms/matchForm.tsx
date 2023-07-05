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
      defaultValues: {  date: '', hour: '00', minute: '00', type: 'POULE', stadium: '', teamOne: 'NEW_ZEALAND', teamTwo: 'NEW_ZEALAND' },
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

  const hours = Array.from({ length: 24 }, (_v, index) => index)
  const hourOptions = hours.map(hour => { return { value: hour.toString().padStart(2, '0'), label: hour.toString().padStart(2, '0') } })

  const minutes = Array.from({ length: 12 }, (_v, index) => index * 5)
  const minuteOptions = minutes.map(minute => { return { value: minute.toString().padStart(2, '0'), label: minute.toString().padStart(2, '0') } })

  const countryOptions = getAll().map((country) => {return { value: country.value, label: country.value.replaceAll('_', ' ')}})
  const typeOptions = [{value: 'POULE', label: 'POULE'}, {value: 'QUARTERFINAL', label: 'QUARTERFINAL'}, {value: 'SEMI_FINAL', label: 'SEMI FINAL'}, {value: 'FINAL', label: 'FINAL'}]

  return (
    <form className='bg-rose-500' onSubmit={handleSubmit(onSubmit)}>
        <Controller name="date" control={control} render={({ field }) => <Input id='date' label='date' {...field} errors={errors} disabled={isLoading} />} />
        <Controller name="hour" control={control} render={({ field }) => <Select id='hour' label='hour' {...field} disabled={isLoading} options={hourOptions} />} />
        <Controller name="minute" control={control} render={({ field }) => <Select id='minute' label='minute' {...field} disabled={isLoading} options={minuteOptions} />} />
        <Controller name="type" control={control} render={({ field }) => <Select id='type' label='type' {...field} errors={errors} disabled={isLoading} options={typeOptions} />} />
        <Controller name="stadium" control={control} render={({ field }) => <Input id='stadium' label='stadium' {...field} errors={errors} disabled={isLoading} />} />
        <Controller name="teamOne" control={control} render={({ field }) => <Select id='teamOne' label='teamOne' {...field} errors={errors} disabled={isLoading} options={countryOptions} />} />
        <Controller name="teamTwo" control={control} render={({ field }) => <Select id='teamTwo' label='teamTwo' {...field} errors={errors} disabled={isLoading} options={countryOptions} />} />
        <div>
            <Button disabled={isLoading} type='submit'>
                Ajouter une team
            </Button>
        </div>
    </form>
  )
}

export default TeamForm