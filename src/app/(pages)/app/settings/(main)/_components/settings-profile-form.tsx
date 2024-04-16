'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { FormProvider, useForm } from 'react-hook-form'
import * as zod from 'zod'
import { updateProfileSchema } from '../schema'
import { toast } from '@/components/ui/use-toast'
import { updateProfile } from '../actions'
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form'
import { SheetFooter } from '@/components/ui/sheet'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Session } from 'next-auth'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

type SettingsProfileFormProps = {
  defaultValues: Session['user']
}

export function SettingsProfileForm({
  defaultValues,
}: SettingsProfileFormProps) {
  type UpdateProfileForm = zod.infer<typeof updateProfileSchema>
  const router = useRouter()

  const updateProfileForm = useForm<UpdateProfileForm>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      name: defaultValues?.name ?? '',
      email: defaultValues?.email ?? '',
    },
  })

  const {
    handleSubmit,
    register,
    reset,
    formState: { isSubmitting },
  } = updateProfileForm

  async function handleUpdateProfile(data: UpdateProfileForm) {
    await updateProfile(data)
    router.refresh()

    toast({
      title: 'Sucesso',
      description: 'O nome de usuário foi alterado com sucesso',
    })
  }
  return (
    <FormProvider {...updateProfileForm}>
      <form
        id="updateUser"
        onSubmit={handleSubmit(handleUpdateProfile)}
        className="space-y-8"
      >
        <Card>
          <CardHeader>
            <CardTitle>Nome</CardTitle>
            <CardDescription>Digite seu nome aqui</CardDescription>
          </CardHeader>
          <CardContent>
            <FormField
              name="name"
              render={() => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Informe o nome desejado"
                      {...register('name')}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Email</CardTitle>
            <CardDescription>
              Entre em contato com o suporte caso deseje alterar o email
              cadastrado.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FormField
              name="name"
              render={() => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      className="cursor-not-allowed text-black read-only:bg-gray-200"
                      {...register('email')}
                      readOnly
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <SheetFooter className="mt-auto">
          <Button type="submit" form="updateUser" disabled={isSubmitting}>
            {isSubmitting ? 'Salvando...' : 'Salvar'}
          </Button>
        </SheetFooter>
      </form>
    </FormProvider>
  )
}
