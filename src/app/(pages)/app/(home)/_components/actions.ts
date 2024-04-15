'use server'

import { deleteTodoSchema, upsertTodoSchema } from './../schema'
import * as zod from 'zod'
import { auth } from '@/services/auth'
import { prisma } from '@/services/database'

export async function getUserTodos() {
  const session = await auth()
  const todos = await prisma.todo.findMany({
    where: { userId: session?.user?.id },
    orderBy: {
      createdAt: 'asc',
    },
  })
  return todos
}

export async function upsertTodo(input: zod.infer<typeof upsertTodoSchema>) {
  const session = await auth()

  if (!session?.user?.id) {
    return {
      error: 'Não autorizado',
      data: null,
    }
  }

  if (input.id) {
    const todo = await prisma.todo.findUnique({
      where: {
        id: input.id,
        userId: session?.user?.id,
      },
      select: {
        id: true,
      },
    })

    if (!todo) {
      return {
        error: 'Não encontrado',
        data: null,
      }
    }

    const updatedTodo = await prisma.todo.update({
      where: {
        id: input.id,
        userId: session?.user?.id,
      },
      data: {
        title: input.title,
        doneAt: input.doneAt,
      },
    })

    return {
      error: null,
      data: updatedTodo,
    }
  }

  if (!input.title) {
    return {
      error: 'O título é obrigatório',
      data: null,
    }
  }

  const todo = await prisma.todo.create({
    data: {
      title: input.title,
      userId: session?.user?.id,
    },
  })

  return todo
}

export async function deleteTodo(input: zod.infer<typeof deleteTodoSchema>) {
  const session = await auth()

  if (!session?.user?.id) {
    return {
      error: 'Não autorizado',
      data: null,
    }
  }

  const todo = await prisma.todo.findUnique({
    where: {
      id: input.id,
      userId: session?.user?.id,
    },
    select: {
      id: true,
    },
  })

  if (!todo) {
    return {
      error: 'Não encontrado',
      data: null,
    }
  }

  await prisma.todo.delete({
    where: {
      id: input.id,
      userId: session?.user?.id,
    },
  })

  return {
    error: null,
    data: 'Tarefa deletada com successo',
  }
}
