import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Proyectos from '../../src/components/Proyectos/Proyectos.jsx'
import { proyectos } from '../../src/data/contenido.js'

describe('Proyectos', () => {
  it('renderiza exactamente 4 tarjetas de proyectos', () => {
    render(<Proyectos />)
    const tarjetas = screen.getAllByRole('article')
    expect(tarjetas).toHaveLength(4)
  })

  it('cada tarjeta tiene un título visible', () => {
    render(<Proyectos />)
    proyectos.forEach((proyecto) => {
      expect(screen.getByText(proyecto.titulo)).toBeInTheDocument()
    })
  })

  it('cada tarjeta muestra al menos una tecnología como badge', () => {
    render(<Proyectos />)
    const listas = screen.getAllByRole('list', { name: 'Tecnologías utilizadas' })
    listas.forEach((lista) => {
      expect(lista.querySelectorAll('li').length).toBeGreaterThan(0)
    })
  })

  it('el proyecto "API REST con Microservicios" aparece en el listado', () => {
    render(<Proyectos />)
    expect(screen.getByText('API REST con Microservicios')).toBeInTheDocument()
  })
})
