import Shell from '@/components/layout/shell'
import { render, screen } from '@testing-library/react'
import { BrowserRouter as Router } from 'react-router-dom'

describe('AppShell', () => {
  beforeEach(() => {
    render(
      <Router>
        <Shell>hi</Shell>
      </Router>
    )
  })
  it('should render children', () => {
    expect(screen.getByText(/hi/i)).toBeInTheDocument()
  })

  it('should render landmark regions', () => {
    expect(screen.getByRole('banner')).toBeInTheDocument()
    expect(screen.getByRole('navigation')).toBeInTheDocument()
    expect(screen.getByRole('contentinfo')).toBeInTheDocument()
  })
})
