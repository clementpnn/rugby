/* eslint-disable unicorn/no-await-expression-member */
import getCurrentUser from '@/actions/getCurrentUser'
import { getMatchsInfoByUser } from '@/actions/getMatch'
// import Container from '@/components/containers/container'
import Filter from '@/components/filter/filter'
import Navbar from '@/components/navbar/navbar'
// import ModalJoinWaitList, { Match } from '@/components/modals/modalJoinWaitList'
import { Match } from '@/components/modals/modalJoinWaitList'
import ListMatch from '@/components/listMatch/listMatch'

const page = async () => {
  const currentUser = await getCurrentUser()
  const matchs = await getMatchsInfoByUser( { userId : currentUser?.id || '' } ) || []

  const matchsByDate : { [date: string]: Match[] } = {}

  for ( const match of matchs ) {
    const matchDate = new Date( ( await match ).date ).toDateString() // Convert the date to a text format to serve as a key
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
          {/* <Empty /> */}
          {/* {Object.entries( matchsByDate ).map( ( [ date, matches ] ) => (
            <div key={date}>
              <Container>
                <h2 className='pt-12 pb-4 label-lg text-blue9'>Date: {date}</h2>
              </Container>
              <div className='border-y-[1px] border-neutral3 divide-y divide-neutral3'>
                {matches.map( ( match ) => (
                  <div key={match.id}>
                    <ModalJoinWaitList data={match} />
                  </div>
                ) )}
              </div>
            </div>
          ) )} */}
          <ListMatch matchs={matchsByDate}></ListMatch>
        </div>
        <div className="w-full h-full col-span-3">
          <Filter height={0} width={0}/>
        </div>
      </div>
      {/* { matchs?.map( async ( items ) => {
        return(
          <div key={( await items ).id}>
            <ModalJoinWaitList data={( await items )} /> */}
      {/* <p className='text-red-500'>{( await items ).userDemandStatus}</p>
            { ( await items ).matchTeams?.map( ( match ) => (
              <div key={match.id}>{match.result}</div> ) ) } */}
      {/* <p>{( await items ).date}</p>
            <p>{( await items ).id}</p>
            <p className='text-red-500'>{( await items ).userDemandStatus}</p>
            { ( await items ).matchTeams?.map( ( match ) => (
              <div key={match.id}>{match.team} {match.result}</div>
            ) ) }
            <p>{( await items ).phase}</p>
            <p>{( await items ).stadiumName}</p>
            <p>{( await items ).time}</p> */}
      {/* </div>
        )
      } ) } */}
    </div>
  )
}

export default page