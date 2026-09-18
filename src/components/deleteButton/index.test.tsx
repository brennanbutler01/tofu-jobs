import DeleteButton from '@/components/deleteButton/index'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

describe('DeleteButton', () => {
  it('should render a button', () => {
    render(<DeleteButton handleDelete={async () => 1} model={'Job'} />)
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('should open a modal on click', async () => {
    const user = userEvent.setup()
    render(<DeleteButton handleDelete={async () => 1} model={'Job'} />)
    await user.click(screen.getByRole('button'))
  })
})
