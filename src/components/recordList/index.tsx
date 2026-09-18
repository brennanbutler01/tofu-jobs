import { Alert, Button, Card, Group, Loader, Stack, Text } from '@mantine/core'
import { notifications } from '@mantine/notifications'
import { useState, type ReactNode } from 'react'
import { useSWRConfig } from 'swr'
import { useAppAuth } from '@/useAppAuth'
import FormDrawer from '@/components/formDrawer'
import DeleteButton from '@/components/deleteButton'

interface Props<Record extends { id: number; title: string }> {
  records?: Record[]
  loading: boolean
  failed: unknown
  model: string
  form: string
  details: (record: Record) => ReactNode
  editor: (record: Record) => ReactNode
  remove: (id: number, token: string) => Promise<unknown>
}

export default function RecordList<
  Record extends { id: number; title: string }
>({
  records,
  loading,
  failed,
  model,
  form,
  details,
  editor,
  remove,
}: Props<Record>) {
  const [editing, setEditing] = useState<Record>()
  const { getAccessTokenSilently } = useAppAuth()
  const { mutate } = useSWRConfig()
  if (loading) return <Loader aria-label='Loading records' />
  if (failed)
    return (
      <Alert color='red'>Could not load your records. Reload to retry.</Alert>
    )
  return (
    <Stack>
      {!records?.length && (
        <Text color='dimmed'>
          No records yet. Create your first {model.toLowerCase()} above.
        </Text>
      )}
      {records?.map(record => (
        <Card
          component='article'
          aria-label={record.title}
          key={record.id}
          withBorder
        >
          <Group position='apart'>
            <Text weight={600}>{record.title}</Text>
            <Group>
              <Button variant='subtle' onClick={() => setEditing(record)}>
                Edit
              </Button>
              <DeleteButton
                model={model}
                color='red'
                variant='subtle'
                handleDelete={async () => {
                  try {
                    await remove(record.id, await getAccessTokenSilently())
                    await mutate(() => true)
                  } catch (error) {
                    notifications.show({
                      title: 'Could not delete record',
                      message:
                        error instanceof Error
                          ? error.message
                          : 'Please try again.',
                      color: 'red',
                    })
                  }
                }}
              />
            </Group>
          </Group>
          {details(record)}
        </Card>
      ))}
      {editing && (
        <FormDrawer
          opened
          onClose={() => setEditing(undefined)}
          editing
          model={model}
          form={form}
        >
          {editor(editing)}
        </FormDrawer>
      )}
    </Stack>
  )
}
