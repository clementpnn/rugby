'use client'
import Modal from './dialog'
import Button from '../buttons/button'

import CreateMatch from '@/app/admin/match/create'
import { PiPlusSquare } from 'react-icons/pi'

interface ModalCreateMatchProperties {
  teams: any
  stadiums: any
}

const ModalCreateMatch : React.FC<ModalCreateMatchProperties> = ( { teams, stadiums } ) => {

  return (
    <>
      <Modal title='Create Match' action={<Button size='lg' iconPosition='left' icon={ <PiPlusSquare className='w-full h-full'/> }>Create Match</Button>}>
        <div className='p-8'>
          <CreateMatch teams={teams} stadiums={stadiums} />
        </div>
      </Modal>
    </>
  )
}

export default ModalCreateMatch
