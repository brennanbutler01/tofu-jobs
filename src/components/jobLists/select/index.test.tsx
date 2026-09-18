import { render, screen } from '@testing-library/react'
import JobListSelect from '@/components/jobLists/select/index'

describe('JobListSelect', () => {
  it('renders a select box', () => {
    render(<JobListSelect />)
    expect(screen.getByRole('combobox')).toBeInTheDocument()
  })
})
