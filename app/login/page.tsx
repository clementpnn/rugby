'use client'

import Input from '@/components/inputs/input';
import { ButtonUI } from '@/components/ui/button';
import Image from 'next/image';
import { PiEyeBold } from 'react-icons/pi';


export default async function Home() {
  return (
    <div className='w-screen h-screen bg-neutral0 box-border flex justify-center items-center'>
      {/* !TODO 
      revoir le mb et voir comment monter la div
      revoir les espacement entre tous les els 60px et entre la div des inputs et btn 40px
      width en px ?
      pq a chaque fois je veux recharger la page ça pète et je dois recréer un nv onglet ?
       */}
      <div className='h-fit w-[350px] flex flex-col'>
        <div className='flex flex-col gap-y-[60px]'>
          <Image
          src={'/images/logoBlueInline.svg'}
          height={48}
          width={132}
          alt='logo blue inline'
          />
          <div className='h1-barlow-m mb-20'>
            <p className='text-blue7'>SE</p>
            <p className='text-blue6'>CONNECTER</p>
          </div>
        </div>
        <div className='flex flex-col gap-y-10'>
          <div className='flex flex-col gap-y-6'>
            <Input id={'email'} placeholder='Entrez votre email' label='Email' size='md'/>
            <Input id={'password'} placeholder='Entrez votre mot de passe' label='Password' size='md'iconPosition='right' icon={<PiEyeBold className="w-full h-full" />}/>
          </div>
          <ButtonUI size={'lg'} variant={'primary'} className='w-full'>Se connecter</ButtonUI>
        </div>
      </div>
    </div>
  )
}