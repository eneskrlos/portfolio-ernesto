import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import ContactoForm from '../../src/components/ContactoForm/ContactoForm.jsx'

// Rellena el formulario con datos válidos
function completarFormulario({ nombre = 'Juan Pérez', email = 'juan@ejemplo.com', motivo = 'trabajo', mensaje = 'Este es un mensaje de prueba con suficientes caracteres.' } = {}) {
  fireEvent.change(screen.getByLabelText('Nombre completo'), { target: { name: 'nombre', value: nombre } })
  fireEvent.change(screen.getByLabelText('Email'), { target: { name: 'email', value: email } })
  fireEvent.change(screen.getByLabelText('Motivo del contacto'), { target: { name: 'motivo', value: motivo } })
  fireEvent.change(screen.getByLabelText('Mensaje'), { target: { name: 'mensaje', value: mensaje } })
}

describe('ContactoForm', () => {
  it('renderiza los 4 campos del formulario', () => {
    render(<ContactoForm />)
    expect(screen.getByLabelText('Nombre completo')).toBeInTheDocument()
    expect(screen.getByLabelText('Email')).toBeInTheDocument()
    expect(screen.getByLabelText('Motivo del contacto')).toBeInTheDocument()
    expect(screen.getByLabelText('Mensaje')).toBeInTheDocument()
  })

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

  it('al completar todos los campos válidos y hacer submit, muestra el panel de éxito', () => {
    render(<ContactoForm />)
    completarFormulario()
    fireEvent.click(screen.getByText('Enviar mensaje'))
    expect(screen.getByText(/recibimos tu mensaje/i)).toBeInTheDocument()
  })

  it('el panel de éxito contiene el nombre ingresado', () => {
    render(<ContactoForm />)
    completarFormulario({ nombre: 'María García' })
    fireEvent.click(screen.getByText('Enviar mensaje'))
    expect(screen.getByText('María García')).toBeInTheDocument()
  })

  it('el panel de éxito contiene el email ingresado', () => {
    render(<ContactoForm />)
    completarFormulario({ email: 'maria@ejemplo.com' })
    fireEvent.click(screen.getByText('Enviar mensaje'))
    expect(screen.getByText('maria@ejemplo.com')).toBeInTheDocument()
  })

  it('el botón "Enviar otro mensaje" resetea el formulario', () => {
    render(<ContactoForm />)
    completarFormulario()
    fireEvent.click(screen.getByText('Enviar mensaje'))
    fireEvent.click(screen.getByText('Enviar otro mensaje'))
    expect(screen.getByLabelText('Nombre completo')).toHaveValue('')
    expect(screen.getByLabelText('Email')).toHaveValue('')
    expect(screen.getByLabelText('Mensaje')).toHaveValue('')
  })
})
