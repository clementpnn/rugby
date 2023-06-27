import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/libs/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        s_fill:
          "bg-blue7 text-neutral0 hover:bg-blue5",
        m_fill:
          "bg-blue7 text-neutral0 hover:bg-blue5",
        l_fill:
          "bg-blue7 text-neutral0 hover:bg-blue5",
        s_outline:
          "bg-neutral0 text-neutral11 border border-neutral4 hover:bg-neutral4",
        m_outline:
          "bg-neutral0 text-neutral11 border border-neutral4 hover:bg-neutral4",
        l_outline:
          "bg-neutral0 text-neutral11 border border-neutral4 hover:bg-neutral4",
        s_disable:
          "bg-neutral4 text-neutral6",
        m_disable:
          "bg-neutral4 text-neutral6",
        l_disable:
          "bg-neutral4 text-neutral6",
      },
      size: {
        sm: "h-[36px] rounded-md px-[8px] py-[16px] mx-[4px]",
        me: "h-[48px] rounded-md px-[12px] py-[20px] mx-[4px]",
        lg: "h-[52px] rounded-md px-[12px] py-[24px] mx-[4px]",
      },
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
