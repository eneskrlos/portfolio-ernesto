import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Footer from '../../src/components/Footer/Footer.jsx'

describe('Footer', () => {
  it('renderiza el texto de copyright con el año', () => {
    render(<Footer />)
    expect(screen.getByText(/© 2025/)).toBeInTheDocument()
  })

  it('el link de email usa "mailto:"', () => {
    render(<Footer />)
    const links = screen.getAllByRole('link')
    const linkEmail = links.find((l) => l.href.startsWith('mailto:'))
    expect(linkEmail).toBeDefined()
  })

  it('el link de WhatsApp usa "https://wa.me/"', () => {
    render(<Footer />)
    const linkWhatsApp = screen.getByText('WhatsApp')
    expect(linkWhatsApp.href).toContain('wa.me')
  })

  it('todos los links externos tienen target="_blank"', () => {
    render(<Footer />)
    const links = screen.getAllByRole('link')
    links.forEach((link) => {
      expect(link).toHaveAttribute('target', '_blank')
    })
  })
})
