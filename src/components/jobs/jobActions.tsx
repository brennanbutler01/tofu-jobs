import { ActionIcon, Group, LoadingOverlay } from '@mantine/core'
import {
  IconCheck,
  IconEdit,
  IconExclamationCircle,
  IconLoader,
  IconTrash,
} from '@tabler/icons-react'
import { Job } from '@/models'
import deleteModal from '@/components/deleteModal'
import { useState } from 'react'
import { useSWRConfig } from 'swr'
import { Jobs } from '@/services'
import { useAppAuth as useAuth0 } from '@/useAppAuth'
import useCrudNotification from '@/useCrudNotification'
import FormDrawer from '@/components/formDrawer'
import { useDisclosure } from '@mantine/hooks'
import JobForm from '@/components/jobs/form'

interface Props {
  job: Job
}
const JobActions = ({ job }: Props) => {
  const [loading, setLoading] = useState(false)
  const { mutate } = useSWRConfig()
  const { getAccessTokenSilently } = useAuth0()
  const showDeleteNotification = useCrudNotification({
    id: 'delete-job',
    loading: {
      icon: <IconLoader />,
      title: 'Deleting your job',
      message: 'This should just take a few moments...',
    },
    success: {
      icon: <IconCheck />,
      title: 'Job was deleted',
      message: 'Notification will close in 2 seconds or you can close it now.',
    },
    error: {
      icon: <IconExclamationCircle />,
      title: 'Error deleting job',
      message: 'Try again',
    },
  })
  const [opened, { toggle }] = useDisclosure()
  return (
    <Group>
      <LoadingOverlay visible={loading} />
      <ActionIcon
        aria-label={'Delete job'}
        onClick={() =>
          deleteModal({
            model: 'Job',
            handleDelete: async () => {
              await showDeleteNotification({
                crudOperation: async () => {
                  setLoading(true)
                  try {
                    await Jobs.remove(job.id, await getAccessTokenSilently())
                    await mutate(() => true)
                  } finally {
                    setLoading(false)
                  }
                },
              })
            },
          })
        }
      >
        <IconTrash />
      </ActionIcon>
      <ActionIcon aria-label={'Edit Job'} onClick={toggle}>
        <IconEdit />
      </ActionIcon>
      <FormDrawer
        editing
        opened={opened}
        onClose={toggle}
        model={'Job'}
        form='job-form'
      >
        <JobForm editingRecord={job} />
      </FormDrawer>
    </Group>
  )
}
export default JobActions
