import Pool from '@/components/pools/pool'
import { poulesData } from './poolayout'

export default async function PoolPage() {
  return(
    <Pool data={poulesData[0]}/>
  )
}