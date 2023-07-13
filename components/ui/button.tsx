import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/libs/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md font-medium ring-offset-white transition-colors hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue5 ',
  {
    variants: {
      variant: {
        primary: 'bg-blue6 text-neutral0 hover:bg-blue5',
        secondary: 'bg-neutral0 text-blue6 hover:bg-neutral1',
        outline:
          'bg-transparent border border-neutral3 text-blue6 hover:bg-neutral1 ',
        link: 'bg-transparent text-blue9 hover:text-blue7',
        disabled: 'pointer-events-none bg-neutral3 text-neutral5'
      },
      size: {
        md: 'label-md h-10 px-4 py-2',
        sm: 'label-sm h-9 px-3',
        lg: 'label-lg h-11 px-8',
        iconSm: 'w-10 h-10',
        iconMd: 'w-9 h-9',
        iconLg: 'w-12 h-12'
      }
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md'
    }
  }
)

export interface ButtonProperties
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const ButtonUI = React.forwardRef<HTMLButtonElement, ButtonProperties>(
  ( { className, variant, size, asChild = false, ...properties }, reference ) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        className={cn( buttonVariants( { variant, size, className } ) )}
        ref={reference}
        {...properties}
      />
    )
  }
)

ButtonUI.displayName = 'Button'

export { ButtonUI, buttonVariants }
