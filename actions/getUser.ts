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