import { getVisitorToken, resetVisitorSession } from '@/visitorSession'
import { useAuth0 } from '@auth0/auth0-react'

export const isVisitorDemo = import.meta.env.VITE_VISITOR_DEMO === 'true'
export const isLocalDemo =
  import.meta.env.DEV &&
  import.meta.env.VITE_DEMO_MODE === 'true' &&
  ['localhost', '127.0.0.1'].includes(window.location.hostname)
const demoUser =
  new URLSearchParams(window.location.search).get('demoUser') === 'bob'
    ? 'bob'
    : 'alice'
let tokenRequest: Promise<string> | undefined
export function useAppAuth() {
  const auth = useAuth0()
  if (isVisitorDemo)
    return {
      isLoading: false,
      isAuthenticated: true,
      error: undefined,
      user: {
        picture: undefined,
        sub: undefined,
        email: 'demo@example.invalid',
        name: 'Demo applicant',
      },
      getAccessTokenSilently: getVisitorToken,
      loginWithRedirect: async (_options?: unknown) => {
        window.location.assign('/companies')
      },
      logout: async (_options?: unknown) => {
        await resetVisitorSession()
      },
    }
  if (!isLocalDemo) return auth
  return {
    isLoading: false,
    isAuthenticated: true,
    error: undefined,
    user: {
      picture: undefined,
      sub: `demo-${demoUser}`,
      email: `${demoUser}@example.invalid`,
      name: `Demo ${demoUser}`,
    },
    getAccessTokenSilently: async () => {
      if (!tokenRequest)
        tokenRequest = fetch(
          `${import.meta.env.VITE_BACKEND_API}/dev/token/${demoUser}`
        )
          .then(async response => {
            if (!response.ok)
              throw new Error('Start the local Tofu Jobs API first.')
            const body: unknown = await response.json()
            if (
              !body ||
              typeof body !== 'object' ||
              !('accessToken' in body) ||
              typeof body.accessToken !== 'string'
            )
              throw new Error('Invalid local token response')
            return body.accessToken
          })
          .catch(error => {
            tokenRequest = undefined
            throw error
          })
      return tokenRequest
    },
    loginWithRedirect: async (_options?: unknown) => {
      window.location.assign('/')
    },
    logout: (_options?: unknown) => {
      window.location.assign(
        `/?demoUser=${demoUser === 'alice' ? 'bob' : 'alice'}`
      )
    },
  }
}
