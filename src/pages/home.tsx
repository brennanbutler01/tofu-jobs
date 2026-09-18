import LayoutWithProviders from '@/components/layout/layoutWithProviders'
import { Button, Card, Group, Stack, Text, Title } from '@mantine/core'
import { Link } from 'react-router-dom'

export default function HomePage() {
  return <LayoutWithProviders><Stack maw={720} spacing="xl">
    <Stack spacing="sm"><Title>Keep your job search in one place</Title>
      <Text size="lg" color="dimmed">Track the companies you are talking to, follow each application, and keep the next step close at hand.</Text></Stack>
    <Group><Button component={Link} to="/companies">Start with a company</Button><Button component={Link} to="/jobs" variant="light">Open your job board</Button></Group>
    <Card withBorder p="lg"><Stack spacing="sm"><Title order={2} size="h3">Try a complete application workflow</Title>
      <Text>Add a sample company, create a list on your board, and add a job. Schedule an interview, record a follow-up activity, or save a cover-letter link.</Text>
      <Text color="dimmed">The portfolio demo saves invented records for one hour. Each visitor has a separate session, and Reset demo deletes everything in yours.</Text>
    </Stack></Card>
  </Stack></LayoutWithProviders>
}
