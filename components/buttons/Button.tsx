'use client'

interface ButtonProperties {
  type?: 'button' | 'submit'
  fullWidth?: boolean
  children?: React.ReactNode
  onclick?: () => void
  secondary?: boolean
  danger?: boolean
  disabled?: boolean
}

const Button: React.FC<ButtonProperties> = ({ type= 'button', fullWidth, children, onclick, secondary, danger, disabled }) => {
  return (
    <button
      onClick={onclick}
      type={type}
      disabled={disabled}
      className={`
        ${disabled && 'opacity-50 cursor-default'}
        ${fullWidth && 'w-full'}
        ${secondary ? 'text-gray-900' : 'text-white'}
        ${danger && 'bg-rose-500 hover:bg-rose-600 focus-visible:outline-rose-600'}
        ${!secondary && !danger && 'bg-sky-500 hover:bg-sky-600 focus-visible:outline-sky-600'}
        `}
    >
      {children}
    </button>
  )
}

export default Button