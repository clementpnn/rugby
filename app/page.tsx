import Container from '@/components/containers/container'
import Button from '@/components/buttons/button'



export default async function Home() {
  // eslint-disable-next-line no-unused-vars
  // const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const hey = ()=>{
    console.log("hey")
  }
  return (
    <Container>
      <Button variant='primary' size='sm' onClick={hey}>Salut</Button>
    </Container>
  )
}