'use client'

import * as React from 'react'
import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog'

import { cn } from '@/libs/utils'
import { buttonVariants } from '@/components/ui/button'

const AlertDialog = AlertDialogPrimitive.Root

const AlertDialogTrigger = AlertDialogPrimitive.Trigger

const AlertDialogPortal = ( {
  className,
  ...properties
}: AlertDialogPrimitive.AlertDialogPortalProps ) => (
  <AlertDialogPrimitive.Portal className={cn( className )} {...properties} />
)
AlertDialogPortal.displayName = AlertDialogPrimitive.Portal.displayName

const AlertDialogOverlay = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Overlay>
>( ( { className, /*children,*/ ...properties }, reference ) => (
  <AlertDialogPrimitive.Overlay
    className={cn(
      'fixed inset-0 z-50 bg-neutral5/40 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
      className
    )}
    {...properties}
    ref={reference}
  />
) )
AlertDialogOverlay.displayName = AlertDialogPrimitive.Overlay.displayName

const AlertDialogContent = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Content>
>( ( { className, ...properties }, reference ) => (
  <AlertDialogPortal>
    <AlertDialogOverlay />
    <AlertDialogPrimitive.Content
      ref={reference}
      className={cn(
        'fixed h-fit mx-5 rounded-xl left-[50%] top-[50%] z-50 w-[calc(100%-40px)] max-w-lg translate-x-[-50%] translate-y-[-50%] gap-8 bg-neutral0 p-8 duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg md:w-full',
        className
      )}
      {...properties}
    />
  </AlertDialogPortal>
) )
AlertDialogContent.displayName = AlertDialogPrimitive.Content.displayName

const AlertDialogHeader = ( {
  className,
  ...properties
}: React.HTMLAttributes<HTMLDivElement> ) => (
  <div
    className={cn(
      className
    )}
    {...properties}
  />
)
AlertDialogHeader.displayName = 'AlertDialogHeader'

const AlertDialogFooter = ( {
  className,
  ...properties
}: React.HTMLAttributes<HTMLDivElement> ) => (
  <div
    className={cn(
      'grid grid-cols-1 gap-y-4 sm:gap-x-4 sm:grid-cols-2 sm:grid-flow-col',
      className
    )}
    {...properties}
  />
)
AlertDialogFooter.displayName = 'AlertDialogFooter'

const AlertDialogTitle = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Title>
>( ( { className, ...properties }, reference ) => (
  <AlertDialogPrimitive.Title
    ref={reference}
    className={cn( 'h5-barlow-d text-blue6', className )}
    {...properties}
  />
) )
AlertDialogTitle.displayName = AlertDialogPrimitive.Title.displayName

const AlertDialogDescription = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Description>
>( ( { className, ...properties }, reference ) => (
  <AlertDialogPrimitive.Description
    ref={reference}
    className={cn( 'base-md text-blue9 w-full', className )}
    {...properties}
  />
) )
AlertDialogDescription.displayName =
  AlertDialogPrimitive.Description.displayName

const AlertDialogAction = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Action>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Action>
>( ( { className, ...properties }, reference ) => (
  <AlertDialogPrimitive.Action
    ref={reference}
    className={cn( buttonVariants(), className )}
    {...properties}
  />
) )
AlertDialogAction.displayName = AlertDialogPrimitive.Action.displayName

const AlertDialogCancel = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Cancel>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Cancel>
>( ( { className, ...properties }, reference ) => (
  <AlertDialogPrimitive.Cancel
    ref={reference}
    className={cn(
      buttonVariants(), className )}
    {...properties}
  />
) )
AlertDialogCancel.displayName = AlertDialogPrimitive.Cancel.displayName

export {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel
}

React.Fragment