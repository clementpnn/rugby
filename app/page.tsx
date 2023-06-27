import getCurrentUser from '@/actions/getCurrentUser'
import SignInModal from '@/components/modals/SignInModal'
import { Button } from "@/components/ui/button"

export default async function Home() {
  const currentUser = await getCurrentUser()
  return (
    <>
      <SignInModal currentUser={currentUser} />
      <Button variant={'s_fill'} size={'sm'}>Expeliarmus</Button>
      <Button variant={'m_fill'} size={'me'}>Sperno patronum</Button>
      <Button variant={'l_fill'} size={'lg'}>Lumos</Button>
      <Button variant={'s_outline'} size={'sm'}>Nox</Button>
      <Button variant={'m_outline'} size={'me'}>Adavra kedavra</Button>
      <Button variant={'l_outline'} size={'lg'}>Endoloris</Button>
      <Button variant={'s_disable'} size={'sm'}>Alohomora</Button>
      <Button variant={'m_disable'} size={'me'}>Morsmordre</Button>
      <Button variant={'l_disable'} size={'lg'}>Accio</Button>
    </>
  )
}