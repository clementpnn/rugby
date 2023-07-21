import prisma from '@/libs/prismadb'
import { JOB } from '@prisma/client'

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

export async function getUsersImport() {

  const users = await prisma.user.findMany( {
    where: { role: 'USER' },
    include: {
      demands: true
    }
  } )

  if ( !users ) return

  const demandsWithUserDemandsInfo = await Promise.all( users.map( async ( user ) => {
    const userId = user.id

    const amount = await prisma.demand.count( {
      where: { userId }
    } )

    const accepted = await prisma.demand.count( {
      where: { userId, state: 'ACCEPTED' }
    } )

    const refused = await prisma.demand.count( {
      where: { userId, state: 'REJECTED' }
    } )

    const processing = await prisma.demand.count( {
      where: { userId, state: 'IN_PROGRESS' }
    } )

    return {
      id: user.id,
      name: `${user.firstName} ${user.lastName}`,
      company: user.company || 'No company',
      status: user.job || JOB.JOURNALIST,
      email: user.email,
      emailVerified: user.emailVerified,
      amount,
      accepted,
      refused,
      processing
    }
  } ) )

  return {
    match: { ...users },
    demands: demandsWithUserDemandsInfo
  }
}