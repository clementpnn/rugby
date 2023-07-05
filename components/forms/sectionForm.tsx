'use client'

import { useState } from 'react'
import { SubmitHandler, useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'react-hot-toast'
import z from 'zod'

import { SectionSchema } from '@/types/forms'
import Button from '../buttons/button'
import Select from '../inputs/select'
import Input from '../inputs/input'
import { Match, MatchTeam } from '@prisma/client'
import ImageUpload from '../inputs/imageUpload'
import { useRouter } from 'next/navigation'

interface SectionFormProperties {
  matchs: (Match & { matchTeams: MatchTeam[] })[]
}

const SectionForm: React.FC<SectionFormProperties> = ({ matchs }) => {
  const router = useRouter()
  const [isLoading, setIsloading] = useState(false)
  const [image, setImage] = useState('')

  const { handleSubmit, control, formState: { errors } } = useForm<z.infer<typeof SectionSchema>>({
    resolver: zodResolver(SectionSchema),
    defaultValues: { name: '', matchId: matchs[0]?.id || '', type: 'JOURNALIST' },
    mode: 'onChange'
  })

  const onSubmit: SubmitHandler<z.infer<typeof SectionSchema>> = async (data) => {
    setIsloading(true)

    await fetch('/api/section', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ image, ...data})
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

  const matchOption = matchs.map((match) => { return { value: match.id, label: `${match.type}, ${match.stadium}, ${match.date}, ${match.time}` } })
  const typeOptions = [{value: 'JOURNALIST', label: 'JOURNALIST'}, {value: 'PHOTOGRAPHER', label: 'PHOTOGRAPHER'}]

  return (
    <form className='bg-rose-500' onSubmit={handleSubmit(onSubmit)}>
      <Controller name="name" control={control} render={({ field }) => <Input id='name' label='Name' {...field} errors={errors} disabled={isLoading} />} />
      <Controller name="matchId" control={control} render={({ field }) => <Select id='matchId' label='Match' {...field} disabled={isLoading} options={matchOption} />} />
      <Controller name="type" control={control} render={({ field }) => <Select id='type' label='Type of section' {...field} disabled={isLoading} options={typeOptions} />} />
      <Controller name="places" control={control} render={({ field }) => <Input id='places' label='Places' type='number' {...field} errors={errors} disabled={isLoading} />} />
      <ImageUpload onChange={(value) => setImage(value)} value={image} />
      <div>
        <Button disabled={isLoading} type='submit'>
                Ajouter un Section
        </Button>
      </div>
    </form>
  )
}

export default SectionForm