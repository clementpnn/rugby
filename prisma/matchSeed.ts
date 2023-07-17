import moment from 'moment'
import { RESULT } from '@prisma/client'

import prisma from '../libs/prismadb'

function randomDate( start: Date, end: Date ) {
  return new Date( start.getTime() + Math.random() * ( end.getTime() - start.getTime() ) )
}

function getRandomTime() {
  const hour = Math.floor( Math.random() * ( 20 - 12 + 1 ) ) + 12
  const minute = 5 * Math.floor( Math.random() * 12 )
  return `${hour}:${minute < 10 ? '0' : ''}${minute}`
}

function getRandomResult() {
  const number_ = Math.random()
  if ( number_ < 0.33 ) return [ 'WINNER', 'LOSER' ]
  else if ( number_ < 0.66 ) return [ 'LOSER', 'WINNER' ]
  else return [ 'NULL', 'NULL' ]
}

function getRandomPoints( isWinner: boolean ) {
  const basePoints = isWinner ? Math.floor( Math.random() * 5 + 5 ) : Math.floor( Math.random() * 5 )
  const bonusPoints = Math.floor( Math.random() * 2 )
  const defenseBonus = Math.floor( Math.random() * 2 )

  return { basePoints, bonusPoints, defenseBonus }
}

async function main() {
  const stadiums = await prisma.stadium.findMany()
  const teams = await prisma.team.findMany()

  const startDate = moment( '01-07-2023', 'DD-MM-YYYY' )
  const endDate = moment( '20-07-2023', 'DD-MM-YYYY' )

  const phases = [ 'POULE_A', 'POULE_B', 'POULE_C', 'POULE_D' ]
  for( const phase of phases ) {
    const phaseTeams = teams.filter( team => team.phase === phase )

    for( let index = 0; index < phaseTeams.length; index++ ) {
      for( let index_ = index+1; index_ < phaseTeams.length; index_++ ) {
        const team1 = phaseTeams[index]
        const team2 = phaseTeams[index_]
        const randomResult = getRandomResult()
        const randomTime = getRandomTime()
        const date = randomDate( startDate.toDate(), endDate.toDate() )
        const stadium = stadiums[Math.floor( Math.random() * stadiums.length )]

        const existingMatches = await prisma.match.findMany( {
          where: {
            stadiumId: stadium.id,
            date: moment( date ).format( 'YYYY-MM-DD' )
          }
        } )

        if( existingMatches.length > 0 ) {
          index_--
          continue
        }

        const team1Points = getRandomPoints( randomResult[0] === 'WINNER' )
        const team2Points = getRandomPoints( randomResult[1] === 'WINNER' )

        await prisma.match.create( {
          data: {
            date: moment( date ).format( 'YYYY-MM-DD' ),
            time: randomTime,
            stadiumId: stadium.id,
            phase: team1.phase,
            matchTeams: {
              create: [
                { team: team1.country, result: randomResult[0] as RESULT },
                { team: team2.country, result: randomResult[1] as RESULT }
              ]
            }
          }
        } )

        await prisma.team.update( {
          where: { country: team1.country },
          data: {
            points: { increment: team1Points.basePoints },
            bonus: { increment: team1Points.bonusPoints },
            defenseBonus: { increment: team1Points.defenseBonus },
            victory: { increment: randomResult[0] === 'WINNER' ? 1 : 0 },
            null: { increment: randomResult[0] === 'NULL' ? 1 : 0 },
            defeat: { increment: randomResult[0] === 'LOSER' ? 1 : 0 },
            matchPlayed: { increment: 1 }
          }
        } )

        await prisma.team.update( {
          where: { country: team2.country },
          data: {
            points: { increment: team2Points.basePoints },
            bonus: { increment: team2Points.bonusPoints },
            defenseBonus: { increment: team2Points.defenseBonus },
            victory: { increment: randomResult[1] === 'WINNER' ? 1 : 0 },
            null: { increment: randomResult[1] === 'NULL' ? 1 : 0 },
            defeat: { increment: randomResult[1] === 'LOSER' ? 1 : 0 },
            matchPlayed: { increment: 1 }
          }
        } )
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