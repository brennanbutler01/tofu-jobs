import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ModalsProvider } from '@mantine/modals'
import CreateButton from '@/components/createButton/index'

const props = {
  model: 'Company',
  drawerChildren: <div>drawer</div>,
  form: 'company-form',
}
describe('CreateButton', () => {
  it('should render a button', () => {
    render(<CreateButton {...props} />)
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('should open a drawer on click', async () => {
    const user = userEvent.setup()
    render(
      <ModalsProvider>
        <CreateButton {...props} />
      </ModalsProvider>
    )
    await user.click(screen.getByRole('button'))
    expect(screen.getByText(/drawer/i)).toBeInTheDocument()
  })
})
