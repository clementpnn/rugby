
import { DataTable } from '@/components/table/dataTable'
import { columns } from '../admin/match/[matchId]/columns'
import getMatchById from '@/actions/getMatch'

// import { DataTable } from '@/components/table/dataTable'
// import { columns } from './columns'
// import { data } from './data'
import { DatePicker } from '@/components/datePicker/datePicker'

// import { DataTableDemo } from '@/components/table/testTable'
import ModalJoinWaitList from '@/components/modals/modalJoinWaitList'
import Badge from '@/components/ui/badge'

const page = async () => {
  // const data = await getMatchById(1)

  return (
    <>
      {/* <DataTable columns={columns} data={data}/> */}
      {/* <DataTableDemo /> */}
      <DatePicker></DatePicker>
      <ModalJoinWaitList></ModalJoinWaitList>
      <Badge variant='accepted_dark' size='sm'>Salut</Badge>
    </>
  )
}

export default page