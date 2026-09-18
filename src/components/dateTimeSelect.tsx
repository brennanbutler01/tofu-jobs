import { TextInput } from '@mantine/core'
import dayjs from '@/dayjs'

interface Props {
  label: string
  inputProps: {
    value?: Date | string | null
    onChange?: (value: Date | null) => void
    error?: React.ReactNode
    onBlur?: () => void
    onFocus?: () => void
  }
  required?: boolean
}

const DateTimeSelect = ({ label, inputProps, required = false }: Props) => {
  const date = inputProps.value ? dayjs(inputProps.value) : null
  return (
    <TextInput
      type='datetime-local'
      label={label}
      required={required}
      value={date?.isValid() ? date.format('YYYY-MM-DDTHH:mm') : ''}
      onChange={event =>
        inputProps.onChange?.(
          event.currentTarget.value ? new Date(event.currentTarget.value) : null
        )
      }
      error={inputProps.error}
      onBlur={inputProps.onBlur}
      onFocus={inputProps.onFocus}
    />
  )
}
export default DateTimeSelect
