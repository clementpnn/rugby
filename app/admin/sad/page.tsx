import getCurrentUser from '@/actions/getCurrentUser'
import ModalTest from '@/components/modalTest/modalTest'
// import RequestMatch from '@/components/requestMatch/requestMatch'

export default async function Home() {
  const currentUser = await getCurrentUser()

  if ( !currentUser || currentUser.role !== 'ADMIN' ) {
    return (
      <p>not authorized</p>
    )
  }
  return (
    <>
      {/* <RequestMatch variant='accepted_dark' label='Salut'/> */}
      <ModalTest></ModalTest>
    </>
  )
}