'use client'
import { ButtonUI } from '@/components/ui/button'

interface ButtonProperties extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'link' | 'disabled' | null | undefined
  size?: 'md' | 'sm' | 'lg' | 'iconSm' | 'iconMd' | 'iconLg' | null | undefined
  type?: 'button' | 'submit'
  onClick?: () => void
  className?: string
  icon?: React.ReactNode
  iconPosition?: 'right' | 'left'
  children?: React.ReactNode
}

const Button: React.FC<ButtonProperties> = ( {
  variant,
  size,
  type = 'button',
  className,
  icon,
  iconPosition,
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
      {iconPosition==='left' && <div
        className={`
          ${size === 'iconSm' || size === 'sm' && 'w-4 h-4'} 
          ${size === 'iconMd' || size === 'md' && 'w-5 h-5'} 
          ${size === 'iconLg' || size === 'lg' && 'w-6 h-6'} 
        `}
      >
        {icon}
      </div>}
      <span className={`
        ${iconPosition === 'left' && size==='sm' && 'pl-1'} 
        ${iconPosition === 'right' && 'pr-1'} 
      `}>
        {children}
      </span>
      {iconPosition==='right' && <div
        className={`
          ${size === 'iconSm' || size === 'sm' && 'w-4 h-4'} 
          ${size === 'iconMd' || size === 'md' && 'w-5 h-5'} 
          ${size === 'iconLg' || size === 'lg' && 'w-6 h-6'} 
        `}
      >
        {icon}
      </div>}
    </ButtonUI>
  )
}

export default Button
