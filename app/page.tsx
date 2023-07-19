import getCurrentUser from '@/actions/getCurrentUser'
import SignInModal from '@/components/modals/signInModal'

export default async function Home() {
  const currentUser = await getCurrentUser()
  return (
    <div>
      <SignInModal currentUser={currentUser} />
    </div>
  )
}