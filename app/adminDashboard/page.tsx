import CSVForm from '@/components/forms/CSVForm'
import SignOutButton from '@/components/buttons/SignOutButton'
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