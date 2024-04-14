import { ReturnTypeWithoutPromise } from '@/types/return-type-without-promise'
import { getUserTodos } from './_components/actions'

export type Todo = ReturnTypeWithoutPromise<typeof getUserTodos>[0]
