import { Select } from '@mantine/core'
import { InterviewTypesMap } from '@/models'
import { GetInputProps } from '@mantine/form/lib/types'

interface Props<T> {
  inputProps: ReturnType<GetInputProps<T>>
}

const InterviewTypesSelect = <T,>({ inputProps }: Props<T>) => {
  return (
    <Select
      data={Object.values(InterviewTypesMap).map((value, index) => ({
        label: value,
        value: index.toString(),
      }))}
      clearable
      clearButtonProps={{ 'aria-label': 'Clear interview types' }}
      searchable
      label={'Interview Types'}
      placeholder={'Interview type'}
      {...inputProps}
      value={inputProps.value == null ? null : String(inputProps.value)}
      onChange={value =>
        inputProps.onChange(value == null ? undefined : Number(value))
      }
    />
  )
}
export default InterviewTypesSelect
