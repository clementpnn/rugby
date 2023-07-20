'use client'

import { ChangeEvent, SelectHTMLAttributes } from 'react'
import { FieldError, FieldErrors } from 'react-hook-form'
import { Label } from '@/components/ui/label'
import { cva } from 'class-variance-authority'

interface SelectOption {
  value: string
  label: string
  disabled?: boolean
}

interface SelectProperties extends SelectHTMLAttributes<HTMLSelectElement> {
  id: string
  label: string
  name: string
  value: string
  options: SelectOption[]
  errors?: FieldErrors
  onChange: ( _event: ChangeEvent<HTMLSelectElement> ) => void
}

const selectVariants = cva(
  'w-fit flex items-center justify-center rounded-md font-medium transition hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue5 ',
  {
    variants: {
      variant: {
        primary: 'bg-blue6 text-neutral0 hover:bg-blue5',
        secondary: 'bg-neutral0 text-blue6 hover:bg-neutral1',
        outline: 'bg-transparent border border-neutral3 text-blue6 hover:bg-neutral1 ',
        disabled: 'pointer-events-none bg-neutral3 text-neutral5'
      },
      size: {
        md: 'label-md h-11 px-4 py-2',
        sm: 'label-sm h-9 px-3 py-2',
        lg: 'label-lg h-13 px-5 py-3'
      }
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md'
    }
  }
)

const Select: React.FC<SelectProperties> = ( { id, label, name, value, onChange, options, disabled, errors } ) => {
  const error = errors ? errors[id] as FieldError : undefined

  return (
    <div className='grid gap-y-1'>
      <Label htmlFor={id}>{label}</Label>
      <div className={selectVariants()}>
        <select id={id} name={name} disabled={disabled} onChange={onChange} value={value} className='w-full bg-transparent focus:outline-none'>
          {options.map( ( option, index ) => (
            <option key={index} value={option.value} disabled={option.disabled}>
              {option.label}
            </option>
          ) )}
        </select>
      </div>
      {error && <p className='text-red-500 mt-2'>{error.message}</p>}
    </div>
  )
}

export default Select
