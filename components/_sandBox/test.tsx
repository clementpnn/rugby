// eslint-disable-next-line check-file/folder-naming-convention
'use client'
// import Button from "@/components/buttons/button"
// import {Input} from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
import Input from '@/components/inputs/input'

const Test = () => {
  return (
    <div>
      {/* <Button variant="primary" size="sm" onClick={()=>console.log('yo')
      }>
        Salut
      </Button> */}
      <Input id="hey" placeholder="Salut" label="Salut" />
      {/* <Input id="Salut" placeholder="Hey" size="lg" type="password"></Input>
      <Label htmlFor="Salut" >Salut</Label> */}
    </div>
  )
}

export default Test
