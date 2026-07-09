import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Header from '../../src/components/Header/Header.jsx'

describe('Header', () => {
  it('renderiza el nombre "Ernesto Carlos"', () => {
    render(<Header />)
    expect(screen.getByText('Ernesto Carlos')).toBeInTheDocument()
  })

  it('renderiza todos los links de navegación (5 links internos)', () => {
    render(<Header />)
    const linksInternos = ['Sobre mí', 'Experiencia', 'Proyectos', 'Habilidades', 'Contacto']
    linksInternos.forEach((label) => {
      expect(screen.getByText(label)).toBeInTheDocument()
    })
  })

  it('el link de LinkedIn tiene target="_blank"', () => {
    render(<Header />)
    const linkLinkedIn = screen.getByText('LinkedIn')
    expect(linkLinkedIn).toHaveAttribute('target', '_blank')
  })

  it('el link de LinkedIn tiene rel="noreferrer"', () => {
    render(<Header />)
    const linkLinkedIn = screen.getByText('LinkedIn')
    expect(linkLinkedIn).toHaveAttribute('rel', 'noreferrer')
  })

  it('el botón de tema está presente en el Header', () => {
    render(<Header />)
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('el botón de tema tiene aria-label descriptivo', () => {
    render(<Header />)
    const botonTema = screen.getByRole('button')
    expect(botonTema).toHaveAttribute('aria-label', 'Activar modo oscuro')
  })
})
