import { notifications } from '@mantine/notifications'

type NotificationConfig = { title: string; message: string; icon: JSX.Element }

interface Props {
  id: string
  success: NotificationConfig
  loading: NotificationConfig
  error: NotificationConfig
}

const useCrudNotification = ({ id, success, loading, error }: Props) => {
  return async <T>({ crudOperation }: { crudOperation: () => Promise<T> }) => {
    notifications.show({
      id,
      loading: true,
      color: 'yellow',
      title: loading.title,
      message: loading.message,
      icon: loading.icon,
      autoClose: false,
      withCloseButton: false,
    })
    try {
      await crudOperation()
      notifications.update({
        id,
        color: 'teal',
        title: success.title,
        message: success.message,
        icon: success.icon,
        autoClose: 2000,
      })
      return true
    } catch (failure) {
      notifications.update({
        id,
        color: 'red',
        title: error.title,
        message: failure instanceof Error ? failure.message : error.message,
        icon: error.icon,
        autoClose: false,
        loading: false,
        withCloseButton: true,
      })
      return false
    }
  }
}
export default useCrudNotification
