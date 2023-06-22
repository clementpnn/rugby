import LoginForm from '@/components/forms/LoginForm'
import getCurrentUser from '@/actions/getCurrentUser'

const page = async () => {
  const currentUser = await getCurrentUser()

  return (
    <LoginForm currentUser={currentUser} />
  )
}

export default page