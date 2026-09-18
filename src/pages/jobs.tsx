import { useState } from 'react'
import { DragDropContext, DropResult } from '@hello-pangea/dnd'
import { Alert, Group, LoadingOverlay, Stack, Text, Title } from '@mantine/core'
import { Kanban } from '@/components'
import { useJobListSWR } from '@/services/jobLists'
import { useJobSWR } from '@/services/jobs'
import { Jobs } from '@/services'
import { useAppAuth as useAuth0 } from '@/useAppAuth'
import { useSWRConfig } from 'swr'
import CreateButton from '@/components/createButton'
import JobListForm from '@/components/jobLists/form'
import LayoutWithProviders from '@/components/layout/layoutWithProviders'

const JobsPage = () => {
  const { jobLists, isLoading, isError: listError } = useJobListSWR()
  const { jobs, isLoading: loadingJobs, isError: jobsError } = useJobSWR()
  const { getAccessTokenSilently } = useAuth0()
  const { mutate } = useSWRConfig()
  const [loading, setLoading] = useState(false)

  const [moveError, setMoveError] = useState<string>()
  const columns = (jobLists || []).map(list => ({
    ...list,
    jobs: (jobs || []).filter(job => job.jobListId === list.id),
  }))

  const onDragEnd = async ({
    source,
    destination,
    draggableId,
  }: DropResult) => {
    if (
      loading ||
      !destination ||
      source.droppableId === destination.droppableId
    )
      return
    const job = jobs?.find(job => String(job.id) === draggableId)
    if (!job) return
    setLoading(true)
    setMoveError(undefined)
    try {
      await Jobs.update(
        { ...job, jobListId: Number(destination.droppableId) },
        await getAccessTokenSilently()
      )
      await mutate(() => true)
    } catch (error) {
      setMoveError(
        error instanceof Error
          ? error.message
          : 'Unable to move the job. Please retry.'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <LayoutWithProviders>
      <Stack>
        <Group>
          <Title>Your Jobs</Title>
          <CreateButton
            model={'Job List'}
            drawerChildren={<JobListForm />}
            form={'jobList-form'}
          />
        </Group>
        <Text size={'sm'} c={'dimmed'}>
          Create lists for your application stages, then drag jobs between them.
          Jobs within a list stay in creation order.
        </Text>
        {moveError || listError || jobsError ? (
          <Alert color='red' role='alert'>
            {moveError || 'Unable to load your jobs. Please refresh to retry.'}
          </Alert>
        ) : null}
        {!isLoading && !jobLists?.length ? (
          <Text>Create your first job list to start your board.</Text>
        ) : null}
        <div style={{ display: 'flex', minWidth: 0, position: 'relative' }}>
          <DragDropContext onDragEnd={onDragEnd}>
            <LoadingOverlay visible={loadingJobs || isLoading || loading} />
            <Kanban.Grid columns={columns} />
          </DragDropContext>
        </div>
      </Stack>
    </LayoutWithProviders>
  )
}
export default JobsPage
