'use client'

import * as zod from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { useRef } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Todo } from '../types'
import { upsertTodoSchema } from '../schema'
import { upsertTodo } from './actions'
import { useRouter } from 'next/navigation'
import { toast } from '@/components/ui/use-toast'

type TodoUpsertSheetProps = {
  children?: React.ReactNode
  defaultValue?: Todo
}

export function TodoUpsertSheet({ children }: TodoUpsertSheetProps) {
  type NewTodoFormData = zod.infer<typeof upsertTodoSchema>
  const router = useRouter()

  const newTodoFormData = useForm<NewTodoFormData>({
    resolver: zodResolver(upsertTodoSchema),
  })

  const { handleSubmit, register, reset, watch } = newTodoFormData

  const ref = useRef<HTMLDivElement>()

  async function handleSendTodo(data: NewTodoFormData) {
    await upsertTodo(data)
    reset()
    router.refresh()
    ref.current?.click()

    toast({
      title: 'Sucesso',
      description: 'Sua tarefa foi criada com sucesso',
    })
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <div>{children}</div>
      </SheetTrigger>
      <SheetContent>
        <FormProvider {...newTodoFormData}>
          <form
            id="upsertTodo"
            onSubmit={handleSubmit(handleSendTodo)}
            className=" space-y-8"
          >
            <SheetHeader>
              <SheetTitle>Crie uma nova tarefa</SheetTitle>
              <SheetDescription>
                Adicione uma nova tarefa aqui. Depois clique para salvar.
              </SheetDescription>
            </SheetHeader>

            <FormField
              name="title"
              render={() => (
                <FormItem>
                  <FormLabel>Título da tarefa</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Digite o título da tarefa"
                      {...register('title')}
                    />
                  </FormControl>
                  <FormDescription>
                    Este será o título da tarefa a ser exibida
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <SheetFooter className="mt-auto">
              <Button
                type="submit"
                form="upsertTodo"
                disabled={!watch('title')}
              >
                Salvar
              </Button>
            </SheetFooter>
          </form>
        </FormProvider>
      </SheetContent>
    </Sheet>
  )
}
