import getCurrentUser from '@/actions/getCurrentUser'
import SignInModal from '@/components/modals/SignInModal'
import { Button } from '@/components/ui/button'

export default async function Home() {
  const currentUser = await getCurrentUser()
  return (
    <>
      <SignInModal currentUser={currentUser} />
    </>
  )
}