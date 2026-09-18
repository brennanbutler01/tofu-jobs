import { Alert, AppShell, LoadingOverlay, useMantineTheme } from '@mantine/core'
import React from 'react'
import { useDisclosure } from '@mantine/hooks'
import { isVisitorDemo } from '@/useAppAuth'
import Footer from '@/components/layout/footer'
import Header from '@/components/layout/header'
import { Navbar } from '@/components'
import { useAppAuth as useAuth0 } from '@/useAppAuth'

interface Props {
  children: React.ReactNode
}

const Shell = ({ children }: Props) => {
  const theme = useMantineTheme()
  const [opened, { toggle }] = useDisclosure(false)
  const { isLoading } = useAuth0()

  return (
    <AppShell
      styles={{
        main: {
          background:
            theme.colorScheme === 'dark'
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      }}
      navbarOffsetBreakpoint='sm'
      navbar={<Navbar opened={opened} />}
      footer={<Footer />}
      header={<Header opened={opened} onToggle={toggle} />}
    >
      <LoadingOverlay visible={isLoading}>Getting authorization</LoadingOverlay>
      {isVisitorDemo && (
        <Alert title='Portfolio demo' mb='md'>
          Invented records only. Your private session saves changes for one
          hour. Reset deletes your records. File uploads are unavailable in this
          demo.
        </Alert>
      )}
      {children}
    </AppShell>
  )
}
export default Shell
