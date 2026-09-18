import {
  createStyles,
  Navbar as MantineNavbar,
  NavLink,
  rem,
} from '@mantine/core'
import UserButton from '@/components/auth/userButton'
import { IconSelector } from '@tabler/icons-react'
import { useAppAuth as useAuth0 } from '@/useAppAuth'
import { links } from '@/links'
import { Link } from 'react-router-dom'

const styles = createStyles(theme => ({
  list: {
    listStyle: 'none',
    paddingLeft: 0,
  },
  link: {
    textDecoration: 'none',
    color: theme.colors.gray[9],
  },
  mainLink: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    fontSize: theme.fontSizes.xs,
    padding: `${rem(8)} ${theme.spacing.xs}`,
    borderRadius: theme.radius.sm,
    fontWeight: 500,
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[0]
        : theme.colors.gray[7],

    '&:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
      color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    },
  },

  mainLinkInner: {
    display: 'flex',
    alignItems: 'center',
    flex: 1,
  },

  mainLinkIcon: {
    marginRight: theme.spacing.sm,
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[2]
        : theme.colors.gray[6],
  },
  searchCode: {
    fontWeight: 700,
    fontSize: rem(10),
    backgroundColor:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[7]
        : theme.colors.gray[0],
    border: `${rem(1)} solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[2]
    }`,
  },
}))
const Navbar = ({ opened = false }: { opened?: boolean }) => {
  const { classes } = styles()
  const { user, isAuthenticated } = useAuth0()
  const routes = links.map(route => (
    <li key={route.id}>
      <NavLink
        icon={route.icon}
        component={'span'}
        // label={route.id}
        label={
          <Link to={route.path} className={classes.link}>
            {route.id}
          </Link>
        }
      />
    </li>
  ))
  return (
    <MantineNavbar
      p='md'
      hiddenBreakpoint='sm'
      hidden={!opened}
      width={{ sm: 200, md: 260 }}
    >
      {isAuthenticated && user ? (
        <>
          <MantineNavbar.Section>
            <UserButton
              image={user?.picture}
              name={user?.name}
              email={user?.email}
              icon={<IconSelector size='0.9rem' stroke={1.5} />}
            />
          </MantineNavbar.Section>
          <MantineNavbar.Section p={'md'}>
            <ul className={classes.list}>{routes}</ul>
          </MantineNavbar.Section>
        </>
      ) : null}
    </MantineNavbar>
  )
}
export default Navbar
