import getCurrentUser from '@/actions/getCurrentUser'
import getAllTeams from '@/actions/getAllTeams'

const page = async () => {
  const currentUser = await getCurrentUser()
  const allTeams = await getAllTeams()

  return (
    <>
      in working
    </>
  )
}

export default page