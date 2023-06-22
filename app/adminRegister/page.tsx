import AdminRegisterForm from '@/components/forms/AdminRegisterForm'
import getCurrentUser from '@/actions/getCurrentUser'

const page = async () => {
  const currentUser = await getCurrentUser()

  return (
    <AdminRegisterForm currentUser={currentUser} />
  )
}

export default page