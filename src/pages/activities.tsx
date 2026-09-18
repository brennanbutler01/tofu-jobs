import LayoutWithProviders from '@/components/layout/layoutWithProviders'
import { Container, Stack, Text, Title } from '@mantine/core'
import CreateButton from '@/components/createButton'
import ActivityForm from '@/components/activities/form'
import RecordList from '@/components/recordList'
import { useActivitySWR, remove } from '@/services/activities'

const ActivitiesPage = () => {
  const { activities, isLoading, isError } = useActivitySWR()
  return (
    <LayoutWithProviders>
      <Container>
        <Stack>
          <Title>Your activities</Title>
          <CreateButton
            form='activity-form'
            model='Activity'
            drawerChildren={<ActivityForm />}
          />
          <RecordList
            records={activities}
            loading={isLoading}
            failed={isError}
            model='Activity'
            form='activity-form'
            remove={remove}
            editor={record => <ActivityForm editingRecord={record} />}
            details={record => (
              <>
                <Text>{record.note}</Text>
                <Text size='sm' color='dimmed'>
                  {record.isCompleted ? 'Completed' : 'To do'}
                </Text>
              </>
            )}
          />
        </Stack>
      </Container>
    </LayoutWithProviders>
  )
}
export default ActivitiesPage
