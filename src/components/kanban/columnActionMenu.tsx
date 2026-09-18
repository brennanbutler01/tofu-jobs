import { ActionIcon, Menu } from '@mantine/core'
import {
  IconCheck,
  IconDots,
  IconExclamationCircle,
  IconLoader,
} from '@tabler/icons-react'
import deleteModal from '@/components/deleteModal'
import { useAppAuth as useAuth0 } from '@/useAppAuth'
import { JobList } from '@/models/jobList'
import { useSWRConfig } from 'swr'
import useCrudNotification from '@/useCrudNotification'
import { JobLists } from '@/services'
import { DeleteException } from '@/exceptions/delete-exception'

interface Props {
  toggle: () => void
  jobList: JobList
}

const ColumnActionMenu = ({ jobList, toggle }: Props) => {
  const { getAccessTokenSilently } = useAuth0()
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
  return (
    <Menu shadow={'sm'}>
      <Menu.Target>
        <ActionIcon variant={'light'} aria-label={'Job List actions '}>
          <IconDots />
        </ActionIcon>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Label>Job List Actions</Menu.Label>
        <Menu.Item onClick={toggle}>Edit List Title</Menu.Item>
        <Menu.Item
          onClick={() =>
            deleteModal({
              model: 'Job List',
              handleDelete: async () =>
                await showNotification({
                  crudOperation: async () => {
                    await JobLists.remove(
                      jobList.id,
                      await getAccessTokenSilently()
                    ).then(res => {
                      if ('status' in res) {
                        throw new DeleteException(res)
                      }
                    })
                    await mutate(() => true)
                  },
                }),
            })
          }
        >
          Delete List
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  )
}
export default ColumnActionMenu
