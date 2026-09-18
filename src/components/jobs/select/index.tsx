import { useJobSWR } from '@/services/jobs'
import { Select } from '@mantine/core'
import { GetInputProps } from '@mantine/form/lib/types'

interface Props<T> {
  inputProps: ReturnType<GetInputProps<T>>
  focus?: boolean
  required?: boolean
}

const JobSelect = <T,>({ inputProps, focus, required = true }: Props<T>) => {
  const { jobs } = useJobSWR()
  return (
    <Select
      required={required}
      {...(focus && { 'data-autofocus': true })}
      {...inputProps}
      value={inputProps?.value == null ? null : String(inputProps.value)}
      onChange={value =>
        inputProps?.onChange(value == null ? undefined : Number(value))
      }
      data={(jobs || [])?.map(job => ({
        value: job.id.toString(),
        label: job.title,
      }))}
      clearable
      searchable
      label={'Job'}
      placeholder={'Select Job'}
      clearButtonProps={{ 'aria-label': 'Clear job' }}
    />
  )
}
export default JobSelect
