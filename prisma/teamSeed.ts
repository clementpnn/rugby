import { COUNTIES, POULE } from '@prisma/client'
import prisma from '../libs/prismadb'

async function main() {

    await prisma.team.create({
        data: { country: COUNTIES.NEW_ZEALAND, poule: POULE.A }
    })

    await prisma.team.create({
        data: { country: COUNTIES.FRANCE, poule: POULE.A }
    })

    await prisma.team.create({
    data: { country: COUNTIES.ARGENTINA, poule: POULE.A }
    })

    await prisma.team.create({
    data: { country: COUNTIES.ITALY, poule: POULE.A }
    })

    await prisma.team.create({
    data: { country: COUNTIES.IRELAND, poule: POULE.B }
    })

    await prisma.team.create({
    data: { country: COUNTIES.SCOTLAND, poule: POULE.B }
    })

    await prisma.team.create({
    data: { country: COUNTIES.ENGLAND, poule: POULE.B }
    })

    await prisma.team.create({
    data: { country: COUNTIES.JAPAN, poule: POULE.B }
    })

    await prisma.team.create({
    data: { country: COUNTIES.SOUTH_AFRICA, poule: POULE.C }
    })

    await prisma.team.create({
    data: { country: COUNTIES.WALES, poule: POULE.C }
    })

    await prisma.team.create({
    data: { country: COUNTIES.FIJI, poule: POULE.C }
    })

    await prisma.team.create({
    data: { country: COUNTIES.AUSTRALIA, poule: POULE.C }
    })

    await prisma.team.create({
    data: { country: COUNTIES.SAMOA, poule: POULE.D }
    })

    await prisma.team.create({
    data: { country: COUNTIES.TONGA, poule: POULE.D }
    })

    await prisma.team.create({
    data: { country: COUNTIES.GEORGIA, poule: POULE.D }
    })

    await prisma.team.create({
    data: { country: COUNTIES.URUGUAY, poule: POULE.D }
    })
}

main()
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
