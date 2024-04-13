import {
  DashBoardPage,
  DashBoardPageHeader,
  DashBoardPageHeaderTitle,
  DashBoardPageMain,
} from '@/components/dashboard/page'

export default function Page() {
  return (
    <DashBoardPage>
      <DashBoardPageHeader>
        <DashBoardPageHeaderTitle>Configurações</DashBoardPageHeaderTitle>
      </DashBoardPageHeader>
      <DashBoardPageMain>
        <h1>Configurações</h1>
      </DashBoardPageMain>
    </DashBoardPage>
  )
}
