import getCurrentUser from '@/actions/getCurrentUser'
import LoginForm from "@/components/forms/LoginForm";
import Pool from "@/components/Pool/Pool";

export default async function Home() {
  const currentUser = await getCurrentUser()
  return (
    <>
    </>
  )
}