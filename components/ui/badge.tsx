import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/libs/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
      variants: {
      variant: {
        accepted:
          "border-transparent bg-green-100 p-1.5 text-green-600 rounded-2xl w-20 h-8 justify-center",
        rejected:
          "border-transparent bg-red-100 p-1.5 text-red-600 rounded-2xl w-20 h-8 justify-center",
        progress:
          "border-transparent bg-yellow-100 p-1.5 text-yellow-600 rounded-2xl w-20 h-8 justify-center",
      },
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
