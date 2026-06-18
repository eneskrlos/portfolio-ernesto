import { useState } from 'react'
import styles from './ContactoForm.module.css'
import { enviarEmail } from '../../utils/enviarEmail'
import { perfil } from '../../data/contenido'

const ESTADO_INICIAL = {
  nombre: '',
  email: '',
  motivo: '',
  mensaje: '',
}

function validar(campos) {
  const errores = {}

  if (!campos.nombre.trim()) {
    errores.nombre = 'El nombre es requerido.'
  }

  if (!campos.email.trim()) {
    errores.email = 'El email es requerido.'
  } else if (!campos.email.includes('@') || !campos.email.includes('.')) {
    errores.email = 'Ingresá un email válido.'
  }

  if (!campos.motivo) {
    errores.motivo = 'Seleccioná un motivo.'
  }

  if (!campos.mensaje.trim()) {
    errores.mensaje = 'El mensaje es requerido.'
  } else if (campos.mensaje.trim().length < 20) {
    errores.mensaje = 'El mensaje debe tener al menos 20 caracteres.'
  }

  return errores
}

function ContactoForm() {
  const [campos, setCampos] = useState(ESTADO_INICIAL)
  const [errores, setErrores] = useState({})
  const [enviado, setEnviado] = useState(false)
  const [enviando, setEnviando] = useState(false)
  const [errorEnvio, setErrorEnvio] = useState(null)

  const manejarCambio = (e) => {
    const { name, value } = e.target
    setCampos((prev) => ({ ...prev, [name]: value }))
    // Limpiar el error del campo al editarlo
    if (errores[name]) {
      setErrores((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  const manejarSubmit = async (e) => {
    e.preventDefault()

    // 1. Validar — si hay errores, mostrarlos y detener el envío
    const nuevosErrores = validar(campos)
    if (Object.keys(nuevosErrores).length > 0) {
      setErrores(nuevosErrores)
      return
    }

    // 2. Llamar a EmailJS
    setEnviando(true)
    setErrorEnvio(null)
    const resultado = await enviarEmail(campos)
    setEnviando(false)

    if (resultado.exito) {
      setEnviado(true)
    } else {
      // El email de contacto directo viene de contenido.js, nunca hardcodeado
      setErrorEnvio(
        `Hubo un problema al enviar. Escríbeme directamente a ${perfil.email}`
      )
    }
  }

  const reiniciar = () => {
    setCampos(ESTADO_INICIAL)
    setErrores({})
    setEnviado(false)
    setErrorEnvio(null)
  }

  if (enviado) {
    return (
      <section id="contacto" className={styles.seccion}>
        <div className={styles.contenedor}>
          <div className={styles.panelExito}>
            <p className={styles.mensajeExito}>
              ¡Gracias <strong>{campos.nombre}</strong>! Tu mensaje fue enviado.
              Te responderé pronto a <strong>{campos.email}</strong>.
            </p>
            <button onClick={reiniciar} className={styles.botonReiniciar}>
              Enviar otro mensaje
            </button>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="contacto" className={styles.seccion}>
      <div className={styles.contenedor}>
        <h2 className={styles.titulo}>Contacto</h2>

        <form onSubmit={manejarSubmit} className={styles.formulario} noValidate>

          <div className={styles.campo}>
            <label htmlFor="nombre" className={styles.etiqueta}>
              Nombre completo
            </label>
            <input
              id="nombre"
              name="nombre"
              type="text"
              value={campos.nombre}
              onChange={manejarCambio}
              className={`${styles.input} ${errores.nombre ? styles.inputError : ''}`}
              placeholder="Tu nombre completo"
            />
            {errores.nombre && (
              <span className={styles.error}>{errores.nombre}</span>
            )}
          </div>

          <div className={styles.campo}>
            <label htmlFor="email" className={styles.etiqueta}>
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={campos.email}
              onChange={manejarCambio}
              className={`${styles.input} ${errores.email ? styles.inputError : ''}`}
              placeholder="tu@email.com"
            />
            {errores.email && (
              <span className={styles.error}>{errores.email}</span>
            )}
          </div>

          <div className={styles.campo}>
            <label htmlFor="motivo" className={styles.etiqueta}>
              Motivo del contacto
            </label>
            <select
              id="motivo"
              name="motivo"
              value={campos.motivo}
              onChange={manejarCambio}
              className={`${styles.input} ${errores.motivo ? styles.inputError : ''}`}
            >
              <option value="">Seleccioná un motivo</option>
              <option value="trabajo">Trabajo</option>
              <option value="freelance">Proyecto freelance</option>
              <option value="consulta">Consulta</option>
              <option value="otro">Otro</option>
            </select>
            {errores.motivo && (
              <span className={styles.error}>{errores.motivo}</span>
            )}
          </div>

          <div className={styles.campo}>
            <label htmlFor="mensaje" className={styles.etiqueta}>
              Mensaje
            </label>
            <textarea
              id="mensaje"
              name="mensaje"
              value={campos.mensaje}
              onChange={manejarCambio}
              className={`${styles.textarea} ${errores.mensaje ? styles.inputError : ''}`}
              placeholder="Contame en qué puedo ayudarte..."
              rows={5}
            />
            {errores.mensaje && (
              <span className={styles.error}>{errores.mensaje}</span>
            )}
          </div>

          <button
            type="submit"
            className={styles.botonEnviar}
            disabled={enviando}
          >
            {enviando ? 'Enviando...' : 'Enviar mensaje'}
          </button>

          {/* Mensaje de error si EmailJS falla */}
          {errorEnvio && (
            <p className={styles.errorEnvio}>{errorEnvio}</p>
          )}

        </form>
      </div>
    </section>
  )
}

export default ContactoForm
