import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { TemaProvider, useTema } from '../../src/context/TemaContext.jsx'

// Componente auxiliar para exponer el hook useTema en los tests
function ComponentePrueba() {
  const { tema, toggleTema } = useTema()
  return (
    <div>
      <span data-testid="tema-actual">{tema}</span>
      <button onClick={toggleTema}>cambiar</button>
    </div>
  )
}

describe('TemaProvider', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('renderiza sus hijos sin errores', () => {
    render(
      <TemaProvider>
        <p>contenido hijo</p>
      </TemaProvider>,
    )
    expect(screen.getByText('contenido hijo')).toBeInTheDocument()
  })

  it('el tema inicial por defecto es "light"', () => {
    render(
      <TemaProvider>
        <ComponentePrueba />
      </TemaProvider>,
    )
    expect(screen.getByTestId('tema-actual')).toHaveTextContent('light')
  })

  it('toggleTema cambia de "light" a "dark"', () => {
    render(
      <TemaProvider>
        <ComponentePrueba />
      </TemaProvider>,
    )
    fireEvent.click(screen.getByText('cambiar'))
    expect(screen.getByTestId('tema-actual')).toHaveTextContent('dark')
  })

  it('toggleTema cambia de "dark" a "light"', () => {
    render(
      <TemaProvider>
        <ComponentePrueba />
      </TemaProvider>,
    )
    const boton = screen.getByText('cambiar')
    fireEvent.click(boton)
    fireEvent.click(boton)
    expect(screen.getByTestId('tema-actual')).toHaveTextContent('light')
  })

  it('el tema se guarda en localStorage al cambiar', () => {
    render(
      <TemaProvider>
        <ComponentePrueba />
      </TemaProvider>,
    )
    fireEvent.click(screen.getByText('cambiar'))
    expect(localStorage.getItem('tema')).toBe('dark')
  })
})
