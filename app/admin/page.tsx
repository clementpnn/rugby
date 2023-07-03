import CSVForm from '@/components/forms/csvForm'
import SignOutButton from '@/components/buttons/signOutButton'
import getCurrentUser from '@/actions/getCurrentUser'

const page = async () => {
  const currentUser = await getCurrentUser()

  return (
    <>
      <SignOutButton />
      <CSVForm />
    </>
  )
}

export default page