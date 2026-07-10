import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Experiencia from '../../src/components/Experiencia/Experiencia.jsx'
import { experiencia } from '../../src/data/contenido.js'

describe('Experiencia', () => {
  it('renderiza exactamente 6 ítems de experiencia', () => {
    render(<Experiencia />)
    const items = screen.getAllByRole('listitem')
    expect(items).toHaveLength(6)
  })

  it('el primer ítem es "Bold MSS"', () => {
    render(<Experiencia />)
    const items = screen.getAllByRole('listitem')
    expect(items[0]).toHaveTextContent('Bold MSS')
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

  it('los ítems tienen clase CSS que indica estado de animación', () => {
    render(<Experiencia />)
    const items = screen.getAllByRole('listitem')
    items.forEach((item) => {
      expect(item.className).toMatch(/item/)
    })
  })

  it('la cantidad de ítems renderizados no cambia con la animación', () => {
    render(<Experiencia />)
    const items = screen.getAllByRole('listitem')
    expect(items).toHaveLength(experiencia.length)
  })
})
