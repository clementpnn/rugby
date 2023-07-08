'use client'

import { ChangeEvent, SelectHTMLAttributes } from 'react'
import { FieldError, FieldErrors } from 'react-hook-form'

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

const Select: React.FC<SelectProperties> = ( { id, label, name, value, onChange, options, disabled, errors } ) => {
  const error = errors ? errors[id] as FieldError : undefined

  return (
    <div className='block'>
      <label>{label}</label>
      <select name={name} disabled={disabled} onChange={onChange} value={value}>
        {options.map( ( option, index ) => (
          <option key={index} value={option.value} disabled={option.disabled}>
            {option.label}
          </option>
        ) )}
      </select>
      {error && <p className='text-red-500 mt-2'>{error.message}</p>}
    </div>
  )}

export default Select
