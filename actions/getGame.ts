import prisma from '@/libs/prismadb'

interface IParameters {
    id?: string
    userId?: string
}

export default async function getReservations(parameters: IParameters) {
    try {
        const { id, userId } = parameters

        if (!id || !userId) {
            return
        }

        const existingDemand = await prisma.demand.findFirst({
            where: {
                userId: userId,
                gameId: id,
                state: {
                    in: ['ACCEPTED', 'IN_PROGRESS'],
                }
            }
        })

        const games = await prisma.game.findMany({
            where: { id },
            include: {
                teams: true
            }
        })

        if (existingDemand) {
            return {...games, existingDemand: true}
        }
        return {...games, existingDemand: false}

    } catch (error: any) {
        throw new Error(error)
    }
}