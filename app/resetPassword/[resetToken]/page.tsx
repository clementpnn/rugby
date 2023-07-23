// import { getUserByResetToken } from '@/actions/getUser'
// import NewPasswordForm from '@/components/forms/newPasswordForm'

interface IParameters {
  resetToken: string
}

const page = async ( { params }: {params: IParameters} ) => {
  // eslint-disable-next-line no-unused-vars
  const { resetToken } = params
  // const user = await getUserByResetToken( { resetToken } )

  // if ( !resetToken || !user ) {
  //   return (
  //     <>
  //       <h1>Invalid token</h1>
  //     </>
  //   )
  // }

  return (
    <>
      {/* <NewPasswordForm resetToken={resetToken} user={user} /> */}
      <p>empty</p>
    </>
  )
}

export default page