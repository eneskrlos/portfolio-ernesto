import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { IdiomaProvider, useIdioma } from '../../src/context/IdiomaContext.jsx'

// Componente auxiliar para exponer el hook useIdioma en los tests
function ComponentePrueba() {
  const { idioma, cambiarIdioma, t } = useIdioma()
  return (
    <div>
      <span data-testid="idioma-actual">{idioma}</span>
      <span data-testid="texto-nav">{t.nav.sobreMi}</span>
      <button onClick={() => cambiarIdioma('en')}>en</button>
      <button onClick={() => cambiarIdioma('pt')}>pt</button>
      <button onClick={() => cambiarIdioma('fr')}>fr</button>
    </div>
  )
}

describe('IdiomaProvider', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('renderiza sus hijos sin errores', () => {
    render(
      <IdiomaProvider>
        <p>contenido hijo</p>
      </IdiomaProvider>,
    )
    expect(screen.getByText('contenido hijo')).toBeInTheDocument()
  })

  it('el idioma inicial por defecto es "es"', () => {
    render(
      <IdiomaProvider>
        <ComponentePrueba />
      </IdiomaProvider>,
    )
    expect(screen.getByTestId('idioma-actual')).toHaveTextContent('es')
  })

  it('cambiarIdioma("en") cambia el idioma a "en"', () => {
    render(
      <IdiomaProvider>
        <ComponentePrueba />
      </IdiomaProvider>,
    )
    fireEvent.click(screen.getByText('en'))
    expect(screen.getByTestId('idioma-actual')).toHaveTextContent('en')
  })

  it('cambiarIdioma("pt") cambia el idioma a "pt"', () => {
    render(
      <IdiomaProvider>
        <ComponentePrueba />
      </IdiomaProvider>,
    )
    fireEvent.click(screen.getByText('pt'))
    expect(screen.getByTestId('idioma-actual')).toHaveTextContent('pt')
  })

  it('el idioma se guarda en localStorage al cambiar', () => {
    render(
      <IdiomaProvider>
        <ComponentePrueba />
      </IdiomaProvider>,
    )
    fireEvent.click(screen.getByText('en'))
    expect(localStorage.getItem('idioma')).toBe('en')
  })

  it('t.nav.sobreMi retorna el texto correcto para cada idioma', () => {
    render(
      <IdiomaProvider>
        <ComponentePrueba />
      </IdiomaProvider>,
    )
    expect(screen.getByTestId('texto-nav')).toHaveTextContent('Sobre mí')

    fireEvent.click(screen.getByText('en'))
    expect(screen.getByTestId('texto-nav')).toHaveTextContent('About me')

    fireEvent.click(screen.getByText('pt'))
    expect(screen.getByTestId('texto-nav')).toHaveTextContent('Sobre mim')
  })

  it('cambiarIdioma con un código inválido no cambia el idioma', () => {
    render(
      <IdiomaProvider>
        <ComponentePrueba />
      </IdiomaProvider>,
    )
    fireEvent.click(screen.getByText('fr'))
    expect(screen.getByTestId('idioma-actual')).toHaveTextContent('es')
  })
})
