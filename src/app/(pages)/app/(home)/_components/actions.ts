import { upsertTodoSchema } from './../schema'
import * as zod from 'zod'
import { auth } from '@/services/auth'
import { prisma } from '@/services/database'

export async function getUserTodos() {
  const session = await auth()
  const todos = await prisma.todo.findMany({
    where: { userId: session?.user?.id },
  })
  return todos
}

export async function upsertTodo(input: zod.infer<typeof upsertTodoSchema>) {
  const session = await auth()
}
