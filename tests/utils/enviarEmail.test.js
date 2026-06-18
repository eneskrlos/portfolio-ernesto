import { describe, it, expect, vi, beforeEach } from 'vitest'

// Mock del módulo @emailjs/browser — sin llamadas reales a la API
vi.mock('@emailjs/browser', () => ({
  default: {
    init: vi.fn(),
    send: vi.fn(),
  },
}))

import emailjs from '@emailjs/browser'
import { enviarEmail } from '../../src/utils/enviarEmail.js'

const DATOS_PRUEBA = {
  nombre: 'Juan Pérez',
  email: 'juan@ejemplo.com',
  motivo: 'trabajo',
  mensaje: 'Mensaje de prueba con suficientes caracteres.',
}

describe('enviarEmail', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('la función existe y es asíncrona', () => {
    // Una función async devuelve una Promise al invocarse
    emailjs.send.mockResolvedValueOnce({})
    const resultado = enviarEmail(DATOS_PRUEBA)
    expect(resultado).toBeInstanceOf(Promise)
  })

  it('retorna objeto con las propiedades "exito" y "error"', async () => {
    emailjs.send.mockResolvedValueOnce({})
    const resultado = await enviarEmail(DATOS_PRUEBA)
    expect(resultado).toHaveProperty('exito')
    expect(resultado).toHaveProperty('error')
  })

  it('si emailjs.send resuelve, retorna { exito: true, error: null }', async () => {
    emailjs.send.mockResolvedValueOnce({})
    const resultado = await enviarEmail(DATOS_PRUEBA)
    expect(resultado).toEqual({ exito: true, error: null })
  })

  it('si emailjs.send rechaza, retorna { exito: false, error: <mensaje> }', async () => {
    emailjs.send.mockRejectedValueOnce({ text: 'Service unavailable' })
    const resultado = await enviarEmail(DATOS_PRUEBA)
    expect(resultado.exito).toBe(false)
    expect(resultado.error).toBe('Service unavailable')
  })
})
