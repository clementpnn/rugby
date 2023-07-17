// import { DataTable } from '@/components/table/dataTable'
// import { columns } from './columns'
// import { data } from './data'
import { DatePicker } from '@/components/datePicker/datePicker'
// import { DataTableDemo } from '@/components/table/testTable'
import ModalJoinWaitList from '@/components/modals/modalJoinWaitList'

const page = async () => {
  return (
    <>
      {/* <DataTable columns={columns} data={data}/> */}
      {/* <DataTableDemo /> */}
      <DatePicker></DatePicker>
      <ModalJoinWaitList></ModalJoinWaitList>
    </>
  )
}

export default page