import { habilidades } from '../../data/contenido.js'
import styles from './Habilidades.module.css'

const categorias = [
  { clave: 'frontend', etiqueta: 'Frontend' },
  { clave: 'backend',  etiqueta: 'Backend' },
  { clave: 'herramientas', etiqueta: 'Herramientas' },
  { clave: 'metodologias', etiqueta: 'Metodologías' },
]

function Habilidades() {
  return (
    <section id="habilidades" className={styles.seccion}>
      <div className={styles.contenedor}>
        <h2 className={styles.titulo}>Stack Tecnológico</h2>

        <div className={styles.grupos}>
          {categorias.map(({ clave, etiqueta }) => (
            <div key={clave} className={styles.grupo}>
              <h3 className={styles.categoria}>{etiqueta}</h3>
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
