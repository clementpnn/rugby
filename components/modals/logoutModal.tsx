import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { FaBeer } from 'react-icons/fa';
import { MdOutlineLogout } from 'react-icons/md';

export default async function LogoutModal() {
  return (
    <div>
        <AlertDialog>
        <AlertDialogTrigger><Button variant={'outline'} size={'sm'} className='text-blue6 flex gap-x-2'><MdOutlineLogout size={18} />Logout</Button></AlertDialogTrigger>
        <AlertDialogContent className='flex flex-col gap-y-8'>
            <AlertDialogHeader>
                <div className='flex flex-row justify-between items-center'>  
                    <AlertDialogTitle>LOGOUT</AlertDialogTitle>
                    {/* mettre icon */}
                    <Button variant={'outline'} size={'sIcon'}>X</Button>
                </div>
            </AlertDialogHeader>
            <AlertDialogDescription>Voulez-vous vraiment vous déconnecter ?</AlertDialogDescription>
            <AlertDialogFooter>
            <AlertDialogAction>
                <Button variant={'fill'} size={'lg'} className='label-lg text-neutral0 bg-red6 w-full mx-0'>Logout</Button>
            </AlertDialogAction>
            <AlertDialogCancel>
                <Button variant={'outline'} size={'lg'} className='label-lg text-blue9 w-full mx-0'>Cancel</Button>
            </AlertDialogCancel>
            </AlertDialogFooter>
        </AlertDialogContent>
        </AlertDialog>
    </div>
  )
}