import Navbar from '@/components/navbar/navbar'
import Filter from '@/components/filter/filter'
import Empty from '@/components/containers/empty'

const page = async () => {
  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="grid grid-cols-3 h-[calc(100%-101px)]">
        <div className="col-span-2 w-full h-full flex-1 border-r-[1px] lg:border-r-1">
          <Empty />
        </div>
        <div className="w-full h-full bg-red-500 col-span-1">
          <Filter height={0} width={0}/>
        </div>
      </div>
    </div>
  )
}

export default page