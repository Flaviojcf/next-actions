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

type TodoUpsertSheetProps = {
  children?: React.ReactNode
  defaultValue?: Todo
}

export function TodoUpsertSheet({ children }: TodoUpsertSheetProps) {
  type NewTodoFormData = zod.infer<typeof upsertTodoSchema>

  const newTodoFormData = useForm<NewTodoFormData>({
    resolver: zodResolver(upsertTodoSchema),
  })

  const { handleSubmit, register, reset } = newTodoFormData

  const ref = useRef<HTMLDivElement>()

  async function handleSendTodo(data: NewTodoFormData) {
    if (!data.title) return
    console.log(data)
    reset()
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
              <SheetTitle>Upsert Todo</SheetTitle>
              <SheetDescription>
                Add or edit your todo item here. Click save when you re done.
              </SheetDescription>
            </SheetHeader>

            <FormField
              name="title"
              render={() => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your todo title"
                      {...register('title')}
                    />
                  </FormControl>
                  <FormDescription>
                    This will be the publicly displayed name for the task.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <SheetFooter className="mt-auto">
              <Button type="submit" form="upsertTodo">
                Save changes
              </Button>
            </SheetFooter>
          </form>
        </FormProvider>
      </SheetContent>
    </Sheet>
  )
}
