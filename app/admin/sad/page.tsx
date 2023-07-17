import getCurrentUser from '@/actions/getCurrentUser'

export default async function Home() {
  const currentUser = await getCurrentUser()

  if ( !currentUser || currentUser.role !== 'ADMIN' ) {
    return (
      <p>not authorized</p>
    )
  }
  return (
    <h1>Here is Admin SAD Page !</h1>
  )
}