'use client'

import { useState } from 'react'
import axios from 'axios'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'

import Input from '../inputs/Input'
import Button from '../Button'
import SelectJob from '../inputs/SelectJob'

const AccreditedForm = () => {

    const [isLoading, setIsloading] = useState(false)

    const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<FieldValues>({
        defaultValues: {
            firstName: '',
            lastName: '',
            company: '',
            job: '',
            email: ''
        }
    })

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

        axios.post('/api/accredited', data)
        .then(() => {})
        .catch(() => {})
        .finally(() => setIsloading(false))
        
    }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>

        <Input id='firstName' label='Prénom' register={register} errors={errors} disabled={isLoading} />
        <Input id='lastName' label='Nom' register={register} errors={errors} disabled={isLoading} />
        <Input id='company' label='Entreprise' register={register} errors={errors} disabled={isLoading} />
        <SelectJob label='Métier' value={job} onChange={(value) => setCustomValue('job', value)} />
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