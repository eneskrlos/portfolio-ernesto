import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import Header from '../../src/components/Header/Header.jsx'
import { IdiomaProvider } from '../../src/context/IdiomaContext.jsx'

describe('Header', () => {
  beforeEach(() => {
    localStorage.clear()
  })

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
    expect(screen.getByRole('button', { name: 'Activar modo oscuro' })).toBeInTheDocument()
  })

  it('el botón de tema tiene aria-label descriptivo', () => {
    render(<Header />)
    const botonTema = screen.getByRole('button', { name: 'Activar modo oscuro' })
    expect(botonTema).toHaveAttribute('aria-label', 'Activar modo oscuro')
  })

  it('muestra "Sobre mí" cuando el idioma es "es"', () => {
    render(<Header />)
    expect(screen.getByText('Sobre mí')).toBeInTheDocument()
  })

  it('muestra "About me" cuando el idioma es "en"', () => {
    render(
      <IdiomaProvider>
        <Header />
      </IdiomaProvider>,
    )
    fireEvent.click(screen.getByText('EN'))
    expect(screen.getByText('About me')).toBeInTheDocument()
  })

  it('el selector de idioma tiene 3 botones (ES, EN, PT)', () => {
    render(<Header />)
    expect(screen.getByText('ES')).toBeInTheDocument()
    expect(screen.getByText('EN')).toBeInTheDocument()
    expect(screen.getByText('PT')).toBeInTheDocument()
  })

  it('el botón del idioma activo tiene clase "activo"', () => {
    render(<Header />)
    expect(screen.getByText('ES').className).toMatch(/activo/)
  })
})
