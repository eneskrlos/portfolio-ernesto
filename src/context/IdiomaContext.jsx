import { createContext, useContext, useState } from 'react'
import es from '../locales/es.json'
import en from '../locales/en.json'
import pt from '../locales/pt.json'

const traducciones = { es, en, pt }
const idiomasValidos = ['es', 'en', 'pt']

const IdiomaContext = createContext({
  idioma: 'es',
  cambiarIdioma: () => {},
  t: es,
})

function obtenerIdiomaInicial() {
  const idiomaGuardado = localStorage.getItem('idioma')
  return idiomasValidos.includes(idiomaGuardado) ? idiomaGuardado : 'es'
}

export function IdiomaProvider({ children }) {
  const [idioma, setIdioma] = useState(obtenerIdiomaInicial)

  const cambiarIdioma = (codigo) => {
    if (!idiomasValidos.includes(codigo)) return
    setIdioma(codigo)
    localStorage.setItem('idioma', codigo)
  }

  return (
    <IdiomaContext.Provider value={{ idioma, cambiarIdioma, t: traducciones[idioma] }}>
      {children}
    </IdiomaContext.Provider>
  )
}

// El hook se co-ubica con el Provider a propósito (patrón Context de React);
// esto le quita granularidad al Fast Refresh de Vite, pero es aceptable aquí
// eslint-disable-next-line react-refresh/only-export-components
export function useIdioma() {
  return useContext(IdiomaContext)
}
