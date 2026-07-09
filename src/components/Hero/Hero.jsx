import { useState } from 'react'
import { perfil } from '../../data/contenido.js'
import { useIdioma } from '../../context/IdiomaContext.jsx'
import styles from './Hero.module.css'

function Hero() {
  const [fotoFallo, setFotoFallo] = useState(false)
  const { t } = useIdioma()

  return (
    <section id="sobre-mi" className={styles.hero}>
      <div className={styles.contenedor}>

        <div className={styles.columnaTexto}>
          <p className={styles.saludo}>{t.hero.saludo}</p>
          <h1 className={styles.nombre}>{perfil.nombre}</h1>
          <h2 className={styles.titulo}>{t.hero.titulo}</h2>
          <p className={styles.descripcion}>{t.hero.descripcion}</p>

          <div className={styles.botones}>
            <a href="#proyectos" className={styles.botonPrimario}>
              {t.hero.btnProyectos}
            </a>
            <a href="#contacto" className={styles.botonSecundario}>
              {t.hero.btnContacto}
            </a>
          </div>
        </div>

        <div className={styles.columnaFoto}>
          {fotoFallo ? (
            // Placeholder con iniciales cuando la imagen no está disponible
            <div className={styles.placeholder} aria-label={`Iniciales de ${perfil.nombre}`}>
              {perfil.iniciales}
            </div>
          ) : (
            <img
              src={perfil.foto}
              alt={`Foto de perfil de ${perfil.nombre}`}
              className={styles.foto}
              onError={() => setFotoFallo(true)}
            />
          )}
        </div>

      </div>
    </section>
  )
}

export default Hero
