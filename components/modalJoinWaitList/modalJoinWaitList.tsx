'use client'

import useCountries from '@/hooks/useCountries';
import { Button } from '../ui/button'
import Image from 'next/image'
import { Badge } from '../ui/badge';

const ModalJoinWaitList = () => {
    const { getByValue } = useCountries();
    const country1 = getByValue('FRANCE');
    const country2 = getByValue('ARGENTINA');
    return(
        <div className='bg-neutral8 w-screen h-screen flex justify-center items-center box-border'>
            <div className='w-full max-w-lg mx-5 h-fit bg-neutral0 rounded-xl'>
                <div className='h-fit flex flex-row justify-between items-center py-6 px-6 border-b border-neutral3 sm:px-8 sm:py-10'>
                    <span className='h5-barlow-m text-blue6 sm:h5-barlow-d'>QUARTER FINAL</span>
                    <Button variant={'outline'} size={'sIcon'}>X</Button>
                </div>
                <div className='w-full h-fit flex flex-col gap-8 px-6 py-6'>
                    <div className='flex flex-col gap-y-1'>
                        <div className='w-full flex justify-between'>
                            <span className='h6-barlow-m text-blue6 sm:h6-barlow-d'>20:45</span>
                            <Badge variant={'progress'}>Progress</Badge>
                        </div>
                        <div className='flex flex-col gap-y-2 sm:flex-row sm:justify-between'>
                            <span className='label-sm text-blue6 sm:label-md'>Saturday October 10, 2023</span>
                            <span className='label-sm text-blue6 sm:label-md'>Stade de Marseille</span>
                        </div>
                    </div>
                    <div className='flex gap-x-4'>
                        <div className='h-fit w-full flex flex-col gap-y-4 sm:flex-row'>
                            <div className='h-fit w-full px-4 py-2 gap-x-3 bg-blue1 rounded-md flex flex-row sm:px-4 sm:py-2'>
                                <Image src={country1?.flag || '/placeholder-image.png'} alt="Flag" width={'28'} height={'28'}/>
                                <span className='h6-lato-d text-blue6'>{country1?.value}</span>
                            </div>
                            <div className='hidden sm:flex sm:flex-row sm:gap-y-1 sm:items-center'>
                                <span className='h6-barlow-m text-blue6 text-center w-8 h-8 sm:text-right'>W</span>
                                <span className='h6-barlow-m text-blue6 text-center w-8 h-8 sm:text-center'>-</span>
                                <span className='h6-barlow-m text-blue6 text-center w-8 h-8 sm:text-left'>L</span>
                            </div>
                            <div className='h-fit w-full px-4 py-2 gap-x-3 bg-blue1 rounded-md flex flex-row'>
                                <Image src={country2?.flag || '/placeholder-image.png'} alt="Flag" width={'28'} height={'28'} className='sm:hidden'/>
                                <span className='h6-lato-d text-blue6'>{country2?.value}</span>
                                <Image src={country2?.flag || '/placeholder-image.png'} alt="Flag" width={'28'} height={'28'} className='hidden sm:block'/>
                            </div>
                        </div>
                        <div className='flex flex-col gap-y-1 sm:hidden'>
                            <span className='h6-barlow-m text-blue6 text-center w-8 h-8'>W</span>
                            <span className='h6-barlow-m text-blue6 text-center w-8 h-8'>-</span>
                            <span className='h6-barlow-m text-blue6 text-center w-8 h-8'>L</span>
                        </div>
                    </div>
                    <Button className='fill label-md m-0 sm:label-lg' variant={'fill'} size={'lg'}>Join Wait List</Button>
                </div>
            </div>
        </div>
    )
}

export default ModalJoinWaitList