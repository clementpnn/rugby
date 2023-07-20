import Navbar from '@/components/navbar/navbar'
import Empty from '@/components/containers/empty'
// import getMatch from '@/actions/getMatch'

const page = async () => {
  // const matchs = await getMatch()
  // eslint-disable-next-line no-console
  // console.log( matchs )
  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="grid grid-cols-3 h-[calc(100%-101px)]">
        <div className="col-span-2 w-full h-full flex-1 border-r-[1px] lg:border-r-1">
          <Empty />
        </div>
        <div className="w-full h-full col-span-1">
          {/*<Filter height={0} width={0}/> */}
        </div>
      </div>
    </div>
  )
}

export default page