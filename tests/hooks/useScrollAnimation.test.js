import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useScrollAnimation } from '../../src/hooks/useScrollAnimation.js'

// Mock controlable de IntersectionObserver: guarda el callback que le pasa el
// hook para poder disparar manualmente una "intersección" desde el test
let dispararInterseccion
const observerOriginal = globalThis.IntersectionObserver

class IntersectionObserverMock {
  constructor(callback) {
    dispararInterseccion = (isIntersecting) => callback([{ isIntersecting }])
  }
  observe() {}
  disconnect() {}
}

beforeEach(() => {
  globalThis.IntersectionObserver = IntersectionObserverMock
})

afterEach(() => {
  globalThis.IntersectionObserver = observerOriginal
  vi.restoreAllMocks()
})

describe('useScrollAnimation', () => {
  it('retorna { ref, visible }', () => {
    const { result } = renderHook(() => useScrollAnimation())
    expect(result.current).toHaveProperty('ref')
    expect(result.current).toHaveProperty('visible')
  })

  it('visible comienza en false', () => {
    const { result } = renderHook(() => useScrollAnimation())
    expect(result.current.visible).toBe(false)
  })

  it('visible cambia a true cuando el IntersectionObserver dispara', () => {
    const { result } = renderHook(() => useScrollAnimation())

    act(() => {
      dispararInterseccion(true)
    })

    expect(result.current.visible).toBe(true)
  })
})
