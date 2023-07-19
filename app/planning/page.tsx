import Navbar from '@/components/navbar/navbar'
import Filter from '@/components/filter/filter'
import Empty from '@/components/containers/empty'

const page = async () => {
  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="border-t-2"></div>

      <div className="flex flex-col lg:flex-row flex-grow">
        <div className="flex-1 border-r-2 lg:border-r-1">
          <Empty />
        </div>

        <div className="lg:w-1/3 lg:self-start">
          <div className="lg:mt-10 sticky top-0">
            <Filter height={0} /*width={0}*/ />
          </div>
        </div>
      </div>
    </div>
  )
}

export default page