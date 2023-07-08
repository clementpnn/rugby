import Container from '@/components/containers/container'
import {Button} from '@/components/ui/button'
// import { useState } from 'react';


export default async function Home() {
  // eslint-disable-next-line no-unused-vars
  // const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  return (
    // <div className='bg-neutral0 h-screen'>
    //    <Button variant='link' size='sm'>Salut</Button>
    //    {/* <Button variant='link' size='sm' disabled={isButtonDisabled}>Salut</Button> */}

    // </div>
    <Container>
      <Button variant='disabled' size='sm'>Salut</Button>
    </Container>
  )
}