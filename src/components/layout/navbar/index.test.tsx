import { render, screen } from '@testing-library/react'
import { Navbar } from '@/components'
import { BrowserRouter as Router } from 'react-router-dom'

describe('Navbar', () => {
  it('should show a nav', () => {
    render(
      <Router>
        <Navbar />
      </Router>
    )
    expect(screen.getByRole('navigation')).toBeInTheDocument()
  })
})
