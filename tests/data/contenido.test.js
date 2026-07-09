import { describe, it, expect } from 'vitest'
import { perfil, experiencia, proyectos, habilidades, navLinks } from '../../src/data/contenido.js'

describe('perfil', () => {
  it('tiene todos los campos requeridos', () => {
    expect(perfil.nombre).toBeTruthy()
    expect(perfil.email).toBeTruthy()
    expect(perfil.linkedin).toBeTruthy()
    expect(perfil.foto).toBeTruthy()
  })
})

describe('experiencia', () => {
  it('tiene exactamente 6 ítems', () => {
    expect(experiencia).toHaveLength(6)
  })

  it('cada ítem tiene empresa y periodo', () => {
    experiencia.forEach((item) => {
      expect(item.empresa).toBeTruthy()
      expect(item.periodo).toBeTruthy()
    })
  })
})

describe('proyectos', () => {
  it('tiene exactamente 4 ítems', () => {
    expect(proyectos).toHaveLength(4)
  })

  it('cada proyecto tiene id, titulo y array de tecnologias', () => {
    proyectos.forEach((proyecto) => {
      expect(proyecto.id).toBeTruthy()
      expect(proyecto.titulo).toBeTruthy()
      expect(Array.isArray(proyecto.tecnologias)).toBe(true)
      expect(proyecto.tecnologias.length).toBeGreaterThan(0)
    })
  })
})

describe('habilidades', () => {
  it('tiene las 3 categorías (frontend, backend, herramientas)', () => {
    expect(habilidades.frontend).toBeDefined()
    expect(habilidades.backend).toBeDefined()
    expect(habilidades.herramientas).toBeDefined()
  })

  it('cada categoría tiene al menos 1 ítem', () => {
    expect(habilidades.frontend.length).toBeGreaterThan(0)
    expect(habilidades.backend.length).toBeGreaterThan(0)
    expect(habilidades.herramientas.length).toBeGreaterThan(0)
  })
})

describe('navLinks', () => {
  it('tiene exactamente 5 ítems', () => {
    expect(navLinks).toHaveLength(5)
  })
})
