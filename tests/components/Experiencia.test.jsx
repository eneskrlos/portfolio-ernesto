import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Experiencia from '../../src/components/Experiencia/Experiencia.jsx'
import { experiencia } from '../../src/data/contenido.js'

describe('Experiencia', () => {
  it('renderiza exactamente 4 ítems de experiencia', () => {
    render(<Experiencia />)
    const items = screen.getAllByRole('listitem')
    expect(items).toHaveLength(4)
  })

  it('el primer ítem es "CodeBerrySolutions"', () => {
    render(<Experiencia />)
    const items = screen.getAllByRole('listitem')
    expect(items[0]).toHaveTextContent('CodeBerrySolutions')
  })

  it('cada ítem muestra el nombre de la empresa', () => {
    render(<Experiencia />)
    experiencia.forEach((item) => {
      expect(screen.getByText(item.empresa)).toBeInTheDocument()
    })
  })

  it('cada ítem muestra el período', () => {
    render(<Experiencia />)
    experiencia.forEach((item) => {
      expect(screen.getByText(item.periodo)).toBeInTheDocument()
    })
  })
})
