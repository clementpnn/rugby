import Navbar from '@/components/navbar/navbar'
import Filter from '@/components/filter/filter'
import Empty from '@/components/containers/empty'

interface IParameters {
  resetId: string
}

const page = async ( { params }: {params: IParameters} ) => {
  return (
    <><><Navbar />
      <Empty /></><Filter /></>
  )
}

export default page