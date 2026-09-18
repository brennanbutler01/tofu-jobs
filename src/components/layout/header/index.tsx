import {
  Burger,
  createStyles,
  Header as MantineHeader,
  MediaQuery,
  Text,
} from '@mantine/core'
import { useAppAuth as useAuth0 } from '@/useAppAuth'
import { Login, Logout } from '@/components'

const styles = createStyles(() => ({
  root: {
    alignItems: 'center',
    display: 'flex',
    height: '100%',
    justifyContent: 'space-between',
  },
}))

const Header = ({
  opened = false,
  onToggle,
}: {
  opened?: boolean
  onToggle?: () => void
}) => {
  const { isAuthenticated } = useAuth0()
  const { classes } = styles()
  return (
    <MantineHeader height={{ base: 50, md: 70 }} p='md'>
      <div className={classes.root}>
        <MediaQuery largerThan='sm' styles={{ display: 'none' }}>
          <Burger
            aria-label='Toggle navigation'
            opened={opened}
            onClick={onToggle}
            size='sm'
            mr='xl'
          />
        </MediaQuery>

        <Text>Tofu-Jobs</Text>
        {isAuthenticated ? <Logout /> : <Login />}
      </div>
    </MantineHeader>
  )
}
export default Header
