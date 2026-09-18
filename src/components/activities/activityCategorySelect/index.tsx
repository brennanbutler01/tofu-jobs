import { Select } from '@mantine/core'
import { GetInputProps } from '@mantine/form/lib/types'
import { ActivityCategories } from '@/models'

interface Props<T> {
  inputProps: ReturnType<GetInputProps<T>>
}
const ActivityCategorySelect = <T,>({ inputProps }: Props<T>) => (
  <Select
    {...inputProps}
    value={inputProps.value == null ? null : String(inputProps.value)}
    onChange={value =>
      inputProps.onChange(value == null ? undefined : Number(value))
    }
    placeholder='Activity category'
    required
    label='Activity Category'
    data={Object.entries(ActivityCategories)
      .filter(([key]) => !Number.isNaN(Number(key)))
      .map(([key, label]) => ({ label: String(label), value: key }))}
  />
)
export default ActivityCategorySelect
