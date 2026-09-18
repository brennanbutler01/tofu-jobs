import { render, screen } from '@testing-library/react'
import { Header } from '@/components'

describe('Header', () => {
  it('should render a banner', () => {
    render(<Header />)
    expect(screen.getByRole('banner')).toBeInTheDocument()
  })
})
