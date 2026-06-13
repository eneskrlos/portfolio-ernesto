import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Habilidades from '../../src/components/Habilidades/Habilidades.jsx'

describe('Habilidades', () => {
  it('renderiza las 3 categorías (Frontend, Backend, Herramientas)', () => {
    render(<Habilidades />)
    expect(screen.getByText('Frontend')).toBeInTheDocument()
    expect(screen.getByText('Backend')).toBeInTheDocument()
    expect(screen.getByText('Herramientas')).toBeInTheDocument()
  })

  it('"React" aparece en la categoría Frontend', () => {
    render(<Habilidades />)
    expect(screen.getByText('React')).toBeInTheDocument()
  })

  it('"C#" aparece en la categoría Backend', () => {
    render(<Habilidades />)
    expect(screen.getByText('C#')).toBeInTheDocument()
  })

  it('"Git" aparece en la categoría Herramientas', () => {
    render(<Habilidades />)
    expect(screen.getByText('Git')).toBeInTheDocument()
  })
})
