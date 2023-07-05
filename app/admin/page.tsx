import CSVForm from '@/components/forms/csvForm'
import SignOutButton from '@/components/buttons/signOutButton'

const page = async () => {

  return (
    <>
      <SignOutButton />
      <CSVForm />
    </>
  )
}

export default page