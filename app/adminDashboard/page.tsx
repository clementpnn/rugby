// import getCurrentUser from '@/actions/getCurrentUser'
import CSVForm from '@/components/forms/CSVForm'
import SignOutButton from '@/components/buttons/SignOutButton'

const page = async () => {
//   const currentUser = await getCurrentUser()

  return (
    <>
        <SignOutButton />
        <CSVForm />
    </>
  )
}

export default page