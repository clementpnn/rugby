// import getCurrentUser from '@/actions/getCurrentUser'
import { getMatchsInfoByUser } from '@/actions/getMatch'
import Filter from '@/components/filter/filter'
import Navbar from '@/components/navbar/navbar'
import { Match } from '@/components/modals/modalJoinWaitList'
import ListMatch from '@/components/listMatch/listMatch'

const page = async () => {
  // const currentUser = await getCurrentUser()
  const matchs = await getMatchsInfoByUser( { userId : '64ba334e727f4f5e22820b2b' } ) || []

  const matchsByDate : { [date: string]: Match[] } = {}

  for ( const match of matchs ) {
    // eslint-disable-next-line unicorn/no-await-expression-member
    const matchDate = new Date( ( await match ).date ).toDateString()
    if ( !matchsByDate[matchDate] ) {
      matchsByDate[matchDate] = []
    }
    matchsByDate[matchDate].push( await match )
  }

  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="grid grid-cols-10 h-[calc(100%-101px)]">
        <div className="col-span-7 w-full h-full flex-1 border-r-[1px] max-h-[calc(100vh-101px)] overflow-auto scroll-smooth no-scrollbar">
          <ListMatch matchs={matchsByDate}></ListMatch>
        </div>
        <div className="w-full h-full col-span-3">
          <Filter title='PLANNING' showSwitch={true}/>
        </div>
      </div>
    </div>
  )
}

export default page