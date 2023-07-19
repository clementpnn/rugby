
// import { DataTable } from '@/components/table/dataTable'
// import { columns } from '../admin/match/[matchId]/columns'
// import getMatchById from '@/actions/getMatch'

// import { DataTable } from '@/components/table/dataTable'
// import { columns } from './columns'
// import { data } from './data'
import Button from '@/components/buttons/button'
import { DatePicker } from '@/components/datePicker/datePicker'

// import { DataTableDemo } from '@/components/table/testTable'
import ModalMatch from '@/components/modals/modalMatch'
import Badge from '@/components/ui/badge'

const page = async () => {
  // const data = await getMatchById(1)

  return (
    <>
      {/* <DataTable columns={columns} data={data}/> */}
      <DatePicker></DatePicker>
      <ModalMatch></ModalMatch>
      <Badge variant='accepted_dark' size='lg'>Salut</Badge>
      <Button>Salut</Button>
    </>
  )
}

export default page