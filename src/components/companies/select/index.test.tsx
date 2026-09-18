import { render, screen } from '@testing-library/react'
import CompanySelect from '@/components/companies/select/index'

describe('CompanySelect', () => {
  it('renders a select box', () => {
    render(<CompanySelect />)
    expect(screen.getByRole('combobox')).toBeInTheDocument()
  })
})
