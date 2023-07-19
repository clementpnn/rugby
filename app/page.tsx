import Pool from '@/components/pools/pool'
import { poulesData } from './table/poulelayout'
export default async function Home(){
  return(
    <div>
      <Pool data={poulesData[0]}/>
    </div>
  )}