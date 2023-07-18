// import { DataTable } from '@/components/table/dataTable'
// import { columns } from './columns'
// import { data } from './data'
import Button from '@/components/buttons/button'
import { DatePicker } from '@/components/datePicker/datePicker'
// import { DataTableDemo } from '@/components/table/testTable'
import ModalTest from '@/components/modalTest/modalTest'
import Badge from '@/components/ui/badge'

const page = async () => {

  return (
    <>
      {/* <DataTable columns={columns} data={data}/> */}
      {/* <DataTableDemo /> */}
      <DatePicker></DatePicker>
      <ModalTest></ModalTest>
      <Badge variant='accepted_dark' size='lg'>Salut</Badge>
      <Button>Salut</Button>
    </>
  )
}

export default page