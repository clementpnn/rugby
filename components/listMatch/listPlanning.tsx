import { PHASE, RESULT } from '@prisma/client'
import ModalJoinWaitList from '../modals/modalJoinWaitList'

interface Teams {
    id: string
    matchId: string
    team: string
    result: RESULT | null
}

export interface Matchs{
    id: string
    date: string
    time: string
    phase: PHASE
    stadiumId: string
    matchTeams: Teams[]
}

interface listPlanningProperties{
    data: Matchs[]
}

const listPlanning: React.FC<listPlanningProperties> = ( { data } ) => {
  const abde = () => {
    // eslint-disable-next-line no-console
    console.log( 'abde' )
  }
  return (
    <>
      {data?.map( ( item ) => (
        <ModalJoinWaitList key={item.id} data={item} onClick={abde} />
      ) )}
    </>
  )
}

export default listPlanning
