import { InputProps, NumberInput } from '@mantine/core'
import { currencyFormatter, currencyParser } from '@/format-currency'

interface Props {
  label: string
  placeholder: string
  inputProps?: InputProps
}

const CurrencyInput = ({ label, placeholder, inputProps }: Props) => {
  return (
    <NumberInput
      placeholder={placeholder}
      {...inputProps}
      label={label}
      parser={currencyParser}
      formatter={currencyFormatter}
    />
  )
}

export default CurrencyInput
