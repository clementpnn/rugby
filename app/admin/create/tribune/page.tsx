import getMatch from '@/actions/getMatchs'
import TribuneForm from '@/components/forms/tribuneForm'

const page = async () => {
  const matchs = await getMatch()
  return (
    <>
      <TribuneForm matchs={matchs} />
    </>
  )
}

export default page