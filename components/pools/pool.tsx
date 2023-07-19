import Image from 'next/image'
import * as React from 'react'
import useCountries from '@/hooks/useCountries'
import { Poules } from '@/app/table/poulelayout'

interface PouleProperties{
  data: Poules
}

const Pool: React.FC<PouleProperties> = ( { data } ) => {
  const { getByValue } = useCountries()
  const country1 = getByValue( data.data[0].teamName )
  const country2 = getByValue( data.data[1].teamName )
  const country3 = getByValue( data.data[2].teamName )
  const country4 = getByValue( data.data[3].teamName )
  const country5 = getByValue( data.data[4].teamName )

  return(
    <div className='py-12 w-full rounded'>
      <div className='rounded-l space-y-3'>
        <div className='text-blue-600 pl-5 h6-barlow-m md:pl-20'> POUL { data.pouleName }</div>
      </div>
      <table className='table-auto mt-3 w-full'>
        <thead>
          <tr>
            <th className='float-left text-blue-900 pb-2 pl-5 label-md-bold md:pl-20'>Equipe</th>
            <th className='invisible md:visible text-blue-900 label-md-bold pb-2 h-8 px-6'>GP</th>
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
              <div className='py-3.5 pl-5 rounded flex md:pl-20'>
                <Image src={ country1?.flag || '/placeholder-image.png'} alt='Flag' width={'28'} height={'28'} className={'mr-4'}/>
                <span className='text-blue-900'>{country1?.value}</span>
              </div>
            </td>
            <td className='invisible md:visible text-blue-900 text-center'>{data.data[0].GP}</td>
            <td className='invisible md:visible text-blue-900 text-center'>{data.data[0].V}</td>
            <td className='invisible md:visible text-blue-900 text-center'>{data.data[0].N}</td>
            <td className='invisible md:visible text-blue-900 text-center'>{data.data[0].L}</td>
            <td className='invisible md:visible text-blue-900 text-center'>{data.data[0].DP}</td>
            <td className='invisible md:visible text-blue-900 text-center'>{data.data[0].B}</td>
            <td className='text-blue-900 text-center'>{data.data[0].Pts}</td>
          </tr>
          <tr className='border-t border-slate-200 h6-lato-d'>
            <td>
              <div className=' py-3.5 pl-5 rounded flex md:pl-20'>
                <Image src={country2?.flag || '/placeholder-image.png'} alt='Flag' width={'28'} height={'28'} className={'mr-4'}/>
                <span className='text-blue-900'>{country2?.value}</span>
              </div>
            </td>
            <td className='invisible md:visible text-blue-900 text-center'>{data.data[1].GP}</td>
            <td className='invisible md:visible text-blue-900 text-center'>{data.data[1].V}</td>
            <td className='invisible md:visible text-blue-900 text-center'>{data.data[1].N}</td>
            <td className='invisible md:visible text-blue-900 text-center'>{data.data[1].L}</td>
            <td className='invisible md:visible text-blue-900 text-center'>{data.data[1].DP}</td>
            <td className='invisible md:visible text-blue-900 text-center'>{data.data[1].B}</td>
            <td className='text-blue-900 text-center'>0</td>
          </tr>
          <tr className='border-t border-slate-200 h6-lato-d'>
            <td>
              <div className=' py-3.5 pl-5 rounded flex md:pl-20'>
                <Image src={country3?.flag || '/placeholder-image.png' } alt='Flag' width={'28'} height={'28'} className={'mr-4'}/>
                <span className='text-blue-900 '>{country3?.value}</span>
              </div>
            </td>
            <td className='invisible md:visible text-blue-900 text-center'>{data.data[2].GP}</td>
            <td className='invisible md:visible text-blue-900 text-center'>{data.data[2].V}</td>
            <td className='invisible md:visible text-blue-900 text-center'>{data.data[2].N}</td>
            <td className='invisible md:visible text-blue-900 text-center'>{data.data[2].L}</td>
            <td className='invisible md:visible text-blue-900 text-center'>{data.data[2].DP}</td>
            <td className='invisible md:visible text-blue-900 text-center'>{data.data[2].B}</td>
            <td className='text-blue-900 text-center'>0</td>
          </tr>
          <tr className='border-t border-slate-200 h6-lato-d'>
            <td>
              <div className=' py-3.5 pl-5 rounded flex md:pl-20'>
                <Image src={country4?.flag || '/placeholder-image.png'} alt='Flag' width={'28'} height={'28'} className={'mr-4'}/>
                <span className='text-blue-900 '>{country4?.value}</span>
              </div>
            </td>
            <td className='invisible md:visible text-blue-900 text-center'>{data.data[3].GP}</td>
            <td className='invisible md:visible text-blue-900 text-center'>{data.data[3].V}</td>
            <td className='invisible md:visible text-blue-900 text-center'>{data.data[3].N}</td>
            <td className='invisible md:visible text-blue-900 text-center'>{data.data[3].L}</td>
            <td className='invisible md:visible text-blue-900 text-center'>{data.data[3].DP}</td>
            <td className='invisible md:visible text-blue-900 text-center'>{data.data[3].B}</td>
            <td className='text-blue-900 text-center'>0</td>
          </tr>
          <tr className='border-t border-slate-200 h6-lato-d'>
            <td>
              <div className=' py-3.5 pl-5 rounded flex md:pl-20'>
                <Image src={country5?.flag || '/placeholder-image.png'} alt='Flag' width={'28'} height={'28'} className={'mr-4'}/>
                <span className='text-blue-900 '>{country5?.value}</span>
              </div>
            </td>
            <td className='invisible md:visible text-blue-900 text-center'>{data.data[4].GP}</td>
            <td className='invisible md:visible text-blue-900 text-center'>{data.data[4].V}</td>
            <td className='invisible md:visible text-blue-900 text-center'>{data.data[4].N}</td>
            <td className='invisible md:visible text-blue-900 text-center'>{data.data[4].L}</td>
            <td className='invisible md:visible text-blue-900 text-center'>{data.data[4].DP}</td>
            <td className='invisible md:visible text-blue-900 text-center'>{data.data[4].B}</td>
            <td className='text-blue-900 text-center'>0</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
export default Pool
