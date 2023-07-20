import { getMatchsInfoByUser } from '@/actions/getMatch'
import MatchList from './matchList'
import getCurrentUser from '@/actions/getCurrentUser'
import { Match } from '@/components/modals/modalJoinWaitList'
import AdminContainer from '@/components/containers/adminContainer'
import Filter from '@/components/filter/filter'
import Button from '@/components/buttons/button'

const page = async () => {
  const currentUser = await getCurrentUser()
  const matchs = await getMatchsInfoByUser( { userId : currentUser?.id || '' } ) || []

  const matchsByDate : { [date: string]: Match[] } = {}

  for ( const match of matchs ) {
    // eslint-disable-next-line unicorn/no-await-expression-member
    const matchDate = new Date( ( await match ).date ).toDateString()
    if ( !matchsByDate[matchDate] ) {
      matchsByDate[matchDate] = []
    }
    matchsByDate[matchDate].push( await match )
  }

  if ( !currentUser || currentUser.role !== 'ADMIN' ) {
    return (
      <p>not authorized</p>
    )
  }

  if ( !matchs ) {
    return <p>No Match</p>
  }

  return (
    <>
      <AdminContainer>
        <div className='flex flex-col  w-full h-full gap-y-6'>
          <div className='bg-neutral0 p-10 rounded-md flex justify-between items-center'>
            <span className='text-blue6 h2-barlow-m'>MATCHS</span>
            <Button size='lg'>Salut</Button>
          </div>
          <div className='w-full h-full grid grid-cols-10 bg-neutral0 rounded-md overflow-hidden'>
            <div className="col-span-7 w-full h-full flex-1 border-r-[1px] max-h-[calc(100vh-101px)] overflow-auto scroll-smooth no-scrollbar">
              <MatchList matchs={matchsByDate} />
            </div>
            <div className="w-full h-full col-span-3">
              <Filter title='SELECT'/>
            </div>
          </div>
        </div>
      </AdminContainer>
    </>
  )
}

export default page