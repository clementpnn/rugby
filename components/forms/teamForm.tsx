'use client'

import { useState } from 'react'
import { SubmitHandler, useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'react-hot-toast'

import { TeamSchema } from '@/types/forms'
import Button from '../buttons/button'
import { COUNTIES, POULE, Team } from '@prisma/client'
import Select from '../inputs/select'
import useCountries from '@/hooks/useCountries'
import { useRouter } from 'next/navigation'

interface TeamFormProperties {
  allTeams?: Team[]
}

const TeamForm: React.FC<TeamFormProperties> = ({ allTeams }) => {
  const [isLoading, setIsloading] = useState(false)
  const { getAll } = useCountries()
  const router = useRouter()

  const countries = getAll().map((country) => {
    return allTeams?.some((team) => team.country === country.value) 
    ? { value: country.value, label: country.value.replaceAll('_', ' '), disabled: true } 
    : { value: country.value, label: country.value.replaceAll('_', ' '), disabled: false}
  })

  const poules = ['A', 'B', 'C', 'D'].map((poule) => {
    const pouleCount = allTeams?.filter((team) => team.poule === poule).length || 0
    const isDisabled = pouleCount >= 4
    return { value: poule, label: `Poule ${poule}`, disabled: isDisabled }
  })

  const defaultCountry = countries.find((country) => !country.disabled)?.value as COUNTIES
  const defaultPoule = poules.find((poule) => !poule.disabled)?.value as POULE

  const { handleSubmit, control } = useForm<Team>({
      resolver: zodResolver(TeamSchema),
      defaultValues: { country: defaultCountry, poule: defaultPoule },
      mode: 'onChange'
  })
  
  const onSubmit: SubmitHandler<Team> = async (data) => {
    setIsloading(true)
    
    await fetch('/api/create/team', {
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

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller name="poule" control={control} render={({ field }) => <Select label='poule' {...field} disabled={isLoading} options={poules} />} />
      <Controller name="country" control={control} render={({ field }) => <Select label='country' {...field} disabled={isLoading} options={countries} />} />
      <div>
        <Button disabled={isLoading} type='submit'>
                Ajouter une team
        </Button>
      </div>
    </form>
  )
}

export default TeamForm