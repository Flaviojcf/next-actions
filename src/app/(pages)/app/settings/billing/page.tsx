import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { createCheckoutSessionAction } from './actions'
import { auth } from '@/services/auth'
import { getUserCurrentPlan } from '@/services/stripe'

export default async function Page() {
  const session = await auth()
  console.log(session?.user)
  const plan = await getUserCurrentPlan(session?.user?.id as string)

  return (
    <form action={createCheckoutSessionAction}>
      <Card>
        <CardHeader className="border-b border-border">
          <CardTitle>Plano Atual</CardTitle>
          <CardDescription>
            Você está atualmente no{' '}
            <span className="font-bold uppercase">{plan.name}</span>
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-2">
            <header className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                {plan.quota.TASKS.current}/{plan.quota.TASKS.available}
              </span>
              <span className="text-sm text-muted-foreground">
                {plan.quota.TASKS.usage}%
              </span>
            </header>
            <main>
              <Progress value={plan.quota.TASKS.usage} />
            </main>
          </div>
        </CardContent>
        <CardFooter className="border-boder flex items-center justify-between border-t pt-6">
          <span>Para um maior limite, assine o PRO</span>
          <Button type="submit">Assinar por R$5/ mês</Button>
        </CardFooter>
      </Card>
    </form>
  )
}
