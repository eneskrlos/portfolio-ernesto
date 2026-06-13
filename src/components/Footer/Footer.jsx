import { perfil } from '../../data/contenido.js'
import styles from './Footer.module.css'

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.contenedor}>
        <p className={styles.copyright}>
          © 2025 {perfil.nombre}
        </p>

        <ul className={styles.links}>
          <li>
            <a
              href={`mailto:${perfil.email}`}
              target="_blank"
              rel="noreferrer"
              className={styles.link}
            >
              {perfil.email}
            </a>
          </li>
          <li>
            <a
              href={perfil.whatsapp}
              target="_blank"
              rel="noreferrer"
              className={styles.link}
            >
              WhatsApp
            </a>
          </li>
          <li>
            <a
              href={perfil.linkedin}
              target="_blank"
              rel="noreferrer"
              className={styles.link}
            >
              LinkedIn
            </a>
          </li>
        </ul>
      </div>
    </footer>
  )
}

export default Footer
