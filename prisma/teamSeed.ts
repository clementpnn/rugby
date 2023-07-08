import { COUNTIES, PHASE } from '@prisma/client'
import prisma from '../libs/prismadb'

async function main() {

  await prisma.team.create( {
    data: { country: COUNTIES.NEW_ZEALAND, phase: PHASE.POULE_A }
  } )

  await prisma.team.create( {
    data: { country: COUNTIES.FRANCE, phase: PHASE.POULE_A }
  } )

  await prisma.team.create( {
    data: { country: COUNTIES.ARGENTINA, phase: PHASE.POULE_A }
  } )

  await prisma.team.create( {
    data: { country: COUNTIES.ITALY, phase: PHASE.POULE_A }
  } )

  await prisma.team.create( {
    data: { country: COUNTIES.IRELAND, phase: PHASE.POULE_B }
  } )

  await prisma.team.create( {
    data: { country: COUNTIES.SCOTLAND, phase: PHASE.POULE_B }
  } )

  await prisma.team.create( {
    data: { country: COUNTIES.ENGLAND, phase: PHASE.POULE_B }
  } )

  await prisma.team.create( {
    data: { country: COUNTIES.JAPAN, phase: PHASE.POULE_B }
  } )

  await prisma.team.create( {
    data: { country: COUNTIES.SOUTH_AFRICA, phase: PHASE.POULE_C }
  } )

  await prisma.team.create( {
    data: { country: COUNTIES.WALES, phase: PHASE.POULE_C }
  } )

  await prisma.team.create( {
    data: { country: COUNTIES.FIJI, phase: PHASE.POULE_C }
  } )

  await prisma.team.create( {
    data: { country: COUNTIES.AUSTRALIA, phase: PHASE.POULE_C }
  } )

  await prisma.team.create( {
    data: { country: COUNTIES.SAMOA, phase: PHASE.POULE_D }
  } )

  await prisma.team.create( {
    data: { country: COUNTIES.TONGA, phase: PHASE.POULE_D }
  } )

  await prisma.team.create( {
    data: { country: COUNTIES.GEORGIA, phase: PHASE.POULE_D }
  } )

  await prisma.team.create( {
    data: { country: COUNTIES.URUGUAY, phase: PHASE.POULE_D }
  } )
}

main()
  .catch( () => {
    process.exit( 1 )
  } )
  .finally( async () => {
    await prisma.$disconnect()
  } )
