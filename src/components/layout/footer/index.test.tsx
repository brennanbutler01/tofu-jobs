import { render, screen } from '@testing-library/react'
import { Footer } from '@/components'

describe('Footer', () => {
  it('should have a content info area', () => {
    render(<Footer />)
    expect(screen.getByRole('contentinfo')).toBeInTheDocument()
  })
})
