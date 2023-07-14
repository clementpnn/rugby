import * as React from 'react'
import { cn } from '@/libs/utils'
import { cva, VariantProps } from 'class-variance-authority'

const inputVariants = cva(
  'flex items-center w-full bg-neutral1 rounded-md border border-neutral3 px-4 py-2 text-blue9 file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:bg-neutral1  disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        default: '',
        code: 'text-center'
      },
      size: {
        md: 'base-md h-10 py-2',
        sm: 'base-sm h-9 py-3',
        lg: 'base-lg h-11 py-3.5'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'md'
    }
  }
)

export interface InputProperties
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof inputVariants> {
  size?: SizeVariant | null
}

type SizeVariant = 'md' | 'sm' | 'lg'

const InputUI = React.forwardRef<HTMLInputElement, InputProperties>(
  ( { size, variant, className, type, ...properties }, reference ) => {
    return (
      <input
        type={type}
        className={cn( inputVariants( { size, variant, className } ) )}
        ref={reference}
        {...properties}
      />
    )
  }
)

InputUI.displayName = 'Input'

export { InputUI }
