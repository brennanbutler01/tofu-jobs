import { useAppAuth, isVisitorDemo } from '@/useAppAuth'
import { Button } from '@mantine/core'
import { notifications } from '@mantine/notifications'
import { useState } from 'react'

const Logout = () => {
  const { logout } = useAppAuth()
  const [loading, setLoading] = useState(false)
  return (
    <Button
      loading={loading}
      onClick={async () => {
        setLoading(true)
        try {
          await logout({ logoutParams: { returnTo: window.location.origin } })
        } catch (error) {
          notifications.show({
            title: 'Could not reset the demo',
            message:
              error instanceof Error ? error.message : 'Please try again.',
            color: 'red',
          })
        } finally {
          setLoading(false)
        }
      }}
    >
      {isVisitorDemo ? 'Reset demo' : 'Log Out'}
    </Button>
  )
}
export default Logout
