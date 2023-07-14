'use client'
import { ButtonUI } from '@/components/ui/button'

export interface ButtonProperties extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant: 'primary' | 'secondary' | 'outline' | 'link' | 'disabled' | null | undefined
  size: 'md' | 'sm' | 'lg' | 'iconSm' | 'iconMd' | 'iconLg' | null | undefined
  type?: 'button' | 'submit'
  onClick?: () => void
  className?: string
  children?: React.ReactNode
}

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
