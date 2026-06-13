import { experiencia } from '../../data/contenido.js'
import styles from './Experiencia.module.css'

function Experiencia() {
  return (
    <section id="experiencia" className={styles.seccion}>
      <div className={styles.contenedor}>
        <h2 className={styles.titulo}>Experiencia Laboral</h2>

        <ol className={styles.timeline}>
          {experiencia.map((item) => (
            <li key={item.empresa} className={styles.item}>
              <div className={styles.punto} />
              <div className={styles.datos}>
                <span className={styles.empresa}>{item.empresa}</span>
                <span className={styles.periodo}>{item.periodo}</span>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

export default Experiencia
