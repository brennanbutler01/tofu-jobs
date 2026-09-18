import Login from './index'
import { render, screen } from '@testing-library/react'

test('Login should show a button', () => {
  render(<Login />)
  expect(screen.getByRole('button')).toBeInTheDocument()
})
