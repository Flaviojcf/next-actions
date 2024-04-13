import { UserInfo } from './_components/user-info'
import { auth } from '@/services/auth'
export default async function Page() {
  const session = await auth()
  return (
    <main className="flex h-screen items-center justify-center">
      <UserInfo user={session?.user} />
    </main>
  )
}
