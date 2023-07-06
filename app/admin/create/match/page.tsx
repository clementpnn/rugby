import MatchForm from "@/components/forms/matchForm"
import getTeams from '@/actions/getTeams'
import ImageContainer from "@/components/containers/image"

const page = async () => {
  const teams = await getTeams()

  return (
    <> 
      <MatchForm teams={teams} /> 
      <ImageContainer />
    </>
  )
}

export default page