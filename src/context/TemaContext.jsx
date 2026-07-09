import { createContext, useContext, useEffect, useState } from 'react'

const TemaContext = createContext({
  tema: 'light',
  toggleTema: () => {},
})

// window.matchMedia no está implementado en jsdom (entorno de tests),
// por eso se protege con try/catch y se asume modo claro por defecto
function prefiereModoOscuro() {
  try {
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  } catch {
    return false
  }
}

function obtenerTemaInicial() {
  const temaGuardado = localStorage.getItem('tema')
  if (temaGuardado === 'light' || temaGuardado === 'dark') {
    return temaGuardado
  }
  return prefiereModoOscuro() ? 'dark' : 'light'
}

export function TemaProvider({ children }) {
  const [tema, setTema] = useState(obtenerTemaInicial)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', tema)
  }, [tema])

  const toggleTema = () => {
    const nuevoTema = tema === 'light' ? 'dark' : 'light'
    setTema(nuevoTema)
    localStorage.setItem('tema', nuevoTema)
  }

  return <TemaContext.Provider value={{ tema, toggleTema }}>{children}</TemaContext.Provider>
}

// El hook se co-ubica con el Provider a propósito (patrón Context de React);
// esto le quita granularidad al Fast Refresh de Vite, pero es aceptable aquí
// eslint-disable-next-line react-refresh/only-export-components
export function useTema() {
  return useContext(TemaContext)
}
