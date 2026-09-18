import { ActionIcon, Group } from '@mantine/core'
import {
  IconCheck,
  IconExclamationCircle,
  IconLoader,
  IconX,
} from '@tabler/icons-react'
import { useJobSWR } from '@/services/jobs'
import { useSWRConfig } from 'swr'
import useCrudNotification from '@/useCrudNotification'
import { JobList } from '@/models/jobList'
import { JobLists } from '@/services'
import { useAppAuth as useAuth0 } from '@/useAppAuth'

interface Props {
  toggle: () => void
  jobList: JobList
  title: string
  setTitle: (val: string) => void
}

const EditColumnActions = ({ toggle, jobList, title, setTitle }: Props) => {
  const { jobs } = useJobSWR()
  const { mutate } = useSWRConfig()
  const showNotification = useCrudNotification({
    id: 'edit-job-list',
    loading: {
      icon: <IconLoader />,
      title: 'Updating your job list',
      message: 'This should just take a few moments...',
    },
    success: {
      icon: <IconCheck />,
      title: 'Job List was updated',
      message: 'Notification will close in 2 seconds or you can close it now.',
    },
    error: {
      icon: <IconExclamationCircle />,
      title: 'Error updating job list',
      message: 'Try again',
    },
  })
  const { getAccessTokenSilently } = useAuth0()

  return (
    <Group>
      <ActionIcon
        color={'teal'}
        variant={'light'}
        onClick={async () => {
          await showNotification({
            crudOperation: async () =>
              await JobLists.update(
                {
                  ...jobList,
                  jobs: (jobs || []).filter(
                    job => job.jobListId === jobList.id
                  ),
                  title,
                },
                await getAccessTokenSilently()
              ),
          })
          await mutate(() => true)
          toggle()
        }}
        aria-label={'Confirm editing'}
      >
        <IconCheck />
      </ActionIcon>
      <ActionIcon
        color={'red'}
        variant={'light'}
        onClick={() => {
          setTitle(jobList.title)
          toggle()
        }}
        aria-label={'Cancel editing'}
      >
        <IconX />
      </ActionIcon>
    </Group>
  )
}
export default EditColumnActions
