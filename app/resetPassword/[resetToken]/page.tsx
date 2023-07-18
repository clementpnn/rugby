/* eslint-disable check-file/folder-naming-convention */
import NewPasswordForm from '@/components/forms/newPasswordForm'

interface IParameters {
  resetToken: string
}

const page = async ( { params }: {params: IParameters} ) => {
  // eslint-disable-next-line no-unused-vars
  const { resetToken } = params
  return (
    <>
      <NewPasswordForm />
    </>
  )
}

export default page