/* eslint-disable unicorn/no-await-expression-member */
import { getMatchById } from '@/actions/getMatch'
// import MatchId from './match'
import getCurrentUser from '@/actions/getCurrentUser'
// import { DataTable } from '@/components/table/dataTable'
// import { columns } from './columns'

interface IParameters {
  matchId: string
}

const page = async ( { params }: {params: IParameters} ) => {
  const match = await getMatchById( params )
  const currentUser = await getCurrentUser()

  if ( !currentUser || currentUser.role !== 'ADMIN' ) {
    return (
      <p>not authorized</p>
    )
  }

  if ( !match ) {
    return (
      <p>not match</p>
    )
  }

  return (
    <>
      {/* <MatchId match={match} /> */}
      {/* {match.match.matchTeams.map( ( team ) => {
        return (
          <div className='mb-6' key={team.id}>
            <p>{team.team}</p>
            <p>{team.result ?? '?'}</p>
          </div>
        )
      } ) } */}
      Salut
      {/* <DataTable columns={columns} data={match.demands}/> */}
    </>
  )
}

export default page