import { habilidades } from '../../data/contenido.js'
import { useIdioma } from '../../context/IdiomaContext.jsx'
import styles from './Habilidades.module.css'

const CATEGORIAS = ['frontend', 'backend', 'herramientas', 'metodologias']

function Habilidades() {
  const { t } = useIdioma()

  return (
    <section id="habilidades" className={styles.seccion}>
      <div className={styles.contenedor}>
        <h2 className={styles.titulo}>{t.habilidades.titulo}</h2>

        <div className={styles.grupos}>
          {CATEGORIAS.map((clave) => (
            <div key={clave} className={styles.grupo}>
              <h3 className={styles.categoria}>{t.habilidades[clave]}</h3>
              <ul className={styles.listaBadges}>
                {habilidades[clave].map((tech) => (
                  <li key={tech} className={styles.badge}>
                    {tech}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Habilidades
