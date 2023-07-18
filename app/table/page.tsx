import { DataTable } from '@/components/table/dataTable'
import { columns } from '../admin/match/[matchId]/columns'
import getMatchById from '@/actions/getMatch'
// import { DataTableDemo } from '@/components/table/testTable'

const page = async () => {
  const data = await getMatchById(1)
  return (
    <>
      <DataTable columns={columns} data={data}/>
      {/* <DataTableDemo /> */}
    </>
  )
}

export default page