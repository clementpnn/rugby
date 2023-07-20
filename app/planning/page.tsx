/* eslint-disable unicorn/no-await-expression-member */
import getCurrentUser from '@/actions/getCurrentUser'
import { getMatchsInfoByUser } from '@/actions/getMatch'
// import Empty from '@/components/containers/empty'
// import Filter from '@/components/filter/filter'
// import Navbar from '@/components/navbar/navbar'
import ModalJoinWaitList from '@/components/modals/modalJoinWaitList'

const groupAndSortItemsByDate = ( items ) => {
  // Créer un objet de type dictionnaire pour regrouper les éléments par date
  const groupedItems = {}
  for ( const item of items ) {
    const itemDate = item.date
    if ( !groupedItems[itemDate] ) {
      groupedItems[itemDate] = []
    }
    groupedItems[itemDate].push( item )
  }

  // Trier les dates dans l'ordre du plus récent au moins récent
  const sortedDates = Object.keys( groupedItems ).sort( ( a, b ) => new Date( b ) - new Date( a ) )

  // Renvoyer les éléments triés par date
  return sortedDates.map( ( date ) => ( {
    date,
    items: groupedItems[date]
  } ) )
}

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
      { matchs?.map( async ( items ) => {
        return(
          <div key={( await items ).id}>
            <ModalJoinWaitList data={( await items )} />
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
          </div>
        )
      } ) }
    </div>
  )
}

export default page