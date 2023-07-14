import { JOB } from '@prisma/client'
import prisma from '../libs/prismadb'

async function main() {

  const stadiums = [
    {
      name: 'Stade de France',
      reference: 'SDF',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Stade_de_France_2019.jpg/1200px-Stade_de_France_2019.jpg',
      tribunes: [
        {
          name: 'Tribune 1',
          type: JOB.JOURNALIST,
          places: 1000,
          image: 'https://picsum.photos/1000/500',
          x: 180,
          y: 210
        },
        {
          name: 'Tribune 2',
          type: JOB.PHOTOGRAPHER,
          places: 500,
          image: 'https://picsum.photos/500/500',
          x: 60,
          y: 110
        },
        {
          name: 'Tribune 3',
          type: JOB.JOURNALIST,
          places: 1000,
          image: 'https://picsum.photos/1000/500',
          x: 90,
          y: 210
        }
      ]
    },
    {
      name: 'Wembley Stadium',
      reference: 'WST',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/Wembley_Stadium_2017.jpg/1200px-Wembley_Stadium_2017.jpg',
      tribunes: [
        {
          name: 'Tribune 1',
          type: JOB.JOURNALIST,
          places: 1000,
          image: 'https://picsum.photos/1000/500',
          x: 80,
          y: 190
        },
        {
          name: 'Tribune 2',
          type: JOB.PHOTOGRAPHER,
          places: 500,
          image: 'https://picsum.photos/500/500',
          x: 220,
          y: 60
        },
        {
          name: 'Tribune 3',
          type: JOB.JOURNALIST,
          places: 1000,
          image: 'https://picsum.photos/1000/500',
          x: 50,
          y: 40
        }
      ]
    },
    {
      name: 'Estadio Azteca',
      reference: 'EA',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Estadio_Azteca_2013.jpg/1200px-Estadio_Azteca_2013.jpg',
      tribunes: [
        {
          name: 'Tribune 1',
          type: JOB.JOURNALIST,
          places: 1000,
          image: 'https://picsum.photos/1000/500',
          x: 140,
          y: 200
        },
        {
          name: 'Tribune 2',
          type: JOB.PHOTOGRAPHER,
          places: 500,
          image: 'https://picsum.photos/500/500',
          x: 120,
          y: 100
        },
        {
          name: 'Tribune 3',
          type: JOB.JOURNALIST,
          places: 1000,
          image: 'https://picsum.photos/1000/500',
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