import { useAppAuth as useAuth0 } from '@/useAppAuth'
import { Button } from '@mantine/core'

const Login = () => {
  const { loginWithRedirect } = useAuth0()

  return (
    <Button
      variant={'light'}
      onClick={() => loginWithRedirect({ appState: { returnTo: '/' } })}
    >
      Log In
    </Button>
  )
}

export default Login
