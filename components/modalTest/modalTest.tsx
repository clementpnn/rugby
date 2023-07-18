'use client'

import { RESULT, STATE } from '@prisma/client'
import ModalJoinWaitList from '../modals/modalJoinWaitList'

const ModalTest = () => {
  const data = {
    date: 'Satuday 13th March',
    time: '23:00',
    state: 'ACCEPTED' as STATE,
    stadium: 'Stade de France',
    score: {
      countryA: 'FRANCE',
      scoreA: 'WINNER' as RESULT,
      countryB: 'NEW_ZEALAND',
      scoreB: 'LOSER'as RESULT
    }
  }
  const abde = () => {
    // eslint-disable-next-line no-console
    console.log( 'abde' )
  }
  return (
    <div>
      <ModalJoinWaitList data={data} onClick={abde}></ModalJoinWaitList>
    </div>
  )
}

export default ModalTest