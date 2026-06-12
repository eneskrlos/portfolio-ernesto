import { useState } from 'react'
import { perfil } from '../../data/contenido.js'
import styles from './Hero.module.css'

function Hero() {
  const [fotoFallo, setFotoFallo] = useState(false)

  return (
    <section id="sobre-mi" className={styles.hero}>
      <div className={styles.contenedor}>

        <div className={styles.columnaTexto}>
          <p className={styles.saludo}>Hola, soy</p>
          <h1 className={styles.nombre}>{perfil.nombre}</h1>
          <h2 className={styles.titulo}>{perfil.titulo}</h2>
          <p className={styles.descripcion}>{perfil.descripcion}</p>

          <div className={styles.botones}>
            <a href="#proyectos" className={styles.botonPrimario}>
              Ver mis proyectos
            </a>
            <a href="#contacto" className={styles.botonSecundario}>
              Contactarme
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
