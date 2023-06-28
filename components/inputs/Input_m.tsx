import {InputHTMLAttributes} from 'react'
import {FieldError, FieldErrors} from 'react-hook-form'

interface InputProperties extends InputHTMLAttributes<HTMLInputElement> {
    label?: string
    id: string
    errors?: FieldErrors
    maxLength?: number
}

const Input_m: React.FC<InputProperties> = ({ label, id, type = 'text', errors, disabled, maxLength = 200, ...rest }) => {
    const error = errors ? errors[id] as FieldError : undefined
    return (
        <>
            {label && <label className={`text-gray-400`} htmlFor={id}>{label}</label>}
            <div>
                <input
                    id={id}
                    type={type}
                    autoComplete={id}
                    disabled={disabled}
                    maxLength={maxLength}
                    {...rest}
                    className={`block ring-1 ring-inset ring-gray-300 h-[48px] w-[100%] ${disabled && 'opacity-50 cursor-default'}`}
                />
                {error && <p className='text-red-500 mt-2'>{error.message}</p>}
            </div>
        </>
    )
}

export default Input_m