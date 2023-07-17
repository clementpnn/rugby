import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'

interface ModalProperties{
  children: React.ReactNode
  action: React.ReactNode
  title: string
}

const Modal: React.FC<ModalProperties> = ( { children, action, title } ) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {action}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] p-0 rounded-md overflow-hidden">
        <DialogHeader className='p-6 border-b-[1px] border-neutral3'>
          <DialogTitle className='h5-barlow-m text-blue6 uppercase'>{title}</DialogTitle>
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