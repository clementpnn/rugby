'use client'

import * as React from 'react'

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle
} from '@/components/ui/dialog'
import Button from '../buttons/button'

interface ModalProperties {
  children: React.ReactNode
  action: React.ReactNode
  title: string
}

interface ModalProperties {
  children: React.ReactNode
  action: React.ReactNode
  title: string
}

const LogoutModal: React.FC<ModalProperties> = ( { children, action, title } ) => {
  const [ isOpen, setIsOpen ] = React.useState( false )

  const handleConfirmLogout = () => {
    // logique de déconnexion
    // eslint-disable-next-line no-console
    console.log( 'Déconnexion effectuée' )
    setIsOpen( false )
  }

  const handleCancelLogout = () => {
    setIsOpen( false )
  }

  return (
    <>
      <Dialog open={isOpen}>
        <DialogTrigger asChild>
          {action}
        </DialogTrigger>
        <DialogContent className="w-[calc(100vw-40px)] p-0 rounded-md overflow-hidden gap-0 max-w-xl sm:w-fit">
          <DialogHeader className='p-8 border-b-[1px] border-neutral3'>
            <DialogTitle className='h5-barlow-d text-blue6 uppercase'>{title}</DialogTitle>
          </DialogHeader>
          {children}
          <DialogFooter>
            <Button onClick={handleCancelLogout} className='w-fill'>Cancel</Button>
            <Button onClick={handleConfirmLogout} className='w-fill'>Logout</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default LogoutModal
