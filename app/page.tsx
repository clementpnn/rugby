import Pool from '@/components/poule/Pool'

export default async function Home() {
  return (
    <div>
      <Pool pouleName='B' flag1='FRANCE' flag2='JAPAN' flag3='IRELAND' flag4='NEW_ZEALAND' flag5='AUSTRALIA'/>
    </div>
  )
}