import { faker } from '@faker-js/faker'
import prisma from '../libs/prismadb'
import bcrypt from 'bcrypt'
import { v4 as uuid } from 'uuid'

async function main() {
  for( let index=0; index<20; index++ ) {
    const company = faker.helpers.arrayElement( [
      'ESPN',
      'Sky Sports',
      'FOX Sports',
      'BBC Sport',
      'NBC Sports',
      'CBS Sports',
      'Sport1',
      'TSN',
      'Eurosport',
      'DAZN',
      'beIN Sports',
      'Sportsnet',
      'RDS',
      'Yahoo Sports',
      'Bleacher Report',
      'The Athletic',
      'Goal',
      'Rugby World',
      'World Rugby',
      'RugbyPass',
      'Rugby Magazine'
    ] )
    const firstName = faker.person.firstName()
    const lastName = faker.person.lastName()

    await prisma.user.create( {
      data: {
        accreditationId: uuid(),
        firstName,
        lastName,
        email: faker.internet.email( { firstName, lastName } ),
        image: faker.image.avatar(),
        password: await bcrypt.hash( 'Azerty1$', 10 ),
        company: company,
        job: faker.helpers.arrayElement( [ 'JOURNALIST', 'PHOTOGRAPHER' ] )
      }
    } )
  }
  await prisma.user.create( {
    data: {
      firstName: 'Victor',
      lastName: 'Huang',
      email: 'huang.victor.mail@gmail.com',
      image: faker.image.avatar(),
      password: await bcrypt.hash( 'Victor.123456789', 10 ),
      role: 'ADMIN'
    }
  } )
}

main()
  .catch( () => {
    process.exit( 1 )
  } )
  .finally( async () => {
    await prisma.$disconnect()
  } )
