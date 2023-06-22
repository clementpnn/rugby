import LoginForm from '@/components/forms/LoginForm'
import getCurrentUser from '@/actions/getCurrentUser'

export default async function Home() {
  const currentUser = await getCurrentUser()
  return (
    <>
      <LoginForm currentUser={currentUser} />
    </>
  )
}