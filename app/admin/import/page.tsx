import getCurrentUser from '@/actions/getCurrentUser'
import CSVForm from '@/components/forms/csvForm'

export default async function Home() {
  const currentUser = await getCurrentUser()

  if ( !currentUser || currentUser.role !== 'ADMIN' ) {
    return (
      <p>not authorized</p>
    )
  }

  return (
    <>
      <CSVForm />
    </>
  )
}