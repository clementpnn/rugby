import Container from '@/components/containers/container'
import Button from '@/components/buttons/button'

export default async function Home() {
  return (
    <Container>
      <Button variant='primary' size='sm'>Salut</Button>
    </Container>
  )
}