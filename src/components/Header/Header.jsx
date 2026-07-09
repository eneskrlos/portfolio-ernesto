import { useState, useEffect } from 'react'
import { perfil, navLinks } from '../../data/contenido.js'
import { useTema } from '../../context/TemaContext.jsx'
import { useIdioma } from '../../context/IdiomaContext.jsx'
import styles from './Header.module.css'

// Relaciona el href de cada link de navegación con su clave de traducción,
// así el orden y las rutas siguen viniendo de contenido.js
const CLAVES_NAV = {
  '#sobre-mi': 'sobreMi',
  '#experiencia': 'experiencia',
  '#proyectos': 'proyectos',
  '#habilidades': 'habilidades',
  '#contacto': 'contacto',
}

const IDIOMAS = ['es', 'en', 'pt']

function Header() {
  const [conSombra, setConSombra] = useState(false)
  const { tema, toggleTema } = useTema()
  const { idioma, cambiarIdioma, t } = useIdioma()

  // Agrega sombra al header cuando el scroll supera los 50px
  useEffect(() => {
    const manejarScroll = () => setConSombra(window.scrollY > 50)
    window.addEventListener('scroll', manejarScroll)
    return () => window.removeEventListener('scroll', manejarScroll)
  }, [])

  return (
    <header className={`${styles.header} ${conSombra ? styles.conSombra : ''}`}>
      <div className={styles.contenedor}>
        <a href="#sobre-mi" className={styles.logo}>
          Ernesto Carlos
        </a>

        <nav className={styles.nav}>
          <ul className={styles.listaNav}>
            {navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} className={styles.linkNav}>
                  {t.nav[CLAVES_NAV[link.href]]}
                </a>
              </li>
            ))}
          </ul>

          <a
            href={perfil.linkedin}
            target="_blank"
            rel="noreferrer"
            className={styles.linkLinkedIn}
          >
            LinkedIn
          </a>

          <div className={styles.selectorIdioma}>
            {IDIOMAS.map((codigo) => (
              <button
                key={codigo}
                type="button"
                onClick={() => cambiarIdioma(codigo)}
                className={`${styles.botonIdioma} ${idioma === codigo ? styles.activo : ''}`}
              >
                {codigo.toUpperCase()}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={toggleTema}
            className={styles.botonTema}
            aria-label={tema === 'light' ? 'Activar modo oscuro' : 'Activar modo claro'}
          >
            {tema === 'light' ? '🌙' : '☀️'}
          </button>
        </nav>
      </div>
    </header>
  )
}

export default Header
