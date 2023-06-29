'use client'

import useCountries from '@/hooks/useCountries';
import { Button } from '../ui/button'
import Image from 'next/image'


const ModalJoinWaitList = () => {
    const { getByValue } = useCountries();
    const country1 = getByValue('FRANCE');
    const country2 = getByValue('PORTUGAL');
    return (
        <div className="h-screen w-screen flex justify-center items-center box-border">
            <div className='w-[535px] h-[416px] bg-blue1 rounded-[12px]'>
                <div className="h-[128px] flex flex-row justify-between py-[40px] px-[32px] border-b-4 border-blue3">
                    {/* mettre bonne font ?? */}
                    <span className="text-blue6">QUARTER FINAL</span>
                    {/* button icon ?? */}
                    <Button variant={'outline'} size={'sIcon'}>X</Button>
                </div>
                <div className='h-fit flex flex-col ml-[32px] mt-[32px] mr-[32px] mb-[40px] gap-[32px]'>
                    <div className='w-[471px] h-[132px] flex flex-col gap-[24px]'>
                        <div className="h-[64px] flex flex-row items-end justify-between">
                            <div className="text-blue6 flex flex-col justify-start items-start gap-[4px]">
                                <span>20:45</span>
                                <span>Saturday October 10, 2023</span>
                            </div>
                            <div className="text-blue6 flex justify-end">
                                <span>Stade de Marseille</span>
                            </div>
                        </div>
                        <div className="h-[44px] flex flex-row gap-[16px] items-center">
                            <div className="bg-blue2 w-[203px] flex flex-row gap-[12px] px-[16px] py-[8px] items-center rounded-lg">
                            <Image src={country1?.flag || '/placeholder-image.png'} alt="Flag" width={'28'} height={'28'}/>
                                <span className='text-blue6'>{country1?.value}</span>
                            </div>
                            <span className="text-blue6">VS</span>
                            <div className="bg-blue2 w-[203px] flex flex-row gap-[12px] px-[16px] py-[8px] items-center rounded-lg">
                            <Image src={country2?.flag || '/placeholder-image.png'} alt="Flag" width={'28'} height={'28'}/>
                                <span className='text-blue6'>{country2?.value}</span>
                            </div>
                        </div>
                    </div>
                    <Button className='m-0' variant={'fill'} size={'lg'}>Join Wait List</Button>
                </div>
            </div>
        </div>
    )
}

export default ModalJoinWaitList