import { Route, Routes } from 'react-router-dom'
import { useAppAuth as useAuth0 } from '@/useAppAuth'
import {
  ActivitiesPage,
  CompaniesPage,
  ErrorPage,
  HomePage,
  InterviewsPage,
  JobsPage,
} from '@/pages'
import CoverLettersPage from '@/pages/coverLetters'
import { CallbackPage } from '@/pages/callback'
import { AuthGuard } from '@/components'
import LayoutWithProviders from '@/components/layout/layoutWithProviders'
import { RoutePaths } from '@/links'

const App = () => {
  const { isLoading } = useAuth0()

  if (isLoading) {
    return <LayoutWithProviders>loading</LayoutWithProviders>
  } else {
    return (
      <Routes>
        <Route path={RoutePaths.HOME} element={<HomePage />} />
        <Route
          path={RoutePaths.JOBS}
          element={<AuthGuard component={JobsPage} />}
        />
        <Route
          path={RoutePaths.COMPANIES}
          element={<AuthGuard component={CompaniesPage} />}
        />
        <Route
          path={RoutePaths.COVER_LETTERS}
          element={<AuthGuard component={CoverLettersPage} />}
        />
        <Route
          path={RoutePaths.INTERVIEWS}
          element={<AuthGuard component={InterviewsPage} />}
        />
        <Route
          path={RoutePaths.ACTIVITIES}
          element={<AuthGuard component={ActivitiesPage} />}
        />
        <Route path={RoutePaths.CALLBACK} element={<CallbackPage />} />
        <Route path={RoutePaths.WILDCARD} element={<ErrorPage />} />
      </Routes>
    )
  }
}
export default App
