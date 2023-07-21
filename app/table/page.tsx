import AdminContainer from '@/components/containers/adminContainer'
import Import from '@/components/import/import'
import TableImport from '@/components/import/tableImpot'

const page = () => {
  // const data = await getMatchById(1)

  return (
    <>
      <div>
        <AdminContainer>
          <Import/>
          <TableImport data={undefined}/>
        </AdminContainer>
      </div>
    </>
  )
}

export default page