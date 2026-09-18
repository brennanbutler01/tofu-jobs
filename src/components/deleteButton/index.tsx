import { Button, ButtonProps } from '@mantine/core'
import deleteModal from '@/components/deleteModal'

interface Props<T> extends ButtonProps {
  model: string
  handleDelete: () => Promise<T>
}

const DeleteButton = <T,>({ handleDelete, model, ...rest }: Props<T>) => {
  return (
    <Button {...rest} onClick={() => deleteModal({ handleDelete, model })}>
      delete
    </Button>
  )
}

export default DeleteButton
