import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/libs/utils'
export const badgeVariants = cva(
  'flex items-center rounded-full font-semibold',
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
          'bg-green-500 text-green-100',
        rejected_dark:
          'bg-red-500 text-red-100',
        progress_dark:
          'bg-yellow-500 text-yellow-100'
      },
      size: {
        sm:
          'h-5 label-sm px-2.5 py-1 h-fit w-fit gap-x-1',
        md:
          'h-6 label-md px-3 py-1.5 h-fit w-fit gap-x-1.5',
        lg:
          'h-7 label-lg px-4 py-2 h-fit w-fit gap-x-2'
      }
    },
    defaultVariants: {
      variant: 'accepted_light',
      size: 'md'
    }
  }
)
// const circleVariants = cva(
//   'inline-flex items-center rounded-full border-transparent',
//   {
//     variants: {
//       circle: {
//         accepted_light:
//           'bg-green-100 text-green-600',
//         rejected_light:
//           'bg-red-100 text-red-600',
//         progress_light:
//           'bg-yellow-100 text-yellow-600',
//         accepted_dark:
//           'bg-green-500 text-neutral-100',
//         rejected_dark:
//           'bg-red-500 text-neutral-100',
//         progress_dark:
//           'bg-yellow-500 text-neutral-100'
//       },
//       circle_size: {
//         sm:
//           'h-2 w-2',
//         md:
//           'h-2.5 w-2.5',
//         lg:
//           'h-3 w-3'
//       }
//     },
//     defaultVariants: {
//       circle: 'accepted_dark',
//       circle_size: 'md'
//     }
//   }
// )

// interface BadgeProperties extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants>, VariantProps<typeof circleVariants> {
// }

// function Badge( { className, children, variant, circle, circle_size, size, ...properties }: BadgeProperties ) {
//   return (
//     <div className={cn( badgeVariants( { variant, size, className } ) )} {...properties}>
//       <div className={cn( circleVariants( { circle, circle_size } ) )} {...properties}/>
//       { children }
//     </div>
//   )
// }
// export default Badge

interface BadgeProperties extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {
}

function Badge( { className, children, variant, size, ...properties }: BadgeProperties ) {
  return (
    <div className={cn( badgeVariants( { variant, size, className } ) )} {...properties}>
      <div className={`
        inline-flex items-center rounded-full h-2.5 w-2.5 bg-green-500
        ${size==='sm' && 'h-2 w-2'}
        ${size==='md' && 'h-2.5 w-2.5'}
        ${size==='lg' && 'h-3 w-3'}
        ${variant==='accepted_light' && 'bg-green-500'}
        ${variant==='rejected_light' && 'bg-red-500'}
        ${variant==='progress_light' && 'bg-yellow-500'}
        ${variant==='accepted_dark' && 'bg-green-50'}
        ${variant==='rejected_dark' && 'bg-red-50'}
        ${variant==='progress_dark' && 'bg-yellow-50'}
      `} {...properties}/>
      { children }
    </div>
  )
}
export default Badge

