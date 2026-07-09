import { useState, useEffect } from 'react'
import { perfil, navLinks } from '../../data/contenido.js'
import { useTema } from '../../context/TemaContext.jsx'
import styles from './Header.module.css'

function Header() {
  const [conSombra, setConSombra] = useState(false)
  const { tema, toggleTema } = useTema()

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
                  {link.label}
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
