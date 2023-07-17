import { JOB } from '@prisma/client'
import prisma from '../libs/prismadb'

async function main() {

  const stadiums = [
    {
      name: 'Stade de Bordeaux',
      reference: 'BOR',
      image: 'https://res.cloudinary.com/dqoyumrza/image/upload/v1689541696/hgyueowqdwi4zimkafuj.png',
      tribunes: [
        {
          name: 'Static',
          type: JOB.PHOTOGRAPHER,
          places: 84,
          image: 'https://res.cloudinary.com/dqoyumrza/image/upload/v1689540388/jtg6fubepzisuz3ujyir.png',
          x: 180,
          y: 210
        },
        {
          name: 'Table Positions',
          type: JOB.JOURNALIST,
          places: 150,
          image: 'https://res.cloudinary.com/dqoyumrza/image/upload/v1689540415/wxx0vyekvm0nvjtboe3q.png',
          x: 60,
          y: 110
        },
        {
          name: 'No Table Positions',
          type: JOB.JOURNALIST,
          places: 25,
          image: 'https://res.cloudinary.com/dqoyumrza/image/upload/v1689540415/wxx0vyekvm0nvjtboe3q.png',
          x: 90,
          y: 210
        }
      ]
    },
    {
      name: 'Stade Pierre Mauroy',
      reference: 'LIL',
      image: 'https://res.cloudinary.com/dqoyumrza/image/upload/v1689541740/vz0vzlz0f7uk1yl4ipsv.png',
      tribunes: [
        {
          name: 'No Table Positions',
          type: JOB.JOURNALIST,
          places: 30,
          image: 'https://res.cloudinary.com/dqoyumrza/image/upload/v1689540415/wxx0vyekvm0nvjtboe3q.png',
          x: 80,
          y: 190
        },
        {
          name: 'Roving',
          type: JOB.PHOTOGRAPHER,
          places: 94,
          image: 'https://res.cloudinary.com/dqoyumrza/image/upload/v1689540388/jtg6fubepzisuz3ujyir.png',
          x: 220,
          y: 60
        },
        {
          name: 'Table Positions',
          type: JOB.JOURNALIST,
          places: 175,
          image: 'https://res.cloudinary.com/dqoyumrza/image/upload/v1689540415/wxx0vyekvm0nvjtboe3q.png',
          x: 50,
          y: 40
        }
      ]
    },
    {
      name: 'Stade de Lyon',
      reference: 'LYO',
      image: 'https://res.cloudinary.com/dqoyumrza/image/upload/v1689541716/lk6pzg1u0ogk91qdzdc1.png',
      tribunes: [
        {
          name: 'Table Positions',
          type: JOB.JOURNALIST,
          places: 175,
          image: 'https://res.cloudinary.com/dqoyumrza/image/upload/v1689540415/wxx0vyekvm0nvjtboe3q.png',
          x: 140,
          y: 200
        },
        {
          name: 'Elevated',
          type: JOB.PHOTOGRAPHER,
          places: 94,
          image: 'https://res.cloudinary.com/dqoyumrza/image/upload/v1689540388/jtg6fubepzisuz3ujyir.png',
          x: 120,
          y: 100
        },
        {
          name: 'No Table Positions',
          type: JOB.JOURNALIST,
          places: 30,
          image: 'https://res.cloudinary.com/dqoyumrza/image/upload/v1689540415/wxx0vyekvm0nvjtboe3q.png',
          x: 90,
          y: 130
        }
      ]
    },
    {
      name: 'Stade Vélodrome',
      reference: 'MAR',
      image: 'https://res.cloudinary.com/dqoyumrza/image/upload/v1689541800/yq5fjrpukeb2t9r5t67y.png',
      tribunes: [
        {
          name: 'Table Positions',
          type: JOB.JOURNALIST,
          places: 190,
          image: 'https://res.cloudinary.com/dqoyumrza/image/upload/v1689540415/wxx0vyekvm0nvjtboe3q.png',
          x: 140,
          y: 200
        },
        {
          name: 'Roving',
          type: JOB.PHOTOGRAPHER,
          places: 100,
          image: 'https://res.cloudinary.com/dqoyumrza/image/upload/v1689540388/jtg6fubepzisuz3ujyir.png',
          x: 120,
          y: 100
        },
        {
          name: 'No Table Positions',
          type: JOB.JOURNALIST,
          places: 50,
          image: 'https://res.cloudinary.com/dqoyumrza/image/upload/v1689540415/wxx0vyekvm0nvjtboe3q.png',
          x: 90,
          y: 130
        }
      ]
    },
    {
      name: 'Stade de Beaujoire',
      reference: 'NAN',
      image: 'https://res.cloudinary.com/dqoyumrza/image/upload/v1689541653/ynj9nox8khle5lqvrizj.png',
      tribunes: [
        {
          name: 'Table Positions',
          type: JOB.JOURNALIST,
          places: 175,
          image: 'https://res.cloudinary.com/dqoyumrza/image/upload/v1689540415/wxx0vyekvm0nvjtboe3q.png',
          x: 140,
          y: 200
        },
        {
          name: 'Elevated',
          type: JOB.PHOTOGRAPHER,
          places: 92,
          image: 'https://res.cloudinary.com/dqoyumrza/image/upload/v1689540388/jtg6fubepzisuz3ujyir.png',
          x: 120,
          y: 100
        },
        {
          name: 'No Table Positions',
          type: JOB.JOURNALIST,
          places: 30,
          image: 'https://res.cloudinary.com/dqoyumrza/image/upload/v1689540415/wxx0vyekvm0nvjtboe3q.png',
          x: 90,
          y: 130
        }
      ]
    },
    {
      name: 'Stade de Nice',
      reference: 'NIC',
      image: 'https://res.cloudinary.com/dqoyumrza/image/upload/v1689540347/jmhh0c9wuvspjqlogrs4.png',
      tribunes: [
        {
          name: 'Table Positions',
          type: JOB.JOURNALIST,
          places: 175,
          image: 'https://res.cloudinary.com/dqoyumrza/image/upload/v1689540415/wxx0vyekvm0nvjtboe3q.png',
          x: 140,
          y: 200
        },
        {
          name: 'Static',
          type: JOB.PHOTOGRAPHER,
          places: 92,
          image: 'https://res.cloudinary.com/dqoyumrza/image/upload/v1689540388/jtg6fubepzisuz3ujyir.png',
          x: 120,
          y: 100
        },
        {
          name: 'No Table Positions',
          type: JOB.JOURNALIST,
          places: 30,
          image: 'https://res.cloudinary.com/dqoyumrza/image/upload/v1689540415/wxx0vyekvm0nvjtboe3q.png',
          x: 90,
          y: 130
        }
      ]
    },
    {
      name: 'Stade Geoffroy Guichard',
      reference: 'STE',
      image: 'https://res.cloudinary.com/dqoyumrza/image/upload/v1689541670/no6itd6idlqhz73jjo8d.png',
      tribunes: [
        {
          name: 'Table Positions',
          type: JOB.JOURNALIST,
          places: 330,
          image: 'https://res.cloudinary.com/dqoyumrza/image/upload/v1689540415/wxx0vyekvm0nvjtboe3q.png',
          x: 140,
          y: 200
        },
        {
          name: 'Elevated',
          type: JOB.PHOTOGRAPHER,
          places: 100,
          image: 'https://res.cloudinary.com/dqoyumrza/image/upload/v1689540388/jtg6fubepzisuz3ujyir.png',
          x: 120,
          y: 100
        },
        {
          name: 'No Table Positions',
          type: JOB.JOURNALIST,
          places: 100,
          image: 'https://res.cloudinary.com/dqoyumrza/image/upload/v1689540415/wxx0vyekvm0nvjtboe3q.png',
          x: 90,
          y: 130
        }
      ]
    },
    {
      name: 'Stade de France',
      reference: 'STD',
      image: 'https://res.cloudinary.com/dqoyumrza/image/upload/v1689541628/jc599b0rccqwgtmvse2f.png',
      tribunes: [
        {
          name: 'Table Positions',
          type: JOB.JOURNALIST,
          places: 150,
          image: 'https://res.cloudinary.com/dqoyumrza/image/upload/v1689540415/wxx0vyekvm0nvjtboe3q.png',
          x: 140,
          y: 200
        },
        {
          name: 'Roving',
          type: JOB.PHOTOGRAPHER,
          places: 74,
          image: 'https://res.cloudinary.com/dqoyumrza/image/upload/v1689540388/jtg6fubepzisuz3ujyir.png',
          x: 120,
          y: 100
        },
        {
          name: 'No Table Positions',
          type: JOB.JOURNALIST,
          places: 25,
          image: 'https://res.cloudinary.com/dqoyumrza/image/upload/v1689540415/wxx0vyekvm0nvjtboe3q.png',
          x: 90,
          y: 130
        }
      ]
    }
  ]

  for ( const stadium of stadiums ) {
    const newStadium = await prisma.stadium.create( {
      data: {
        name: stadium.name,
        reference: stadium.reference,
        image: stadium.image
      }
    } )

    for ( const tribune of stadium.tribunes ) {
      await prisma.tribune.create( {
        data: {
          name: tribune.name,
          type: tribune.type,
          places: tribune.places,
          image: tribune.image,
          x: tribune.x,
          y: tribune.y,
          stadiumId: newStadium.id
        }
      } )
    }
  } }

main()
  .catch( () => {
    process.exit( 1 )
  } )
  .finally( async () => {
    await prisma.$disconnect()
  } )