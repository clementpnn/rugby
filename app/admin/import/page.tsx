import getCurrentUser from '@/actions/getCurrentUser'
import { getUsersImport } from '@/actions/getUser'
import AdminContainer from '@/components/containers/adminContainer'
import Import from '@/components/import/import'
import TableImport from '@/components/import/tableImpot'

export default async function Home() {
  const currentUser = await getCurrentUser()
  const users = await getUsersImport()

  if ( !currentUser || currentUser.role !== 'ADMIN' ) {
    return (
      <p>not authorized</p>
    )
  }

  return (
    <>
      <AdminContainer>
        <Import/>
        <TableImport data={users?.demands} />
      </AdminContainer>
    </>
  )
}