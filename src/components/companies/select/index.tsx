import { useCompanySWR } from '@/services/companies'
import { Select } from '@mantine/core'
import { GetInputProps } from '@mantine/form/lib/types'

interface Props<T> {
  inputProps?: ReturnType<GetInputProps<T>>
  focus?: boolean
}

const CompanySelect = <T,>({ inputProps, focus = false }: Props<T>) => {
  const { companies } = useCompanySWR()

  return (
    <Select
      {...(focus ? { 'data-autofocus': true } : null)}
      withinPortal
      label={'Company'}
      required
      data={(companies || []).map(company => ({
        label: company.name,
        value: company.id.toString(),
      }))}
      placeholder={'Company'}
      clearable
      searchable
      clearButtonProps={{ 'aria-label': 'Clear company' }}
      {...inputProps}
      value={inputProps?.value == null ? null : String(inputProps.value)}
      onChange={value =>
        inputProps?.onChange(value == null ? undefined : Number(value))
      }
    />
  )
}

export default CompanySelect
