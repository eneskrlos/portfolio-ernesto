import { describe, it, expect, afterEach, vi } from 'vitest'
import { verificarConfigEmailJS } from '../../src/utils/verificarEnv.js'

describe('verificarConfigEmailJS', () => {
  // Limpiar stubs de entorno después de cada test
  afterEach(() => {
    vi.unstubAllEnvs()
  })

  it('retorna un objeto con la propiedad "configurado"', () => {
    const resultado = verificarConfigEmailJS()
    expect(resultado).toHaveProperty('configurado')
  })

  it('si todas las variables existen, "configurado" es true', () => {
    vi.stubEnv('VITE_EMAILJS_SERVICE_ID', 'service_test')
    vi.stubEnv('VITE_EMAILJS_TEMPLATE_ID', 'template_test')
    vi.stubEnv('VITE_EMAILJS_PUBLIC_KEY', 'pubkey_test')

    const resultado = verificarConfigEmailJS()
    expect(resultado.configurado).toBe(true)
  })

  it('si falta alguna variable, "configurado" es false', () => {
    vi.stubEnv('VITE_EMAILJS_SERVICE_ID', 'service_test')
    vi.stubEnv('VITE_EMAILJS_TEMPLATE_ID', 'template_test')
    // Forzar PUBLIC_KEY a vacío para simular que falta (el .env puede tenerla definida)
    vi.stubEnv('VITE_EMAILJS_PUBLIC_KEY', '')

    const resultado = verificarConfigEmailJS()
    expect(resultado.configurado).toBe(false)
  })
})
