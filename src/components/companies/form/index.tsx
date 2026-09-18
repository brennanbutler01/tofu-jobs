import { Company, PostCompany } from '@/models'
import { EditableFormProps } from '@/types'
import { Grid, LoadingOverlay, Textarea, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { useAppAuth as useAuth0 } from '@/useAppAuth'
import { useState } from 'react'
import {
  IconCheck,
  IconExclamationCircle,
  IconLoader,
} from '@tabler/icons-react'
import { Companies } from '@/services'
import { useSWRConfig } from 'swr'
import useCrudNotification from '@/useCrudNotification'
import { useJobSWR } from '@/services/jobs'
import { closeDrawer } from '@/close-drawer'

const CompanyForm = ({ editingRecord }: EditableFormProps<Company>) => {
  const { getAccessTokenSilently } = useAuth0()
  const [loading, setLoading] = useState(false)
  const { mutate } = useSWRConfig()
  const { jobs } = useJobSWR()
  const showNotification = useCrudNotification({
    id: 'post-company',
    loading: {
      icon: <IconLoader />,
      title: `${editingRecord ? 'Updating' : 'Creating'} your company`,
      message: 'This should just take a few moments...',
    },
    success: {
      icon: <IconCheck />,
      title: `Company was ${editingRecord ? 'updated' : 'created'}`,
      message: 'Notification will close in 2 seconds or you can close it now.',
    },
    error: {
      icon: <IconExclamationCircle />,
      title: `Error ${editingRecord ? 'updating' : 'creating'} company`,
      message: 'Try again',
    },
  })

  const form = useForm<Company | PostCompany>({
    initialValues: editingRecord
      ? {
          ...editingRecord,
          jobs: jobs?.filter(job => job.companyId === editingRecord.id) || [],
        }
      : {
          description: '',
          industry: '',
          location: '',
          name: '',
          website: '',
          jobs: [],
        },
  })

  return (
    <form
      id={'company-form'}
      name={'company-form'}
      onSubmit={form.onSubmit(async values => {
        setLoading(true)
        const saved = await showNotification({
          crudOperation: async () =>
            editingRecord
              ? Companies.update(
                  { ...editingRecord, ...values },
                  await getAccessTokenSilently()
                )
              : Companies.create(values, await getAccessTokenSilently()),
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
            data-autofocus
            label={'Name'}
            placeholder={'Google'}
            {...form.getInputProps('name')}
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
          <TextInput
            label={'Website'}
            placeholder={'https://careers.google.com'}
            type={'url'}
            {...form.getInputProps('website')}
          />
        </Grid.Col>
        <Grid.Col span={12}>
          <TextInput
            label={'Industry'}
            placeholder={'SaaS'}
            {...form.getInputProps('industry')}
          />
        </Grid.Col>
        <Grid.Col span={12}>
          <Textarea
            label={'Description'}
            placeholder={'Google is a company that sells ads and harvests data'}
            {...form.getInputProps('description')}
          />
        </Grid.Col>
      </Grid>
    </form>
  )
}
export default CompanyForm
