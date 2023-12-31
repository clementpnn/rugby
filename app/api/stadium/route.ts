import { NextResponse } from 'next/server'

import prisma from '@/libs/prismadb'

export async function POST( request: Request ) {
  const body = await request.json()
  const { name, reference, stadiumImage, tribunes } = body

  if ( !reference || !name || !stadiumImage || !tribunes ) {
    return new NextResponse( 'Invalid Request', { status: 400 } )
  }

  const names = tribunes.map( ( tribune: { name: string } ) => tribune.name )

  if ( new Set( names ).size !== names.length ) {
    return new NextResponse( 'Duplicate names are not allowed', { status: 400 } )
  }

  tribunes.map( async ( tribune: any ) => {
    const { name, type, places, image, x, y } = tribune
    if ( !name || !type || !places || !image || !x || !y ) {
      return new NextResponse( 'Invalid Request', { status: 400 } )
    }
  } )

  const isStadiumExist = await prisma.stadium.findUnique( {
    where: { name_reference: { name, reference } }
  } )

  if ( isStadiumExist ) {
    return new NextResponse( 'A stadium already exists', { status: 400 } )
  }

  const stadium = await prisma.stadium.create( {
    data: { reference, name, image: stadiumImage }
  } )

  await Promise.all(
    tribunes.map( async ( tribune: any ) => {
      const { name, type, places, image, x, y } = tribune

      const isTribuneExist = await prisma.tribune.findUnique( {
        where: { name_stadiumId: { name, stadiumId: stadium.id } }
      } )

      if ( isTribuneExist ) {
        return new NextResponse( 'A tribune already exists', { status: 400 } )
      }

      await prisma.tribune.create( {
        data: { name, type, places: Number( places ), image, stadiumId: stadium.id, x, y }
      } )
    } ) )

  return new NextResponse( 'Stadium Created', { status: 200 } )
}
