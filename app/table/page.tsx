
import AdminContainer from '@/components/containers/adminContainer'
import Import from '@/components/import/import'

const page = async () => {
  // const data = await getMatchById(1)

  return (
    <>
      <div>
        <AdminContainer>
          <Import/>
          {/*<DataTable columns={columns} data={data}/>*/}
        </AdminContainer>
      </div>
    </>
  )
}

export default page