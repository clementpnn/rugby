'use client'

import { InputHTMLAttributes } from 'react'
import { FieldErrors, FieldError } from 'react-hook-form'



interface InputProperties extends InputHTMLAttributes<HTMLInputElement> {
    label?: string
    id: string
    errors?: FieldErrors
    maxLength?: number
}

const Input: React.FC<InputProperties> = ({ label, id, type = 'text', errors, disabled, maxLength = 200, ...rest }) => {
  const error = errors ? errors[id] as FieldError : undefined
  return (
    <>
      <label htmlFor={id}>{label}</label>
      <div className='mt-2'>
        <input
          id={id}
          type={type}
          autoComplete={id}
          disabled={disabled}
          maxLength={maxLength}
          {...rest}
          className={`block ring-1 ring-inset ring-gray-300 ${disabled && 'opacity-50 cursor-default'}`}
        />
        {error && <p className='text-red-500 mt-2'>{error.message}</p>}
      </div>
    </>
  )
}

export default Input