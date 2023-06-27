import prisma from '@/libs/prismadb'

interface IParameters {
    userId?: string
}

export default async function getReservations(parameters: IParameters) {
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
                game: {
                  include: {
                    stadium: true,
                    teams: true
                  }
                }
            }
        })

        return demands

    } catch (error: any) {
        throw new Error(error)
    }
}