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
import { CoverLetters } from '@/services'
import { useSWRConfig } from 'swr'
import useCrudNotification from '@/useCrudNotification'
import { closeDrawer } from '@/close-drawer'
import { CoverLetter, PostCoverLetter } from '@/models'

const CoverLetterForm = ({ editingRecord }: EditableFormProps<CoverLetter>) => {
  const { getAccessTokenSilently } = useAuth0()
  const [loading, setLoading] = useState(false)
  const { mutate } = useSWRConfig()
  const showNotification = useCrudNotification({
    id: 'cover-letter',
    error: {
      icon: <IconExclamationCircle />,
      title: 'Error uploading cover letter',
      message: 'Please try again.',
    },
    success: {
      icon: <IconCheck />,
      title: 'Cover letter uploaded!',
      message: 'Cover letter saved to database',
    },
    loading: {
      icon: <IconLoader />,
      title: 'Saving cover letter...',
      message: 'Please wait, it should be over soon...',
    },
  })

  const form = useForm<CoverLetter | PostCoverLetter>({
    initialValues: editingRecord
      ? { ...editingRecord }
      : {
          title: '',
          jobId: undefined,
          job: undefined,
          id: undefined,
          created: new Date(),
          url: '',
        },
  })

  return (
    <form
      id={'coverLetter-form'}
      name={'coverLetter-form'}
      onSubmit={form.onSubmit(async values => {
        setLoading(true)
        const saved = await showNotification({
          crudOperation: async () =>
            editingRecord
              ? CoverLetters.update(
                  { ...editingRecord, ...values },
                  await getAccessTokenSilently()
                )
              : CoverLetters.create(values, await getAccessTokenSilently()),
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
            type='url'
            label='Document URL'
            placeholder='https://example.com/cover-letter'
            required
            {...form.getInputProps('url')}
          />
        </Grid.Col>
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
export default CoverLetterForm
