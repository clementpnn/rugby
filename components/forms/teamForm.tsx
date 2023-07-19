'use client'

import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import Image from 'next/image'
import Button from '../buttons/button'
import Container from '../containers/container'
import { Team } from '@prisma/client'
import { useRouter } from 'next/navigation'

interface TeamFormProperties {
    team: Team | undefined
}

const TeamForm: React.FC<TeamFormProperties> = ( { team } ) => {
  const [ isLoading, setIsloading ] = useState( false )
  const router = useRouter()

  const { handleSubmit } = useForm( {} )

  const onSubmit: SubmitHandler<any> = async () => {
    setIsloading( true )

    await fetch( '/api/team', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify( { teamId: team?.id } )
    } )
      .then( ( callback ) => {
        if ( callback.status === 200 ) {
          toast.success( `${callback.statusText}` )
          router.refresh()
        }
        if ( callback.status !== 200 ) { toast.error( `${callback.statusText}` ) }
      } )

    setIsloading( false )
  }

  return (
    <div className='w-screen h-screen box-border flex justify-center items-center'>
      <Container>
        <form onSubmit={handleSubmit( onSubmit )}>
          <div className='h-fit w-[calc(100vw-40px)] flex flex-col max-w-[400px]'>
            <Image
              src={'/images/logoBlueInline.svg'}
              height={48}
              width={132}
              alt='logo blue inline'
              className='mb-[60px]'
            />
            <div className='mb-20'>
              <p className='text-blue7 h2-barlow-m sm:h1-barlow-m'>azerty</p>
              <p className='text-blue6 h2-barlow-m sm:h1-barlow-m'>azerty</p>
            </div>
            <div className='flex flex-col gap-y-10'>
              <div className='flex flex-col gap-y-6'>
              </div>
              <Button className='w-full' disabled={isLoading} type='submit' variant='primary' size='md'>
                Passer en quart de finale
              </Button>
            </div>
          </div>
        </form>
      </Container>
    </div>
  )
}

export default TeamForm
