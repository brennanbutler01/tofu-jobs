import { EditableFormProps } from '@/types'
import { Activity, ActivityCategories, PostActivity } from '@/models'
import { useAppAuth as useAuth0 } from '@/useAppAuth'
import { useState } from 'react'
import { useSWRConfig } from 'swr'
import useCrudNotification from '@/useCrudNotification'
import {
  IconCheck,
  IconExclamationCircle,
  IconLoader,
} from '@tabler/icons-react'
import { useForm } from '@mantine/form'
import { closeDrawer } from '@/close-drawer'
import {
  Checkbox,
  Grid,
  LoadingOverlay,
  Textarea,
  TextInput,
} from '@mantine/core'
import { Activities } from '@/services'
import ActivityCategorySelect from '@/components/activities/activityCategorySelect'
import JobSelect from '@/components/jobs/select'
import DateTimeSelect from '@/components/dateTimeSelect'
import dayjs from '@/dayjs'

type Props = EditableFormProps<Activity>

const ActivityForm = ({ editingRecord }: Props) => {
  const { getAccessTokenSilently } = useAuth0()
  const [loading, setLoading] = useState(false)
  const { mutate } = useSWRConfig()

  const showNotification = useCrudNotification({
    id: 'post-activities',
    loading: {
      icon: <IconLoader />,
      title: `${editingRecord ? 'Updating' : 'Creating'} your activity`,
      message: 'This should just take a few moments...',
    },
    success: {
      icon: <IconCheck />,
      title: `Activity was ${editingRecord ? 'updated' : 'created'}`,
      message: 'Notification will close in 2 seconds or you can close it now.',
    },
    error: {
      icon: <IconExclamationCircle />,
      title: `Error ${editingRecord ? 'updating' : 'creating'} activity`,
      message: 'Try again',
    },
  })

  const form = useForm<Activity | PostActivity>({
    initialValues: editingRecord
      ? {
          ...editingRecord,
        }
      : {
          title: '',
          startDateTime: undefined,
          endDateTime: undefined,
          note: undefined,
          isCompleted: false,
          jobId: undefined,
          activityCategory: ActivityCategories.APPLY,
          dateCompleted: undefined,
        },
    transformValues: values => {
      if (!values.isCompleted && dayjs(values.dateCompleted).isValid()) {
        return {
          ...values,
          dateCompleted: undefined,
          activityCategory: parseInt(values.activityCategory.toString()),
        }
      }
      return {
        ...values,
        activityCategory: parseInt(values.activityCategory.toString()),
      }
    },
  })

  return (
    <form
      id={'activity-form'}
      name={'activity-form'}
      onSubmit={form.onSubmit(async values => {
        setLoading(true)
        const saved = await showNotification({
          crudOperation: async () =>
            editingRecord
              ? Activities.update(
                  { ...editingRecord, ...values },
                  await getAccessTokenSilently()
                )
              : Activities.create(values, await getAccessTokenSilently()),
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
            label={'Title'}
            placeholder={'SWE I'}
            {...form.getInputProps('title')}
            required
          />
        </Grid.Col>
        <Grid.Col span={12}>
          <ActivityCategorySelect
            inputProps={form.getInputProps('activityCategory')}
          />
        </Grid.Col>
        <Grid.Col span={12}>
          <JobSelect
            required={false}
            inputProps={form.getInputProps('jobId')}
          />
        </Grid.Col>
        <Grid.Col span={12}>
          <Textarea
            label={'Notes'}
            placeholder={'A little something to remember....'}
            {...form.getInputProps('note')}
          />
        </Grid.Col>
        <Grid.Col span={6}>
          <DateTimeSelect
            label={'Start Date'}
            inputProps={form.getInputProps('startDateTime')}
          />
        </Grid.Col>
        <Grid.Col span={6}>
          <DateTimeSelect
            label={'End Date'}
            inputProps={form.getInputProps('endDateTime')}
          />
        </Grid.Col>

        <Grid.Col span={4}>
          <Checkbox
            styles={() => ({
              root: { display: 'flex', alignItems: 'center', height: '80px' },
              body: {
                alignItems: 'end',
              },
            })}
            label={'Is completed?'}
            labelPosition={'left'}
            {...form.getInputProps('isCompleted', { type: 'checkbox' })}
          />
        </Grid.Col>
        {form.values.isCompleted ? (
          <Grid.Col span={8}>
            <DateTimeSelect
              label={'Date Completed'}
              inputProps={form.getInputProps('dateCompleted')}
              required
            />
          </Grid.Col>
        ) : null}
      </Grid>
    </form>
  )
}

export default ActivityForm
