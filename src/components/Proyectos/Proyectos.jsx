import { proyectos } from '../../data/contenido.js'
import { useIdioma } from '../../context/IdiomaContext.jsx'
import styles from './Proyectos.module.css'

function Proyectos() {
  const { t } = useIdioma()

  return (
    <section id="proyectos" className={styles.seccion}>
      <div className={styles.contenedor}>
        <h2 className={styles.titulo}>{t.proyectos.titulo}</h2>

        <div className={styles.grilla}>
          {proyectos.map((proyecto) => (
            <article key={proyecto.titulo} className={styles.tarjeta}>
              <h3 className={styles.tituloProyecto}>{proyecto.titulo}</h3>
              <p className={styles.descripcion}>{proyecto.descripcion}</p>

              <ul className={styles.listaBadges} aria-label="Tecnologías utilizadas">
                {proyecto.tecnologias.map((tech) => (
                  <li key={tech} className={styles.badge}>
                    {tech}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Proyectos
