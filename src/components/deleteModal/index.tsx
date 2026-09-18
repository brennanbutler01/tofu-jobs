import { openConfirmModal } from '@mantine/modals'
import { Flex, Text } from '@mantine/core'

interface Props<T> {
  handleDelete: () => Promise<T>
  model: string
}

const deleteModal = <T,>({ handleDelete, model }: Props<T>) => {
  openConfirmModal({
    title: 'Delete Confirmation',
    closeButtonProps: { 'aria-label': 'Close modal' },
    labels: {
      cancel: 'cancel',
      confirm: 'confirm',
    },
    children: (
      <Flex direction={'column'} gap={'xs'}>
        <Text>Are you sure you want to delete this {model}?</Text>
        <Text size={'sm'} c={'dimmed'}>
          This action cannot be reversed and you will need to re-create the
          record.
        </Text>
      </Flex>
    ),
    onConfirm: handleDelete,
  })
}
export default deleteModal
