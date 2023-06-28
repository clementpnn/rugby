import prisma from '@/libs/prismadb'

interface IParameters {
    userId?: string
}

export default async function getDemands(parameters: IParameters) {
  try {
    const { userId } = parameters

    if (!userId) {
      return
    }

    const demands = await prisma.demand.findMany({
      where: { userId },
      orderBy: {
        createdAt: 'desc'
      },
      include: {
        match: {
          include: {
            stadium: true,
            teams: true
          }
        }
      }
    })

    if (!demands) {
      return
    }

    return demands

  } catch (error: any) {
    throw new Error(error)
  }
}