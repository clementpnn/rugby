import { DataTable } from '@/components/table/dataTable'
import { columns } from './columns'
import { data } from './data'
// import { DataTableDemo } from '@/components/table/testTable'

const page = async () => {

  return (
    <>
      <DataTable columns={columns} data={data}/>
      {/* <DataTableDemo /> */}
    </>
  )
}

export default page