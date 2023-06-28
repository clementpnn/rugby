import getCurrentUser from '@/actions/getCurrentUser'
import SignInModal from '@/components/modals/SignInModal'
import Modal from '@/components/modals/Modal'
import { Button } from '@/components/ui/button'
import useModal from '@/hooks/useModal'
// import { useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'

export default async function Home() {
  const currentUser = await getCurrentUser()
  const modal = useModal()
  // const [isLoading, setIsLoading] = useState(false)

  const { handleSubmit } = useForm<FieldValues>({
    defaultValues: {
      email: ''
    }
  })

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    // setIsLoading(false)
  }

  return (
    <>
      <SignInModal currentUser={currentUser} />
      <Modal  disabled={false} isOpen={modal.isOpen} title='Login' actionLabel='Continue' onClose={modal.onClose} onSubmit={handleSubmit(onSubmit)} />
    </>
  )
}