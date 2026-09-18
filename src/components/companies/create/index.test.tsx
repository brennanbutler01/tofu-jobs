import { render, screen } from '@testing-library/react'
import { Companies } from '@/components'
import userEvent from '@testing-library/user-event'
import { ModalsProvider } from '@mantine/modals'

describe('CompanyCreate', () => {
  it('should render a button', () => {
    render(<Companies.Create />)
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('should open company modal on click', async () => {
    const user = userEvent.setup()
    render(
      <ModalsProvider>
        <Companies.Create />
      </ModalsProvider>
    )
    await user.click(screen.getByRole('button'))
    expect(screen.getByRole('dialog')).toBeInTheDocument()
  })
})
