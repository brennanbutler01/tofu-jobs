import { Companies } from '@/components'
import { Container, Stack, Title } from '@mantine/core'
import LayoutWithProviders from '@/components/layout/layoutWithProviders'

const CompaniesPage = () => {
  return (
    <LayoutWithProviders>
      <Container p={'lg'}>
        <Stack>
          <Title>Your companies</Title>
          <Companies.Table />
        </Stack>
      </Container>
    </LayoutWithProviders>
  )
}

export default CompaniesPage
