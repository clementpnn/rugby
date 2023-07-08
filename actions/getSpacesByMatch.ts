// import prisma from '@/libs/prismadb'

interface IParameters {
    matchId?: string
}

export default async function getSpaceByStadium( parameters: IParameters ) {
  try {
    const { matchId } = parameters

    if ( !matchId ) {
      return
    }

    // const spaces = await prisma.space.findMany( {
    //   where: { matchId },
    //   orderBy: {
    //     places: 'desc'
    //   include: {
    //     demands: {
    //       where: {
    //         status: 'ACCEPTED'
    //       }
    //     }
    //   }
    // } )

    // if ( !spaces ) {
    //   return
    // }

    // return spaces

  } catch ( error: any ) {
    throw new Error( error )
  }
}