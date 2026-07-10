import { proyectos } from '../../data/contenido.js'
import { useIdioma } from '../../context/IdiomaContext.jsx'
import { useScrollAnimation } from '../../hooks/useScrollAnimation.js'
import styles from './Proyectos.module.css'

// Componente aparte porque cada tarjeta necesita su propia instancia del hook
// (los hooks no pueden llamarse dentro de un .map())
function TarjetaProyecto({ proyecto, descripcion, indice }) {
  const { ref, visible } = useScrollAnimation(0.1)

  return (
    <article
      ref={ref}
      className={`${styles.tarjeta} ${visible ? styles.visible : ''}`}
      style={{ transitionDelay: `${indice * 150}ms` }}
    >
      <h3 className={styles.tituloProyecto}>{proyecto.titulo}</h3>
      <p className={styles.descripcion}>{descripcion}</p>

      <ul className={styles.listaBadges} aria-label="Tecnologías utilizadas">
        {proyecto.tecnologias.map((tech) => (
          <li key={tech} className={styles.badge}>
            {tech}
          </li>
        ))}
      </ul>
    </article>
  )
}

function Proyectos() {
  const { t } = useIdioma()

  return (
    <section id="proyectos" className={styles.seccion}>
      <div className={styles.contenedor}>
        <h2 className={styles.titulo}>{t.proyectos.titulo}</h2>

        <div className={styles.grilla}>
          {proyectos.map((proyecto, indice) => (
            <TarjetaProyecto
              key={proyecto.id}
              proyecto={proyecto}
              descripcion={t.proyectos.items[proyecto.id].descripcion}
              indice={indice}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Proyectos
