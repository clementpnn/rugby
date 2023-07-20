import AdminContainer from '@/components/containers/adminContainer'
import Import from '@/components/import/import'
import TableImport from '@/components/import/tableImpot'

const page = async () => {
  // const data = await getMatchById(1)

  return (
    <>
      <div>
        <AdminContainer>
          <Import/>
          <TableImport/>
        </AdminContainer>
      </div>
    </>
  )
}

export default page