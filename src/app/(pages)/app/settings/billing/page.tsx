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

export default function Page() {
  return (
    <Card>
      <CardHeader className="border-b border-border">
        <CardTitle>Plano Atual</CardTitle>
        <CardDescription>
          Você está atualmente no [current_pan]. Ciclo de faturamento atual
          [next_due_date]
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-2">
          <header className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">1/5</span>
            <span className="text-sm text-muted-foreground">20%</span>
          </header>
          <main>
            <Progress value={20} />
          </main>
        </div>
      </CardContent>
      <CardFooter className="border-boder flex items-center justify-between border-t pt-6">
        <span>Para um maior limite, assine o PRO</span>
        <Button>Assinar o PRO</Button>
      </CardFooter>
    </Card>
  )
}
