import { perfil } from '../../data/contenido.js'
import { useIdioma } from '../../context/IdiomaContext.jsx'
import styles from './Footer.module.css'

function Footer() {
  const { t } = useIdioma()

  return (
    <footer className={styles.footer}>
      <div className={styles.contenedor}>
        <p className={styles.copyright}>
          {t.footer.copyright}
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
