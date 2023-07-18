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
      <DialogContent className="w-[calc(100vw-40px)] p-0 rounded-md overflow-hidden gap-0 max-w-xl sm:w-fit">
        <DialogHeader className='p-8 border-b-[1px] border-neutral3'>
          <DialogTitle className='h5-barlow-d text-blue6 uppercase'>{title}</DialogTitle>
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