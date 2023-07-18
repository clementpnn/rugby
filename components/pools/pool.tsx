import Image from 'next/image'
import * as React from 'react'
import useCountries from '@/hooks/useCountries'

interface PouleProperties{
    poulename?: string
    flag1?: string
    flag2?: string
    flag3?: string
    flag4?: string
    flag5?: string
}

const Pool: React.FC<PouleProperties> = ( { poulename, flag1, flag2, flag3, flag4, flag5 } ) => {
  const { getByValue } = useCountries()
  const country1 = getByValue( flag1 )
  const country2 = getByValue( flag2 )
  const country3 = getByValue( flag3 )
  const country4 = getByValue( flag4 )
  const country5 = getByValue( flag5 )

  return (
    <div className='w-full rounded pl-5 w-96'>
      <div className='h-full rounded-l space-y-3'>
        <div className='text-blue-600 h6-barlow-m'> POUL {poulename}</div>
      </div>
      <table className='table-auto mt-3 w-full'>
        <thead>
          <tr>
            <th className='float-left text-blue-900 pb-2 label-md-bold '>Equipe</th>
            <th className='invisible md:visible text-blue-900 label-md-bold pb-2 h-8 px-6'>MJ</th>
            <th className='invisible md:visible text-blue-900 label-md-bold pb-2 h-8 px-6'>V</th>
            <th className='invisible md:visible text-blue-900 label-md-bold pb-2 h-8 px-6'>N</th>
            <th className='invisible md:visible text-blue-900 label-md-bold pb-2 h-8 px-6'>D</th>
            <th className='invisible md:visible text-blue-900 label-md-bold pb-2 h-8 px-6'>DP</th>
            <th className='invisible md:visible text-blue-900 label-md-bold pb-2 h-8 px-6'>B</th>
            <th className='text-blue-900 label-md-bold pb-2 h-8 px-6'>Pts</th>
          </tr>
        </thead>
        <tbody>
          <tr className='border-t border-slate-200 h6-lato-d'>
            <td>
              <div className='py-3.5 rounded flex'>
                <Image src={country1?.flag} alt="Flag" width={'28'} height={'28'} className={'mr-4'}/>
                <span className='text-blue-900 '>{country1?.value}</span>
              </div>
            </td>
            <td className='invisible md:visible text-blue-900 text-center'>0</td>
            <td className='invisible md:visible text-blue-900 text-center'>0</td>
            <td className='invisible md:visible text-blue-900 text-center'>0</td>
            <td className='invisible md:visible text-blue-900 text-center'>0</td>
            <td className='invisible md:visible text-blue-900 text-center'>0</td>
            <td className='invisible md:visible text-blue-900 text-center'>0</td>
            <td className='text-blue-900 text-center'>0</td>
          </tr>
          <tr className='border-t border-slate-200 h6-lato-d'>
            <td>
              <div className=' py-3.5 rounded flex'>
                <Image src={country2?.flag} alt="Flag" width={'28'} height={'28'} className={'mr-4'}/>
                <span className='text-blue-900'>{country2?.value}</span>
              </div>
            </td>
            <td className='invisible md:visible text-blue-900 text-center'>0</td>
            <td className='invisible md:visible text-blue-900 text-center'>0</td>
            <td className='invisible md:visible text-blue-900 text-center'>0</td>
            <td className='invisible md:visible text-blue-900 text-center'>0</td>
            <td className='invisible md:visible text-blue-900 text-center'>0</td>
            <td className='invisible md:visible text-blue-900 text-center'>0</td>
            <td className='text-blue-900 text-center'>0</td>
          </tr>
          <tr className='border-t border-slate-200 h6-lato-d'>
            <td>
              <div className=' py-3.5 rounded flex'>
                <Image src={country3?.flag} alt="Flag" width={'28'} height={'28'} className={'mr-4'}/>
                <span className='text-blue-900 '>{country3?.value}</span>
              </div>
            </td>
            <td className='invisible md:visible text-blue-900 text-center'>0</td>
            <td className='invisible md:visible text-blue-900 text-center'>0</td>
            <td className='invisible md:visible text-blue-900 text-center'>0</td>
            <td className='invisible md:visible text-blue-900 text-center'>0</td>
            <td className='invisible md:visible text-blue-900 text-center'>0</td>
            <td className='invisible md:visible text-blue-900 text-center'>0</td>
            <td className='text-blue-900 text-center'>0</td>
          </tr>
          <tr className='border-t border-slate-200 h6-lato-d'>
            <td>
              <div className=' py-3.5 rounded flex'>
                <Image src={country4?.flag} alt="Flag" width={'28'} height={'28'} className={'mr-4'}/>
                <span className='text-blue-900 '>{country4?.value}</span>
              </div>
            </td>
            <td className='invisible md:visible text-blue-900 text-center'>0</td>
            <td className='invisible md:visible text-blue-900 text-center'>0</td>
            <td className='invisible md:visible text-blue-900 text-center'>0</td>
            <td className='invisible md:visible text-blue-900 text-center'>0</td>
            <td className='invisible md:visible text-blue-900 text-center'>0</td>
            <td className='invisible md:visible text-blue-900 text-center'>0</td>
            <td className='text-blue-900 text-center'>0</td>
          </tr>
          <tr className='border-t border-slate-200 h6-lato-d'>
            <td>
              <div className=' py-3.5 rounded flex'>
                <Image src={country5?.flag} alt="Flag" width={'28'} height={'28'} className={'mr-4'}/>
                <span className='text-blue-900 '>{country5?.value}</span>
              </div>
            </td>
            <td className='invisible md:visible text-blue-900 text-center'>0</td>
            <td className='invisible md:visible text-blue-900 text-center'>0</td>
            <td className='invisible md:visible text-blue-900 text-center'>0</td>
            <td className='invisible md:visible text-blue-900 text-center'>0</td>
            <td className='invisible md:visible text-blue-900 text-center'>0</td>
            <td className='invisible md:visible text-blue-900 text-center'>0</td>
            <td className='text-blue-900 text-center'>0</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
export default Pool
