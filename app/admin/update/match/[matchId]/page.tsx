import { getMatchUpdateById } from '@/actions/getMatch'
import getCurrentUser from '@/actions/getCurrentUser'
import MatchForm from '@/components/forms/matchForm'
import AdminContainer from '@/components/containers/adminContainer'
import { BsArrowReturnLeft } from 'react-icons/bs'
import Link from 'next/link'
import Button from '@/components/buttons/button'

interface IParameters {
  matchId: string
}

const page = async ( { params }: {params: IParameters} ) => {
  const match = await getMatchUpdateById( params )
  const currentUser = await getCurrentUser()

  if ( !currentUser || currentUser.role !== 'ADMIN' ) {
    return (
      <p>not authorized</p>
    )
  }

  if ( !match ) {
    return (
      <p>not match</p>
    )
  }

  return (
    <>
      <AdminContainer>
        <div className='bg-neutral0 rounded-md w-full h-full overflow-auto flex flex-col gap-y-6 justify-center items-center'>
          <div className='grid gap-y-12'>
            <Link href="/admin/update"><Button type='button' variant='outline' size='md' iconPosition='left' icon={<BsArrowReturnLeft className="w-full h-full" />}>
            Back
            </Button></Link>
            <MatchForm match={match} />
          </div>
        </div>
      </AdminContainer>
    </>
  )
}

export default page