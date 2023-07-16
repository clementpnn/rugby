import getCurrentUser from '@/actions/getCurrentUser'
import SignInModal from '@/components/modals/signInModal'

const page = async () => {
  const currentUser = await getCurrentUser()

  return (
    <>
      <SignInModal currentUser={currentUser} />
    </>
  )
}

export default page