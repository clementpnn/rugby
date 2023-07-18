import { STATE } from '@prisma/client'
import prisma from '../libs/prismadb'

async function main() {
  const matchs = await prisma.match.findMany()
  const users = await prisma.user.findMany()

  const states = [ 'ACCEPTED', 'IN_PROGRESS', 'REJECTED' ]

  for ( let match of matchs ) {
    const numberOfUsers = Math.floor( Math.random() * ( 10 - 5 + 1 ) ) + 5
    const shuffledUsers = users.sort( () => 0.5 - Math.random() )
    const selectedUsers = shuffledUsers.slice( 0, numberOfUsers )

    for ( let user of selectedUsers ) {
      const previousDemand = await prisma.demand.findFirst( {
        where: {
          matchId: match.id,
          userId: user.id,
          NOT: {
            state: 'REJECTED'
          }
        }
      } )

      if ( !previousDemand ) {
        const newDemand = {
          matchId: match.id,
          userId: user.id,
          state: states[Math.floor( Math.random() * states.length )] as STATE
        }
        await prisma.demand.create( { data: newDemand } )
      }
    }
  }
}

main()
  .catch( () => {
    process.exit( 1 )
  } )
  .finally( async () => {
    await prisma.$disconnect()
  } )