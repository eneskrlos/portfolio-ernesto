import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import Hero from '../../src/components/Hero/Hero.jsx'
import { IdiomaProvider } from '../../src/context/IdiomaContext.jsx'

describe('Hero', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('renderiza el nombre completo de perfil', () => {
    render(<Hero />)
    expect(screen.getByText('Ernesto Carlos Pérez García')).toBeInTheDocument()
  })

  it('renderiza el título profesional', () => {
    render(<Hero />)
    expect(screen.getByText('Ingeniero de Software')).toBeInTheDocument()
  })

  it('el botón "Ver mis proyectos" tiene href="#proyectos"', () => {
    render(<Hero />)
    const boton = screen.getByText('Ver mis proyectos')
    expect(boton).toHaveAttribute('href', '#proyectos')
  })

  it('el botón "Contactarme" tiene href="#contacto"', () => {
    render(<Hero />)
    const boton = screen.getByText('Contactarme')
    expect(boton).toHaveAttribute('href', '#contacto')
  })

  it('la imagen tiene atributo alt no vacío', () => {
    render(<Hero />)
    const imagen = screen.getByRole('img')
    expect(imagen).toHaveAttribute('alt')
    expect(imagen.getAttribute('alt').length).toBeGreaterThan(0)
  })

  it('si la imagen falla, se muestran las iniciales "EC"', () => {
    render(<Hero />)
    const imagen = screen.getByRole('img')
    fireEvent.error(imagen)
    expect(screen.getByText('EC')).toBeInTheDocument()
  })

  it('muestra "Hola, soy" en español', () => {
    render(<Hero />)
    expect(screen.getByText('Hola, soy')).toBeInTheDocument()
  })

  it('muestra "Hi, I\'m" en inglés', () => {
    localStorage.setItem('idioma', 'en')
    render(
      <IdiomaProvider>
        <Hero />
      </IdiomaProvider>,
    )
    expect(screen.getByText("Hi, I'm")).toBeInTheDocument()
  })
})
