import * as zod from 'zod'

export const upsertTodoSchema = zod.object({
  id: zod.string().optional(),
  title: zod.string().optional(),
  doneAt: zod.date().optional().nullable(),
})

export const deleteTodoSchema = zod.object({
  id: zod.string().optional(),
})
