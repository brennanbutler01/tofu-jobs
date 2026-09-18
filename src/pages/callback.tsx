import { useAppAuth as useAuth0 } from '@/useAppAuth'
import LayoutWithProviders from '@/components/layout/layoutWithProviders'

export const CallbackPage = () => {
  const { error } = useAuth0()

  if (error) {
    return (
      <LayoutWithProviders>
        <h1 id='page-title' className='content__title'>
          Error
        </h1>
        <div className='content__body'>
          <p id='page-description'>
            <span>{error.message}</span>
          </p>
        </div>
      </LayoutWithProviders>
    )
  }

  return <LayoutWithProviders>calling back</LayoutWithProviders>
}
