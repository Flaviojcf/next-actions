'use client'

import * as zod from 'zod'
import { FormProvider, useForm } from 'react-hook-form'
import { ErrorMessage } from '@hookform/error-message'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
} from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

const FormValidationSchema = zod.object({
  email: zod.string().email({ message: 'Campo obrigatório' }),
})

type NewEmailUserFormData = zod.infer<typeof FormValidationSchema>

export function AuthForm() {
  const newEmailUserFormData = useForm<NewEmailUserFormData>({
    resolver: zodResolver(FormValidationSchema),
  })

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = newEmailUserFormData

  function handleSendEmailUser(data: NewEmailUserFormData) {
    console.log(data)
    reset()
  }

  return (
    <FormProvider {...newEmailUserFormData}>
      <Card className="mx-auto max-w-sm">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleSubmit(handleSendEmailUser)}
            className="space-y-4"
          >
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                placeholder="teste@example.com"
                type="email"
                {...register('email')}
              />
              <div className="text-sm text-red-400">
                <ErrorMessage errors={errors} name="email" />
              </div>
            </div>
            <Button className="w-full">Send magic link</Button>
          </form>
        </CardContent>
      </Card>
    </FormProvider>
  )
}
