import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const rutaIndexCss = resolve(process.cwd(), 'src/index.css')
const cssContenido = readFileSync(rutaIndexCss, 'utf-8')

// Extrae el bloque { ... } de un selector dado del CSS
function extraerBloque(selectorRegex) {
  const match = cssContenido.match(selectorRegex)
  return match ? match[1] : null
}

const bloqueRoot = extraerBloque(/:root\s*{([^}]*)}/s)
const bloqueOscuro = extraerBloque(/\[data-theme=['"]dark['"]\]\s*{([^}]*)}/s)

describe('variables CSS globales en index.css', () => {
  it('define --color-bg en :root', () => {
    expect(bloqueRoot).toMatch(/--color-bg:/)
  })

  it('define --color-primary en :root', () => {
    expect(bloqueRoot).toMatch(/--color-primary:/)
  })

  it('define --color-text en :root', () => {
    expect(bloqueRoot).toMatch(/--color-text:/)
  })

  it('tiene el selector [data-theme="dark"]', () => {
    expect(cssContenido).toMatch(/\[data-theme=['"]dark['"]\]/)
  })

  it('en modo oscuro --color-bg es diferente al de modo claro', () => {
    const bgClaro = bloqueRoot.match(/--color-bg:\s*([^;]+);/)[1].trim()
    const bgOscuro = bloqueOscuro.match(/--color-bg:\s*([^;]+);/)[1].trim()

    expect(bgOscuro).not.toBe(bgClaro)
  })
})
