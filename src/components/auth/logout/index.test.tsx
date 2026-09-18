import { render, screen } from '@testing-library/react'
import Logout from './index'

test('Logout should show a button', () => {
  render(<Logout />)
  expect(screen.getByRole('button')).toBeInTheDocument()
})
