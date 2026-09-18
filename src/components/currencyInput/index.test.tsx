import { render, screen } from '@testing-library/react'
import CurrencyInput from '@/components/currencyInput/index'

describe('CurrencyInput', () => {
  it('should render a number input', () => {
    render(<CurrencyInput label={'Test'} placeholder={'placeholder'} />)
    expect(screen.getByPlaceholderText('placeholder')).toBeInTheDocument()
    expect(screen.getByRole('textbox')).toBeInTheDocument()
  })
})
