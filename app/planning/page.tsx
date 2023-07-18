import Navbar from '@/components/navbar/navbar'
import Filter from '@/components/filter/filter'
import Empty from '@/components/containers/empty'

const page = async () => {
  return (
    <>
      {/* pas bon */}
      <><Navbar />
        <Empty /></><Filter />
    </>
  )
}

export default page