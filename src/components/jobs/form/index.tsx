import { Job, PostJob } from '@/models'
import { EditableFormProps } from '@/types'
import { Checkbox, Grid, LoadingOverlay, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { useAppAuth as useAuth0 } from '@/useAppAuth'
import { useState } from 'react'
import {
  IconCheck,
  IconExclamationCircle,
  IconLoader,
} from '@tabler/icons-react'
import { Jobs } from '@/services'
import { useSWRConfig } from 'swr'
import useCrudNotification from '@/useCrudNotification'
import CurrencyInput from '@/components/currencyInput'
import { Select as CompanySelect } from '@/components/companies'
import { Select as JobListSelect } from '@/components/jobLists'
import { JobList } from '@/models/jobList'
import { closeDrawer } from '@/close-drawer'
import { useInterviewSWR } from '@/services/interviews'

interface JobFormProps extends EditableFormProps<Job> {
  jobList?: JobList
}

const JobForm = ({ editingRecord, jobList }: JobFormProps) => {
  const { getAccessTokenSilently } = useAuth0()
  const [loading, setLoading] = useState(false)
  const { mutate } = useSWRConfig()
  const { interviews } = useInterviewSWR()
  const showNotification = useCrudNotification({
    id: 'post-job',
    loading: {
      icon: <IconLoader />,
      title: `${editingRecord ? 'Updating' : 'Creating'} your job`,
      message: 'This should just take a few moments...',
    },
    success: {
      icon: <IconCheck />,
      title: `Job was ${editingRecord ? 'updated' : 'created'}`,
      message: 'Notification will close in 2 seconds or you can close it now.',
    },
    error: {
      icon: <IconExclamationCircle />,
      title: `Error ${editingRecord ? 'updating' : 'creating'} job`,
      message: 'Try again',
    },
  })

  const form = useForm<Job | PostJob>({
    initialValues: editingRecord
      ? {
          ...editingRecord,
          interviews: (interviews || [])?.filter(
            interview => interview.jobId === editingRecord.id
          ),
        }
      : {
          title: '',
          company: undefined,
          companyId: undefined,
          salary: 35_000,
          isRemote: false,
          location: '',
          id: undefined,
          jobListId: jobList?.id,
          jobList: undefined,
          interviews: [],
          coverLetters: [],
          activities: [],
        },
  })

  return (
    <form
      id={'job-form'}
      name={'job-form'}
      onSubmit={form.onSubmit(async values => {
        setLoading(true)
        const saved = await showNotification({
          crudOperation: async () =>
            editingRecord
              ? Jobs.update(
                  { ...editingRecord, ...values },
                  await getAccessTokenSilently()
                )
              : Jobs.create(values, await getAccessTokenSilently()),
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
          <CompanySelect inputProps={form.getInputProps('companyId')} focus />
        </Grid.Col>
        <Grid.Col span={12}>
          <JobListSelect inputProps={form.getInputProps('jobListId')} />
        </Grid.Col>
        <Grid.Col span={12}>
          <TextInput
            label={'Title'}
            placeholder={'SWE I'}
            {...form.getInputProps('title')}
            required
          />
        </Grid.Col>
        <Grid.Col span={12}>
          <TextInput
            label={'Location'}
            placeholder={'Salem'}
            {...form.getInputProps('location')}
            required
          />
        </Grid.Col>
        <Grid.Col span={12}>
          <CurrencyInput
            label={'Salary'}
            placeholder={'$30,000'}
            inputProps={form.getInputProps('salary')}
          />
        </Grid.Col>
        <Grid.Col span={12}>
          <Checkbox
            label={'Is Remote?'}
            placeholder={'SaaS'}
            {...form.getInputProps('isRemote', { type: 'checkbox' })}
          />
        </Grid.Col>
      </Grid>
    </form>
  )
}
export default JobForm
