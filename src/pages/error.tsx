import { useRouteError } from 'react-router-dom'
import LayoutWithProviders from '@/components/layout/layoutWithProviders'

type RouteError = { statusText?: string; message?: string }
const ErrorPage = () => {
  const error = useRouteError() as RouteError
  console.error(error)

  return (
    <LayoutWithProviders>
      <div id='error-page'>
        <h1>Oops!</h1>
        <p>Sorry, an unexpected error has occurred.</p>
        <p>
          <i>{error?.statusText || error?.message}</i>
        </p>
      </div>
    </LayoutWithProviders>
  )
}
export default ErrorPage
