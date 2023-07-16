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
        const phase = team1.phase

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

        await prisma.match.create( {
          data: {
            date: moment( date ).format( 'YYYY-MM-DD' ),
            time: randomTime,
            stadiumId: stadium.id,
            phase,
            matchTeams: {
              create: [
                { team: team1.country, result: randomResult[0] as RESULT },
                { team: team2.country, result: randomResult[1] as RESULT }
              ]
            }
          }
        } )
      }
    }
  }
}

main()
  .catch( ( error ) => {
    // eslint-disable-next-line no-console
    console.log( error )
    process.exit( 1 )
  } )
  .finally( async () => {
    await prisma.$disconnect()
  } )