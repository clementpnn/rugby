// eslint-disable-next-line check-file/folder-naming-convention
'use client'

import { Match, MatchTeam, User } from '@prisma/client'
import { SubmitHandler, useForm } from 'react-hook-form'
import Button from '@/components/buttons/button'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

interface MatchIdProperties {
    match: ( Match & { matchTeams: MatchTeam[] } )
    currentUser: User
}

const MatchId: React.FC<MatchIdProperties> = ( { currentUser, match } ) => {
  const [ isLoading, setIsloading ] = useState( false )
  const router = useRouter()
  const matchId = match.id
  const userId = currentUser.id

  const { handleSubmit } = useForm<any>( {} )

  const onSubmit: SubmitHandler<any> = async () => {
    setIsloading( true )

    await fetch( '/api/match', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify( { userId, matchId } ) } )
      .then( ( callback ) => {
        if ( callback.status === 200 ) { toast.success( `${callback.statusText}` ) }
        if ( callback.status !== 200 ) { toast.error( `${callback.statusText}` ) }
        setIsloading( false )
        router.refresh()
      } )
  }

  return (
    <>
      <div className='bg-blue-500' key={match.id}>
        <h1>{match.phase}</h1>
        <p>{match.date}</p>
        <p>{match.time}</p>
        {match.matchTeams.map( ( team ) => {
          return (
            <div key={team.id}>
              <p>{team.team}</p>
              <p>{team.result ?? '?'}</p>
            </div>
          )
        } ) }
      </div>
      <form onSubmit={handleSubmit( onSubmit )}>
        <Button disabled={isLoading} type='submit' variant='primary' size='md'>Join</Button>
        <div>
          <Button disabled={isLoading} type='submit' variant='primary' size='md'>
            Valider
          </Button>
        </div>
      </form>
    </>
  )
}

export default MatchId