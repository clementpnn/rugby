import Knockout from '@/components/knockouts/knockout'
import { TeamsData } from './knockoutslayout'

export default async function KnochoutPage() {
  return(
    <Knockout data={TeamsData[0]}/>
  )
}