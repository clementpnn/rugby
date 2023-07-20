import getCurrentUser from '@/actions/getCurrentUser'
import { getMatchsInfoByUser } from '@/actions/getMatch'
// import Empty from '@/components/containers/empty'
// import Filter from '@/components/filter/filter'
// import Navbar from '@/components/navbar/navbar'

const page = async () => {
  const currentUser = await getCurrentUser()
  const matchs = await getMatchsInfoByUser( { userId : currentUser?.id || '' } ) || []
  // if( !matchs ){
  //   return (
  //     <p>not match</p>
  //   )
  // }
  return (
    <div className="flex flex-col h-screen">
      {/* <Navbar />
      <div className="grid grid-cols-3 h-[calc(100%-101px)]">
        <div className="col-span-2 w-full h-full flex-1 border-r-[1px] lg:border-r-1">
          <Empty />
        </div>
        <div className="w-full h-full col-span-1">
          <Filter height={0} width={0}/>
        </div>
      </div> */}
      { matchs?.map( ( items ) => {
        return(
          <div key={items.id} className='pt-3'>
            <p>{items.date}</p>
            <p>{items.id}</p>
            <p className='text-red-500'>{items.userDemandStatus}</p>
            { items.matchTeams?.map( ( match ) => (
              <div key={match.id}>{match.team} {match.result}</div>
            ) ) }
            <p>{items.phase}</p>
            <p>{items.stadiumId}</p>
            <p>{items.time}</p>
          </div>
        )
      } ) }
    </div>
  )
}

export default page