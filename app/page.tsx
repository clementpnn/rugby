import getCurrentUser from '@/actions/getCurrentUser'
import SignInModal from '@/components/modals/SignInModal'
import { Card,CardContent,CardDescription,CardFooter,CardHeader,CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
// import Modal from '@/components/modals/Modal'
// import useModal from '@/hooks/useModal'
// import { useState } from 'react'
// import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'

export default async function Home() {
  const currentUser = await getCurrentUser()
  // const modal = useModal()
  // const [isLoading, setIsLoading] = useState(false)

  // const { handleSubmit } = useForm<FieldValues>({
  //   defaultValues: {
  //     email: ''
  //   }
  // })

  // const onSubmit: SubmitHandler<FieldValues> = (data) => {
  // setIsLoading(false)
  // }

  return (
    <>
      <SignInModal currentUser={currentUser} />
      {/* <Modal  disabled={false} isOpen={modal.isOpen} title='Login' actionLabel='Continue' onClose={modal.onClose} onSubmit={handleSubmit(onSubmit)} /> */}

      <Card className='w-[350px]'>
        <div className="bg-blue6 p-4 flex items-center justify-between">
          <div className="flex items-center">
            <h3 className="text-neutral0 text-lg font-semibold">Tournament Pass</h3>
          </div>
          <div className="flex items-center">
            <img src="logo.png" alt="Logo" className="h-6 w-6 ml-2" />
          </div>
        </div>
        <CardHeader className='flex items-center'>
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                <AvatarFallback>Profile picture</AvatarFallback>
              </Avatar>
            </div>
            <div className="ml-2">
              <div className="flex flex-col">
                <CardTitle>Abde</CardTitle>
                <CardDescription>Journaliste Poudlard</CardDescription>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
        </CardContent>
        <CardFooter className='flex justify-between'>
          <Button variant='s_outline' size={'sm'}>[ => Logoutx</Button>
        </CardFooter>
      </Card>


    </>
  )
}