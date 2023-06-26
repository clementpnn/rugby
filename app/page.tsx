import getCurrentUser from '@/actions/getCurrentUser'
import SignInModal from '@/components/modals/SignInModal'

export default async function Home() {
  const currentUser = await getCurrentUser()
  return (
    <>
      <SignInModal currentUser={currentUser} />
    </>
  )
}