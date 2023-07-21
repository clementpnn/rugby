import getCurrentUser from '@/actions/getCurrentUser'
import AdminContainer from '@/components/containers/adminContainer'
import Import from '@/components/import/import'
import TableImport from '@/components/import/tableImpot'

export default async function Home() {
  const currentUser = await getCurrentUser()

  if ( !currentUser || currentUser.role !== 'ADMIN' ) {
    return (
      <p>not authorized</p>
    )
  }

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