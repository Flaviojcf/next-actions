import {
  DashBoardPage,
  DashBoardPageHeader,
  DashBoardPageHeaderNav,
  DashBoardPageHeaderTitle,
  DashBoardPageMain,
} from '@/components/dashboard/page'
import { TodoDatatable } from './_components/todo-data-table'
import { TodoUpsertSheet } from './_components/todo-upsert-sheet'
import { Button } from '@/components/ui/button'
import { PlusIcon } from '@radix-ui/react-icons'
import { getUserTodos } from './_components/actions'

export default async function Page() {
  const todos = await getUserTodos()
  console.log(todos)
  return (
    <DashBoardPage>
      <DashBoardPageHeader>
        <DashBoardPageHeaderTitle>Tarefas</DashBoardPageHeaderTitle>

        <DashBoardPageHeaderNav>
          <TodoUpsertSheet>
            <Button variant="outline" size="sm">
              <PlusIcon className="mr-3 h-4 w-4" />
              Add Todo
            </Button>
          </TodoUpsertSheet>
        </DashBoardPageHeaderNav>
      </DashBoardPageHeader>
      <DashBoardPageMain>
        <TodoDatatable data={todos} />
      </DashBoardPageMain>
    </DashBoardPage>
  )
}
