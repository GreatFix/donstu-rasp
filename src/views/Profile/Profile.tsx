import bridge from '@vkontakte/vk-bridge'
//Components
import { ModalRoot, SplitCol, SplitLayout, View } from '@vkontakte/vkui'
import { ModalFilter } from 'components/ModalFilter'
//Hooks and helpers
import { useCallback, useEffect } from 'react'
import {
  MODAL_PROFILE_ENUM,
  PANEL_PROFILE_ENUM,
  useModalControl,
  usePanelControl,
} from 'shared/contexts/Navigation'
import { SearchGroupFiltresProvider } from 'shared/contexts/SearchGroupFiltres'

import {
  DisciplinesPanel,
  GroupsOfTeacherPanel,
  LKPanel,
  MainPanel,
  SearchClassroomPanel,
  SearchGroupPanel,
  SearchTeacherPanel,
  SettingsPanel,
  StatementsPanel,
  TeachersOfGroupPanel,
} from './panels'

interface IProfileProps {
  id: string
  redirectToSearch?: 'group' | 'teacher' | null
}

export const Profile = ({ id, redirectToSearch }: IProfileProps) => {
  const {
    activePanel,
    back: panelBack,
    forward: panelForward,
  } = usePanelControl<PANEL_PROFILE_ENUM>(PANEL_PROFILE_ENUM.MAIN)

  const {
    activeModal,
    forward: modalForward,
    close: modalClose,
  } = useModalControl<MODAL_PROFILE_ENUM>()

  const isMainPanel = activePanel === PANEL_PROFILE_ENUM.MAIN

  const openFilters = useCallback(() => {
    modalForward(MODAL_PROFILE_ENUM.FILTRES_OF_GROUP)
  }, [modalForward])

  const forwardToSearchGroup = () => {
    panelForward(PANEL_PROFILE_ENUM.SEARCH_GROUP)
  }

  const forwardToDisciplines = () => {
    panelForward(PANEL_PROFILE_ENUM.DISCIPLINES)
  }

  const forwardToGroups = () => {
    panelForward(PANEL_PROFILE_ENUM.GROUPS_OF_TEACHER)
  }

  const forwardToSearchTeacher = () => {
    panelForward(PANEL_PROFILE_ENUM.SEARCH_TEACHER)
  }

  const forwardToSearchClassroom = () => {
    panelForward(PANEL_PROFILE_ENUM.SEARCH_CLASSROOM)
  }

  const forwardToTeachers = () => {
    panelForward(PANEL_PROFILE_ENUM.TEACHERS_OF_GROUP)
  }

  const forwardToStatements = () => {
    panelForward(PANEL_PROFILE_ENUM.STATEMENTS)
  }

  const forwardToSettings = () => {
    panelForward(PANEL_PROFILE_ENUM.SETTINGS)
  }

  const backToMain = () => {
    panelForward(PANEL_PROFILE_ENUM.MAIN)
  }

  /** Включает закрытие приложения по свайпу на главной панели */
  useEffect(() => {
    bridge.send('VKWebAppSetSwipeSettings', { history: isMainPanel })
  }, [isMainPanel])

  return (
    <SearchGroupFiltresProvider>
      <SplitLayout
        modal={
          <ModalRoot activeModal={activeModal}>
            <ModalFilter id={MODAL_PROFILE_ENUM.FILTRES_OF_GROUP} onClose={modalClose} />
          </ModalRoot>
        }
      >
        <SplitCol>
          <View
            id={id}
            activePanel={activePanel}
            history={window.history.state}
            onSwipeBack={panelBack}
          >
            <MainPanel
              id={PANEL_PROFILE_ENUM.MAIN}
              forwardToSearchGroup={forwardToSearchGroup}
              forwardToDisciplines={forwardToDisciplines}
              forwardToGroups={forwardToGroups}
              forwardToSearchTeacher={forwardToSearchTeacher}
              forwardToTeachers={forwardToTeachers}
              forwardToStatements={forwardToStatements}
              forwardToSettings={forwardToSettings}
              forwardToSearchClassroom={forwardToSearchClassroom}
            />
            <SearchGroupPanel
              id={PANEL_PROFILE_ENUM.SEARCH_GROUP}
              backToMain={backToMain}
              onOpenFiltres={openFilters}
            />
            <SearchTeacherPanel id={PANEL_PROFILE_ENUM.SEARCH_TEACHER} backToMain={backToMain} />
            <SearchClassroomPanel
              id={PANEL_PROFILE_ENUM.SEARCH_CLASSROOM}
              backToMain={backToMain}
            />
            <DisciplinesPanel id={PANEL_PROFILE_ENUM.DISCIPLINES} backToMain={backToMain} />
            <GroupsOfTeacherPanel
              id={PANEL_PROFILE_ENUM.GROUPS_OF_TEACHER}
              backToMain={backToMain}
            />
            <TeachersOfGroupPanel
              id={PANEL_PROFILE_ENUM.TEACHERS_OF_GROUP}
              backToMain={backToMain}
            />
            <StatementsPanel id={PANEL_PROFILE_ENUM.STATEMENTS} backToMain={backToMain} />
            <LKPanel id={PANEL_PROFILE_ENUM.LK} backToMain={backToMain} />
            <SettingsPanel id={PANEL_PROFILE_ENUM.SETTINGS} backToMain={backToMain} />
          </View>
        </SplitCol>
      </SplitLayout>
    </SearchGroupFiltresProvider>
  )
}