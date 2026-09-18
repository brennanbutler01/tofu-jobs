import { MantineProvider } from '@mantine/core'
import { ModalsProvider } from '@mantine/modals'
import { NavigationProgress } from '@mantine/nprogress'
import { Notifications } from '@mantine/notifications'
import { Layout } from '@/components'
import theme from '@/theme'
import React from 'react'

interface Props {
  children: React.ReactNode
}

const LayoutWithProviders = ({ children }: Props) => {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS theme={theme}>
      <ModalsProvider>
        <NavigationProgress />
        <Notifications />
        <Layout>{children}</Layout>
      </ModalsProvider>
    </MantineProvider>
  )
}

export default LayoutWithProviders
