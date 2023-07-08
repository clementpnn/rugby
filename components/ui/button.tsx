import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/libs/utils'

// const buttonVariants = cva(
//   'inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
//   {
//     variants: {
//       variant: {
//         fill:
//           'bg-blue7 text-neutral0 hover:bg-blue5',
//         outline:
//           'bg-neutral0 text-neutral11 border border-neutral4 hover:bg-neutral4',
//         disable:
//           'bg-neutral4 text-neutral6'
//       },
//       size: {
//         sm: 'h-[36px] rounded-md px-[16px] py-[8px]'
//       }
//     }
//   }
// )

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md font-medium ring-offset-white transition-colors hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue5 ",
  {
    variants: {
      variant: {
        primary: "bg-blue6 text-neutral0 hover:bg-blue5",
        secondary: "bg-neutral0 text-blue6 hover:bg-neutral1",
        outline:
          "bg-transparent border border-neutral3 text-blue6 hover:bg-neutral1 ",
        link: "bg-transparent text-blue9 hover:text-blue7",
        disabled: "pointer-events-none bg-neutral3 text-neutral5",
      },
      size: {
        md: "label-md h-10 px-4 py-2",
        sm: "label-sm h-9 px-3",
        lg: "label-lg h-11 px-8",
        iconSm: "w-10 h-10",
        iconMd: "w-9 h-9",
        iconLg: "h-10 h-11",
      }
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
)

// interface Color {
//   blue: string;
// }

export interface ButtonProperties
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  // color?: "blue" | "white" | undefined;
}

// const Button = React.forwardRef<HTMLButtonElement, ButtonProperties>(
//   ({ className, variant, size, color, asChild = false, ...properties }, reference) => {
//     const Comp = asChild ? Slot : 'button';
//     return (
//       <Comp
//         className={cn(buttonVariants({ variant, size, color, className }))}
//         ref={reference}
//         {...properties}
//       />
//     );
//   }
// );
const ButtonUI = React.forwardRef<HTMLButtonElement, ButtonProperties>(
  ({ className, variant, size, asChild = false, ...properties }, reference) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={reference}
        {...properties}
      />
    );
  }
);

ButtonUI.displayName = 'Button'

export { ButtonUI, buttonVariants }
