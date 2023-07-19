import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/libs/utils'
export const badgeVariants = cva(
  'flex items-center rounded-full',
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
    }
  }
)
interface BadgeProperties extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {
}

function Badge( { className, children, variant, size, ...properties }: BadgeProperties ) {

  let test : string = 'bg-green-500'

  if( variant==='accepted_light' || variant==='rejected_light' || variant==='progress_light' || variant==='accepted_dark' || variant==='rejected_dark' || variant==='progress_dark' ){
    test = ''
  }
  return (
    <div className={cn( badgeVariants( { variant, size, className } ) )} {...properties}>
      <div className={`
      inline-flex items-center rounded-full h-2.5 w-2.5 ${test}
        ${size==='sm' && 'h-1 w-1'}
        ${size==='md' && 'h-2.5 w-2.5'}
        ${size==='lg' && 'h-3 w-3'}
        ${variant==='accepted_light' && 'bg-green-500'}
        ${variant==='rejected_light' && 'bg-red-500'}
        ${variant==='progress_light' && 'bg-yellow-500'}
        ${variant==='accepted_dark' && 'bg-green-50'}
        ${variant==='rejected_dark' && 'bg-red-50'}
        ${variant==='progress_dark' && 'bg-yellow-50'}
      `}/>
      { children }
    </div>
  )
}
export default Badge