import { auth } from '@/services/auth'
import { SettingsProfileForm } from './_components/settings-profile-form'

export default async function Page() {
  const session = await auth()

  return <SettingsProfileForm defaultValues={session?.user} />
}
