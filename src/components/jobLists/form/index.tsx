import { EditableFormProps } from '@/types'
import { Grid, LoadingOverlay, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { useAppAuth as useAuth0 } from '@/useAppAuth'
import { useState } from 'react'
import {
  IconCheck,
  IconExclamationCircle,
  IconLoader,
} from '@tabler/icons-react'
import { JobLists } from '@/services'
import { useSWRConfig } from 'swr'
import useCrudNotification from '@/useCrudNotification'
import { JobList, PostJobList } from '@/models/jobList'
import { closeDrawer } from '@/close-drawer'

const JobListForm = ({ editingRecord }: EditableFormProps<JobList>) => {
  const { getAccessTokenSilently } = useAuth0()

  const [loading, setLoading] = useState(false)
  const { mutate } = useSWRConfig()
  const showNotification = useCrudNotification({
    id: 'post-job',
    loading: {
      icon: <IconLoader />,
      title: `${editingRecord ? 'Updating' : 'Creating'} your job list`,
      message: 'This should just take a few moments...',
    },
    success: {
      icon: <IconCheck />,
      title: `Job list was ${editingRecord ? 'updated' : 'created'}`,
      message: 'Notification will close in 2 seconds or you can close it now.',
    },
    error: {
      icon: <IconExclamationCircle />,
      title: `Error ${editingRecord ? 'updating' : 'creating'} job list`,
      message: 'Try again',
    },
  })

  const form = useForm<JobList | PostJobList>({
    initialValues: editingRecord
      ? { ...editingRecord }
      : {
          title: '',
          jobs: [],
          id: undefined,
          isUserCreated: true,
          defaultJobLists: undefined,
        },
  })

  return (
    <form
      id={'jobList-form'}
      name={'jobList-form'}
      onSubmit={form.onSubmit(async values => {
        setLoading(true)
        const saved = await showNotification({
          crudOperation: async () =>
            editingRecord
              ? JobLists.update(
                  { ...editingRecord, ...values },
                  await getAccessTokenSilently()
                )
              : JobLists.create(values, await getAccessTokenSilently()),
        })
        if (!saved) {
          setLoading(false)
          return
        }
        await mutate(() => true)
        setLoading(false)
        closeDrawer()
        form.reset()
      })}
    >
      <Grid p={'sm'} gutter={'lg'}>
        <LoadingOverlay visible={loading} />
        <Grid.Col span={12}>
          <TextInput
            label={'Title'}
            placeholder={'SWE I'}
            {...form.getInputProps('title')}
            required
          />
        </Grid.Col>
      </Grid>
    </form>
  )
}
export default JobListForm
