import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        s_fill:
          "bg-blue2 text-white hover:bg-red-100",
        m_fill:
          "bg-blue7 text-neutral0 hover:bg-blue5",
        l_fill:
          "bg-blue7 text-neutral0 hover:bg-blue5",
        s_outline:
          "bg-neutral0 text-neutral1 border-neutral3 hover:bg-neutral3",
        m_outline:
          "bg-neutral0 text-neutral1 border-neutral3 hover:bg-neutral3",
        l_outline:
          "bg-neutral0 text-neutral1 border-neutral3 hover:bg-neutral3",
        s_disable:
          "bg-neutral3 text-neutral5",
        m_disable:
          "bg-neutral3 text-neutral5",
        l_disable:
          "bg-neutral3 text-neutral5",
      },
      size: {
        sm: "h-[36px] rounded-md px-[8px] py-[16px]",
        me: "h-[48px] rounded-md px-[12px] py-[20px]",
        lg: "h-[52px] rounded-md px-[12px] py-[24px]",
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
