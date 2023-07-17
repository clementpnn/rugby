import { ButtonUI } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'

interface ModalProperties{
    children: React.ReactNode
}

const Modal: React.FC<ModalProperties> = ( { children } ) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <ButtonUI variant="outline">Edit Profile</ButtonUI>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] p-0 rounded-md overflow-hidden">
        <DialogHeader className='p-6 border-b-[1px] border-neutral3'>
          <DialogTitle className='h5-barlow-m text-blue6 uppercase'>Edit profile</DialogTitle>
        </DialogHeader>
        {children}
        {/* <DialogFooter>
          <ButtonUI type="submit" className='w-fill'>Save changes</ButtonUI>
        </DialogFooter> */}
      </DialogContent>
    </Dialog>
  )
}

export default Modal