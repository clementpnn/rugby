'use client'
import { ButtonUI } from '@/components/ui/button'

interface ButtonProperties extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant: 'primary' | 'secondary' | 'outline' | 'link' | 'disabled' | null | undefined
  size: 'md' | 'sm' | 'lg' | 'iconSm' | 'iconMd' | 'iconLg' | null | undefined
  type?: 'button' | 'submit'
  onClick?: () => void
  className?: string
  children?: React.ReactNode
}

// const Button: React.FC<ButtonProperties> = ({ type= 'button', fullWidth, children, onclick, secondary, danger, disabled }) => {
//   return (
//     <button
//       onClick={onclick}
//       type={type}
//       disabled={disabled}
//       className={`
//         ${disabled && 'opacity-50 cursor-default'}
//         ${fullWidth && 'w-full'}
//         ${secondary ? 'text-gray-900' : 'text-white'}
//         ${danger && 'bg-rose-500 hover:bg-rose-600 focus-visible:outline-rose-600'}
//         ${!secondary && !danger && 'bg-sky-500 hover:bg-sky-600 focus-visible:outline-sky-600'}
//         `}
//     >
//       {children}
//     </button>
//   )
// }

// export default Button

const Button: React.FC<ButtonProperties> = ( {
  variant,
  size,
  type = 'button',
  className,
  children,
  onClick,
  disabled
} ) => {
  return (
    <ButtonUI
      disabled={disabled}
      variant={variant}
      size={size}
      type={type}
      onClick={onClick}
      className={className}
    >
      {children}
    </ButtonUI>
  )
}

export default Button
