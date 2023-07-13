import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/libs/utils'
import { InputHTMLAttributes } from 'react'
const badgeVariants = cva(
  'inline-flex items-center rounded-full border rounded-2xl border-transparent font-semibold justify-around',
  {
    variants: {
      variant: {
        accepted_light:
          'bg-green-100 text-green-600',
        rejected_light:
          'bg-red-100 text-red-600',
        progress_light:
          'bg-yellow-100 text-yellow-600',
        accepted_dark:
          'bg-green-500 text-neutral-100',
        rejected_dark:
          'bg-red-500 text-neutral-100',
        progress_dark:
          'bg-yellow-500 text-neutral-100'
      },
      size: {
        sm:
          'h-5 label-sm px-2.5 py-1 w-24',
        md:
          'h-6 label-base px-3 py-1.5 w-28',
        lg:
          'h-7 label-lg px-4 py-2 w-32'
      }
    }
  }
)
const circleVariants = cva(
  'inline-flex items-center rounded-full rounded-full border-transparent',
  {
    variants: {
      circle: {
        accepted_light:
          'bg-green-100 text-green-600',
        rejected_light:
          'bg-red-100 text-red-600',
        progress_light:
          'bg-yellow-100 text-yellow-600',
        accepted_dark:
          'bg-green-500 text-neutral-100',
        rejected_dark:
          'bg-red-500 text-neutral-100',
        progress_dark:
          'bg-yellow-500 text-neutral-100'
      },
      circle_size: {
        sm:
          'h-2 w-2',
        md:
          'h-2.5 w-2.5',
        lg:
          'h-3 w-3'
      }
    }
  }
)

interface BadgeProperties extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

interface InputProperties extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
}

function Badge({ className, label, variant, circle, circle_size, size, ...properties }: BadgeProperties) {
  return (
    <div className={cn(badgeVariants({ variant, size, className }))} {...properties}>
      <div className={cn(circleVariants({ circle, circle_size }))} {...properties}/>
      { label }
    </div>
  )
}
export { Badge, badgeVariants }
