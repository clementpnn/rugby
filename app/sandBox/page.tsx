import Test from '@/components/_sandBox/test'
import Container from '@/components/containers/container'

// import dynamic from 'next/dynamic';

// const Button = dynamic(() => import('@/components/buttons/button'), { ssr: false });

const Page = () => {

  return (
    <div className="h-screen bg-red-200">
      <Container>
        <Test />
      </Container>
    </div>
  )
}

export default Page
