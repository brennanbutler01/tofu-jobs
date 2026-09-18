import { isLocalDemo, isVisitorDemo } from '@/useAppAuth'
import { AppState, Auth0Provider } from '@auth0/auth0-react'
import { useNavigate } from 'react-router-dom'
import React from 'react'

interface Props {
  children: React.ReactNode
}

const Auth0ProviderWithNavigate = ({ children }: Props) => {
  const navigate = useNavigate()

  const domain = import.meta.env.VITE_AUTH0_DOMAIN
  const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID
  const redirectUri = import.meta.env.VITE_AUTH0_CALLBACK_URL

  const onRedirectCallback = (appState?: AppState) => {
    navigate(appState?.returnTo || window.location.pathname)
  }

  if (isLocalDemo || isVisitorDemo) return <>{children}</>
  if (!(domain && clientId && redirectUri)) {
    return (
      <main>
        <h1>Configuration required</h1>
        <p>Configure Auth0 or run the local demo described in RECOVERY.md.</p>
      </main>
    )
  }

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: redirectUri,
        audience: import.meta.env.VITE_AUTH0_API,
      }}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  )
}
export default Auth0ProviderWithNavigate
