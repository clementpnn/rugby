'use client'

import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form'

interface InputProps {
    label: string
    id: string
    type?: string
    required?: boolean
    register: UseFormRegister<FieldValues>
    errors: FieldErrors
    disabled?: boolean
}

const Input: React.FC<InputProps> = ({label, id, type = 'text' , required, register, errors, disabled}) => {
  return (
    <div>
        <label htmlFor={id}>{label}</label>
        <div className='mt-2'>
            <input
                id={id}
                type={type}
                autoComplete={id}
                disabled={disabled}
                {...register(id, { required })}
                className={`block ring-1 ring-inset ring-gray-300 ${errors[id] && 'focus:ring-rose-500'} ${disabled && 'opacity-50 cursor-default'}`}
            />
        </div>
    </div>
  )
}

export default Input