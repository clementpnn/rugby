import getMatch from '@/actions/getMatchs'
import SectionForm from '@/components/forms/sectionForm'

const page = async () => {
  const matchs = await getMatch()
  return (
    <> 
      <SectionForm matchs={matchs} />
    </>
  )
}

export default page