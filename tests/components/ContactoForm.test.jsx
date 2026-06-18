import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react'
import ContactoForm from '../../src/components/ContactoForm/ContactoForm.jsx'

// Mock del servicio de envío — los tests no hacen llamadas reales a EmailJS
vi.mock('../../src/utils/enviarEmail.js', () => ({
  enviarEmail: vi.fn(),
}))

import { enviarEmail } from '../../src/utils/enviarEmail.js'

// Rellena el formulario con datos válidos
function completarFormulario({
  nombre = 'Juan Pérez',
  email = 'juan@ejemplo.com',
  motivo = 'trabajo',
  mensaje = 'Este es un mensaje de prueba con suficientes caracteres.',
} = {}) {
  fireEvent.change(screen.getByLabelText('Nombre completo'), { target: { name: 'nombre', value: nombre } })
  fireEvent.change(screen.getByLabelText('Email'),           { target: { name: 'email',  value: email  } })
  fireEvent.change(screen.getByLabelText('Motivo del contacto'), { target: { name: 'motivo', value: motivo } })
  fireEvent.change(screen.getByLabelText('Mensaje'),         { target: { name: 'mensaje', value: mensaje } })
}

describe('ContactoForm', () => {
  beforeEach(() => {
    // Por defecto el envío tiene éxito; cada test puede sobreescribirlo
    enviarEmail.mockResolvedValue({ exito: true, error: null })
  })

  // ─── Renderizado ────────────────────────────────────────────────────────────

  it('renderiza los 4 campos del formulario', () => {
    render(<ContactoForm />)
    expect(screen.getByLabelText('Nombre completo')).toBeInTheDocument()
    expect(screen.getByLabelText('Email')).toBeInTheDocument()
    expect(screen.getByLabelText('Motivo del contacto')).toBeInTheDocument()
    expect(screen.getByLabelText('Mensaje')).toBeInTheDocument()
  })

  // ─── Validación (síncrona, no depende de EmailJS) ───────────────────────────

  it('al hacer submit vacío, muestra errores en todos los campos requeridos', () => {
    render(<ContactoForm />)
    fireEvent.click(screen.getByText('Enviar mensaje'))
    expect(screen.getByText('El nombre es requerido.')).toBeInTheDocument()
    expect(screen.getByText('El email es requerido.')).toBeInTheDocument()
    expect(screen.getByText('Seleccioná un motivo.')).toBeInTheDocument()
    expect(screen.getByText('El mensaje es requerido.')).toBeInTheDocument()
  })

  it('un email sin "@" muestra error de formato', () => {
    render(<ContactoForm />)
    fireEvent.change(screen.getByLabelText('Email'), { target: { name: 'email', value: 'correosinArroba.com' } })
    fireEvent.click(screen.getByText('Enviar mensaje'))
    expect(screen.getByText('Ingresá un email válido.')).toBeInTheDocument()
  })

  it('un mensaje de menos de 20 caracteres muestra error', () => {
    render(<ContactoForm />)
    fireEvent.change(screen.getByLabelText('Mensaje'), { target: { name: 'mensaje', value: 'Corto' } })
    fireEvent.click(screen.getByText('Enviar mensaje'))
    expect(screen.getByText('El mensaje debe tener al menos 20 caracteres.')).toBeInTheDocument()
  })

  // ─── Panel de éxito (asíncrono) ─────────────────────────────────────────────

  it('al completar todos los campos válidos y hacer submit, muestra el panel de éxito', async () => {
    render(<ContactoForm />)
    completarFormulario()
    fireEvent.click(screen.getByText('Enviar mensaje'))
    await waitFor(() => {
      expect(screen.getByText(/tu mensaje fue enviado/i)).toBeInTheDocument()
    })
  })

  it('el panel de éxito contiene el nombre ingresado', async () => {
    render(<ContactoForm />)
    completarFormulario({ nombre: 'María García' })
    fireEvent.click(screen.getByText('Enviar mensaje'))
    await waitFor(() => {
      expect(screen.getByText('María García')).toBeInTheDocument()
    })
  })

  it('el panel de éxito contiene el email ingresado', async () => {
    render(<ContactoForm />)
    completarFormulario({ email: 'maria@ejemplo.com' })
    fireEvent.click(screen.getByText('Enviar mensaje'))
    await waitFor(() => {
      expect(screen.getByText('maria@ejemplo.com')).toBeInTheDocument()
    })
  })

  it('el botón "Enviar otro mensaje" resetea el formulario', async () => {
    render(<ContactoForm />)
    completarFormulario()
    fireEvent.click(screen.getByText('Enviar mensaje'))
    await waitFor(() => screen.getByText('Enviar otro mensaje'))
    fireEvent.click(screen.getByText('Enviar otro mensaje'))
    expect(screen.getByLabelText('Nombre completo')).toHaveValue('')
    expect(screen.getByLabelText('Email')).toHaveValue('')
    expect(screen.getByLabelText('Mensaje')).toHaveValue('')
  })

  // ─── Estados de carga y error de EmailJS ────────────────────────────────────

  it('el botón muestra "Enviando..." mientras se procesa el envío', async () => {
    // Promesa que no resuelve hasta que lo decidamos
    let resolverEnvio
    enviarEmail.mockImplementationOnce(
      () => new Promise((resolve) => { resolverEnvio = resolve })
    )

    render(<ContactoForm />)
    completarFormulario()
    fireEvent.click(screen.getByText('Enviar mensaje'))

    await waitFor(() => {
      expect(screen.getByText('Enviando...')).toBeInTheDocument()
    })

    // Resolver para no dejar la promesa colgada
    await act(async () => { resolverEnvio({ exito: true, error: null }) })
  })

  it('el botón está desactivado mientras se procesa el envío', async () => {
    let resolverEnvio
    enviarEmail.mockImplementationOnce(
      () => new Promise((resolve) => { resolverEnvio = resolve })
    )

    render(<ContactoForm />)
    completarFormulario()
    fireEvent.click(screen.getByText('Enviar mensaje'))

    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'Enviando...' })).toBeDisabled()
    })

    await act(async () => { resolverEnvio({ exito: true, error: null }) })
  })

  it('si el envío es exitoso, muestra el panel de éxito', async () => {
    enviarEmail.mockResolvedValueOnce({ exito: true, error: null })

    render(<ContactoForm />)
    completarFormulario()
    fireEvent.click(screen.getByText('Enviar mensaje'))

    await waitFor(() => {
      expect(screen.getByText(/tu mensaje fue enviado/i)).toBeInTheDocument()
    })
  })

  it('si el envío falla, muestra el mensaje de error con el email directo', async () => {
    enviarEmail.mockResolvedValueOnce({ exito: false, error: 'Service error' })

    render(<ContactoForm />)
    completarFormulario()
    fireEvent.click(screen.getByText('Enviar mensaje'))

    await waitFor(() => {
      expect(screen.getByText(/hubo un problema al enviar/i)).toBeInTheDocument()
    })
  })

  it('el mensaje de error contiene el email de contacto directo', async () => {
    enviarEmail.mockResolvedValueOnce({ exito: false, error: 'Service error' })

    render(<ContactoForm />)
    completarFormulario()
    fireEvent.click(screen.getByText('Enviar mensaje'))

    await waitFor(() => {
      expect(screen.getByText(/erneskrlos@gmail\.com/i)).toBeInTheDocument()
    })
  })
})
