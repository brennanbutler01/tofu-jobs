import { isLocalDemo, isVisitorDemo } from '@/useAppAuth'
import { withAuthenticationRequired } from '@auth0/auth0-react'
import React from 'react'
import { LoadingOverlay } from '@mantine/core'

interface Props {
  component: React.ComponentType<object>
}

export const AuthGuard = ({ component }: Props) => {
  const Component =
    isLocalDemo || isVisitorDemo
      ? component
      : withAuthenticationRequired(component, {
          onRedirecting: () => (
            <div className='page-layout'>
              <LoadingOverlay visible />
            </div>
          ),
        })

  return <Component />
}
