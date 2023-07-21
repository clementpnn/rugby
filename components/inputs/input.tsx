import React, { useState, useCallback, useEffect } from 'react'
import { InputHTMLAttributes } from 'react'
import { FieldErrors, FieldError } from 'react-hook-form'
import { InputUI } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface InputProperties extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string
  id: string
  type?: string
  disabled?: boolean
  errors?: FieldErrors
  icon?: React.ReactNode
  iconActive?: React.ReactNode
  iconPosition?: 'right' | 'left'
  placeholder?: string | undefined
  onClick?: () => void
  className?: string
  size?: 'md' | 'sm' | 'lg'
  variant?: 'default' | 'code'
}

const Input: React.FC<InputProperties> = ( {
  label,
  id,
  type = 'text',
  errors,
  disabled = false,
  size = 'md',
  variant = 'default',
  icon,
  iconActive,
  className,
  placeholder='',
  iconPosition = 'right',
  onClick,
  ...rest
} ) => {
  const [ isClicked, setIsClicked ] = useState( false )
  const [ maxLength, setMaxLength ] = useState( 200 )
  const [ inputValue, setInputValue ] = useState( '' )
  const [ isActive, setIsActive ] = useState( false )

  const handleIconClick = useCallback(
    ( _event: React.MouseEvent<HTMLDivElement> ) => {
      setIsClicked( !isClicked )
      if ( onClick ) {
        onClick()
      }
    },
    [ isClicked, onClick ]
  )

  const handleInputChange = useCallback( ( event: { target: { value: React.SetStateAction<string> } } ) => setInputValue( event.target.value ), [] )
  const handleInputFocus = useCallback( () => {
    setIsActive( true )
  }, [] )

  const handleInputBlur = useCallback( () => {
    setIsActive( false )
  }, [] )

  const error = errors ? ( errors[id] as FieldError ) : undefined

  useEffect( () => {
    if ( variant === 'code' ) {
      setMaxLength( 1 )
    } else {
      setMaxLength( 200 )
    }
  }, [ variant ] )

  return (
    <div className={`${className} grid gap-y-1`}>
      {variant === 'default' && <Label htmlFor={id}>{label}</Label>}
      <div className='relative items-center'>
        {icon && iconPosition === 'left' && variant === 'default' && (
          <div
            className={`${size === 'sm' && 'w-9 h-9 left-1'} ${
              size === 'md' && 'w-10 h-10 left-1'
            } ${
              size === 'lg' && 'w-11 h-11 left-1'
            } absolute left-2 top-1/2 transform -translate-y-1/2`}
            onClick={handleIconClick}
          >
            <div className='w-full h-full flex justify-center items-center'>
              <div
                className={`${size === 'sm' && 'w-4 h-4'} ${
                  size === 'md' && 'w-5 h-5'
                } ${
                  size === 'lg' && 'w-6 h-6'
                } flex justify-center items-center text-neutral5`}
              >
                {isClicked ? iconActive : icon}
              </div>
            </div>
          </div>
        )}
        {variant === 'code' && !inputValue && !isActive && (
          <div className='absolute inset-y-0 left-1/2 transform -translate-x-1/2 top-1/2 -translate-y-1/2 w-3 h-3 bg-neutral5 rounded-full'></div>
        )}
        <InputUI
          id={id}
          type={type}
          disabled={disabled}
          size={size}
          variant={variant}
          maxLength={maxLength}
          placeholder={`${variant === 'default' ? placeholder : ''}`}
          className={`
            ${iconPosition === 'left' && size === 'sm' ? 'pl-11' : ''}
            ${iconPosition === 'left' && size === 'md' ? 'pl-12' : ''}
            ${iconPosition === 'left' && size === 'lg' ? 'pl-[52px]' : ''}
            ${variant === 'code' && 'px-0'}
            ${className}         
          `}
          value={inputValue}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          {...rest}
        ></InputUI>
        {icon && iconPosition === 'right' && variant === 'default' && (
          <div
            className={`${size === 'sm' && 'w-9 h-9 right-1'} ${
              size === 'md' && 'w-10 h-10 right-1'
            } ${
              size === 'lg' && 'w-11 h-11 right-1'
            } absolute right-0 top-1/2 transform -translate-y-1/2`}
            onClick={handleIconClick}
          >
            <div className='w-full h-full flex justify-center items-center'>
              <div
                className={`${size === 'sm' && 'w-4 h-4'} ${
                  size === 'md' && 'w-5 h-5'
                } ${
                  size === 'lg' && 'w-6 h-6'
                } flex justify-center items-center text-neutral5 hover:text-neutral6`}
              >
                {isClicked ? iconActive : icon}
              </div>
            </div>
          </div>
        )}
      </div>
      {error && variant === 'default' && <p className='text-red6 base-md'>{error.message}</p>}
    </div>
  )
}

export default Input
