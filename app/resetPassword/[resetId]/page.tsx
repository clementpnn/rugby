/* eslint-disable check-file/folder-naming-convention */
import NewPasswordForm from '@/components/forms/newPasswordForm'

interface IParameters {
  resetId: string
}

const page = async ( { params }: {params: IParameters} ) => {

  return (
    <>
      <NewPasswordForm />
    </>
  )
}

export default page