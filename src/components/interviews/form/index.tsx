import { useForm } from '@mantine/form'
import { Interview, PostInterview } from '@/models'
import { EditableFormProps } from '@/types'
import { useState } from 'react'
import { Grid, LoadingOverlay, NumberInput } from '@mantine/core'
import InterviewTypesSelect from '@/components/interviews/interviewTypesSelect'
import DateTimeSelect from '@/components/dateTimeSelect'
import JobSelect from '@/components/jobs/select'
import useCrudNotification from '@/useCrudNotification'
import {
  IconCheck,
  IconExclamationCircle,
  IconLoader,
} from '@tabler/icons-react'
import { Interviews } from '@/services'
import { useSWRConfig } from 'swr'
import { useAppAuth as useAuth0 } from '@/useAppAuth'
import dayjs from '@/dayjs'
import { closeDrawer } from '@/close-drawer'

interface Props extends EditableFormProps<Interview> {
  selectedSlot?: {
    start?: Date
    end?: Date
  }
}

const InterviewForm = ({ editingRecord, selectedSlot }: Props) => {
  const [loading, setLoading] = useState(false)
  const { mutate } = useSWRConfig()

  const form = useForm<Interview | PostInterview>({
    initialValues: editingRecord
      ? {
          ...editingRecord,
          start: dayjs(editingRecord.start).toDate(),
          end: dayjs(editingRecord.end).toDate(),
        }
      : {
          interviewType: 0,
          job: undefined,
          jobId: undefined,
          start: selectedSlot?.start || new Date(),
          end: selectedSlot?.end || new Date(),
          round: 1,
        },
  })
  const { getAccessTokenSilently } = useAuth0()
  const showNotification = useCrudNotification({
    id: 'post-interview',
    loading: {
      icon: <IconLoader />,
      title: `${editingRecord ? 'Updating' : 'Creating'} your interview`,
      message: 'This should just take a few moments...',
    },
    success: {
      icon: <IconCheck />,
      title: `Interview was ${editingRecord ? 'updated' : 'created'}`,
      message: 'Notification will close in 2 seconds or you can close it now.',
    },
    error: {
      icon: <IconExclamationCircle />,
      title: `Error ${editingRecord ? 'updating' : 'creating'} interview`,
      message: 'Try again',
    },
  })
  return (
    <form
      id={'interview-form'}
      name={'interview-form'}
      onSubmit={form.onSubmit(async values => {
        setLoading(true)
        const saved = await showNotification({
          crudOperation: async () =>
            editingRecord
              ? await Interviews.update(
                  { ...editingRecord, ...values },
                  await getAccessTokenSilently()
                )
              : await Interviews.create(values, await getAccessTokenSilently()),
        })
        if (!saved) {
          setLoading(false)
          return
        }
        await mutate(() => true)
        setLoading(false)
        form.reset()
        closeDrawer()
      })}
    >
      <Grid p={'sm'} gutter={'lg'}>
        <LoadingOverlay visible={loading} />
        <Grid.Col span={12}>
          <JobSelect focus inputProps={form.getInputProps('jobId')} />
        </Grid.Col>
        <Grid.Col span={12}>
          <InterviewTypesSelect
            inputProps={form.getInputProps('interviewType')}
          />
        </Grid.Col>
        <Grid.Col span={12}>
          <DateTimeSelect
            label={'Start'}
            inputProps={form.getInputProps('start')}
          />
        </Grid.Col>
        <Grid.Col span={12}>
          <DateTimeSelect
            label={'End'}
            inputProps={form.getInputProps('end')}
          />
        </Grid.Col>
        <Grid.Col span={12}>
          <NumberInput
            min={1}
            step={1}
            label={'Interview Round'}
            placeholder={'Select round'}
            {...form.getInputProps('round')}
          />
        </Grid.Col>
      </Grid>
    </form>
  )
}
export default InterviewForm
