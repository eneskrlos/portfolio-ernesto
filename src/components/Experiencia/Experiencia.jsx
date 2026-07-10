import { experiencia } from '../../data/contenido.js'
import { useIdioma } from '../../context/IdiomaContext.jsx'
import { useScrollAnimation } from '../../hooks/useScrollAnimation.js'
import styles from './Experiencia.module.css'

// Componente aparte porque cada ítem necesita su propia instancia del hook
// (los hooks no pueden llamarse dentro de un .map())
function ItemExperiencia({ item, indice }) {
  const { ref, visible } = useScrollAnimation()

  return (
    <li
      ref={ref}
      className={`${styles.item} ${visible ? styles.visible : ''}`}
      style={{ transitionDelay: `${indice * 100}ms` }}
    >
      <div className={styles.punto} />
      <div className={styles.datos}>
        <span className={styles.empresa}>{item.empresa}</span>
        <span className={styles.periodo}>{item.periodo}</span>
      </div>
    </li>
  )
}

function Experiencia() {
  const { t } = useIdioma()

  return (
    <section id="experiencia" className={styles.seccion}>
      <div className={styles.contenedor}>
        <h2 className={styles.titulo}>{t.experiencia.titulo}</h2>

        <ol className={styles.timeline}>
          {experiencia.map((item, indice) => (
            <ItemExperiencia key={item.empresa} item={item} indice={indice} />
          ))}
        </ol>
      </div>
    </section>
  )
}

export default Experiencia
