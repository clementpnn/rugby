import prisma from '@/libs/prismadb'

export default async function getUsers() {
  try {
    const users = await prisma.user.findMany( {
      where: { role: 'USER' }
    } )

    if ( !users ) return

    return users

  } catch ( error: any ) {
    throw new Error( error )
  }
}

interface IParameters {
    userId?: string
}

export async function getUserById( parameters: IParameters ) {
  try {
    const { userId } = parameters

    if ( !userId ) return

    const user = await prisma.user.findUnique( {
      where: { id: userId },
      include: {
        demands: {
          include: {
            match: {
              include: {
                matchTeams: true
              }
            }
          }
        }
      }
    } )

    if ( !user ) return

    return user

  } catch ( error: any ) {
    throw new Error( error )
  }
}

interface IParameters {
  resetToken?: string
}

export async function getUserByResetToken( parameters: IParameters ) {
  try {
    const { resetToken } = parameters

    if ( !resetToken ) return

    const reset = await prisma.sentEmail.findUnique( {
      where: { resetToken },
      include: {
        user: true
      }
    } )

    if ( !reset ) return

    return reset.user

  } catch ( error: any ) {
    throw new Error( error )
  }
}