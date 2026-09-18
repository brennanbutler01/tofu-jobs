import { Select } from '@mantine/core'
import { GetInputProps } from '@mantine/form/lib/types'
import { useJobListSWR } from '@/services/jobLists'

interface Props<T> {
  inputProps?: ReturnType<GetInputProps<T>>
  focus?: boolean
}

const JobListSelect = <T,>({ inputProps, focus = false }: Props<T>) => {
  const { jobLists } = useJobListSWR()

  return (
    <Select
      {...(focus ? { 'data-autofocus': true } : null)}
      withinPortal={false}
      label={'Job List'}
      required
      data={(jobLists || []).map(jobList => ({
        label: jobList.title,
        value: jobList.id.toString(),
      }))}
      placeholder={'Job List'}
      clearable
      searchable
      clearButtonProps={{ 'aria-label': 'Clear job list' }}
      {...inputProps}
      value={inputProps?.value == null ? null : String(inputProps.value)}
      onChange={value =>
        inputProps?.onChange(value == null ? undefined : Number(value))
      }
    />
  )
}

export default JobListSelect
