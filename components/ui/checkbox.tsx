'use client'

import * as React from 'react'
import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import { Check } from 'lucide-react'

import { cn } from '@/libs/utils'

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>( ( { className, ...properties }, reference ) => (
  <CheckboxPrimitive.Root
    ref={reference}
    className={cn(
      'peer h-4 w-4 shrink-0 rounded-sm border border-neutral3 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-blue6 data-[state=checked]:border-blue6 data-[state=checked]:text-primary-foreground',
      className
    )}
    {...properties}
  >
    <CheckboxPrimitive.Indicator
      className={cn( 'flex items-center justify-center text-current' )}
    >
      <Check className="h-4 w-4" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
) )
Checkbox.displayName = CheckboxPrimitive.Root.displayName

export { Checkbox }
