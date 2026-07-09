import { describe, it, expect } from 'vitest'
import es from '../../src/locales/es.json'
import en from '../../src/locales/en.json'
import pt from '../../src/locales/pt.json'

// Recorre el JSON de traducciones y devuelve las rutas de claves (ej: "contacto.errores.mensajeCorto")
function obtenerRutasDeClaves(obj, prefijo = '') {
  return Object.entries(obj).flatMap(([clave, valor]) => {
    const ruta = prefijo ? `${prefijo}.${clave}` : clave
    return typeof valor === 'object' && valor !== null ? obtenerRutasDeClaves(valor, ruta) : [ruta]
  })
}

// Recorre el JSON de traducciones y devuelve solo los valores de texto (hojas del árbol)
function obtenerValores(obj) {
  return Object.values(obj).flatMap((valor) =>
    typeof valor === 'object' && valor !== null ? obtenerValores(valor) : [valor],
  )
}

const clavesEs = obtenerRutasDeClaves(es).sort()
const clavesEn = obtenerRutasDeClaves(en).sort()
const clavesPt = obtenerRutasDeClaves(pt).sort()

describe('archivos de traducción (es, en, pt)', () => {
  it('es.json tiene todas las claves requeridas', () => {
    const clavesEsperadas = [
      'nav.sobreMi',
      'nav.experiencia',
      'nav.proyectos',
      'nav.habilidades',
      'nav.contacto',
      'hero.saludo',
      'hero.titulo',
      'hero.descripcion',
      'hero.btnProyectos',
      'hero.btnContacto',
      'experiencia.titulo',
      'proyectos.titulo',
      'proyectos.items.sitioCorporativo.descripcion',
      'proyectos.items.backoffice.descripcion',
      'proyectos.items.apiMicroservicios.descripcion',
      'proyectos.items.plataformaTurismo.descripcion',
      'habilidades.titulo',
      'habilidades.frontend',
      'habilidades.backend',
      'habilidades.herramientas',
      'habilidades.metodologias',
      'contacto.titulo',
      'contacto.nombre',
      'contacto.email',
      'contacto.motivo',
      'contacto.motivoOpciones.trabajo',
      'contacto.motivoOpciones.freelance',
      'contacto.motivoOpciones.consulta',
      'contacto.motivoOpciones.otro',
      'contacto.mensaje',
      'contacto.btnEnviar',
      'contacto.btnEnviando',
      'contacto.btnOtroMensaje',
      'contacto.exito',
      'contacto.errorEnvio',
      'contacto.errores.nombreRequerido',
      'contacto.errores.emailInvalido',
      'contacto.errores.motivoRequerido',
      'contacto.errores.mensajeCorto',
      'footer.copyright',
    ].sort()

    expect(clavesEs).toEqual(clavesEsperadas)
  })

  it('en.json tiene exactamente las mismas claves que es.json', () => {
    expect(clavesEn).toEqual(clavesEs)
  })

  it('pt.json tiene exactamente las mismas claves que es.json', () => {
    expect(clavesPt).toEqual(clavesEs)
  })

  it('ningún valor en es.json está vacío', () => {
    obtenerValores(es).forEach((valor) => expect(valor.trim()).not.toBe(''))
  })

  it('ningún valor en en.json está vacío', () => {
    obtenerValores(en).forEach((valor) => expect(valor.trim()).not.toBe(''))
  })

  it('ningún valor en pt.json está vacío', () => {
    obtenerValores(pt).forEach((valor) => expect(valor.trim()).not.toBe(''))
  })

  it('los valores de en.json son diferentes a los de es.json', () => {
    expect(JSON.stringify(en)).not.toBe(JSON.stringify(es))
  })

  it('los valores de pt.json son diferentes a los de es.json', () => {
    expect(JSON.stringify(pt)).not.toBe(JSON.stringify(es))
  })
})
