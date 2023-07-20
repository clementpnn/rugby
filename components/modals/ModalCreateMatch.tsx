'use client'
import Modal from './dialog'
import Button from '../buttons/button'
import getTeams from '@/actions/getTeams'
import getStadiums from '@/actions/getStadiums'
import CreateMatch from '@/app/admin/match/create'

const ModalCreateMatch = async () => {
  const stadiums = await getStadiums() || []
  const teams = await getTeams() || []
  return (
    <>
      <Modal title='Create Match' action={<Button size='lg'>Create Match</Button>}>
        <CreateMatch teams={teams} stadiums={stadiums} />
      </Modal>
    </>
  )
}

export default ModalCreateMatch
