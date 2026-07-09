import { useState } from 'react'
import styles from './ContactoForm.module.css'
import { enviarEmail } from '../../utils/enviarEmail'
import { useIdioma } from '../../context/IdiomaContext.jsx'

const ESTADO_INICIAL = {
  nombre: '',
  email: '',
  motivo: '',
  mensaje: '',
}

function validar(campos, t) {
  const errores = {}
  const e = t.contacto.errores

  if (!campos.nombre.trim()) {
    errores.nombre = e.nombreRequerido
  }

  if (!campos.email.trim() || !campos.email.includes('@') || !campos.email.includes('.')) {
    errores.email = e.emailInvalido
  }

  if (!campos.motivo) {
    errores.motivo = e.motivoRequerido
  }

  if (!campos.mensaje.trim() || campos.mensaje.trim().length < 20) {
    errores.mensaje = e.mensajeCorto
  }

  return errores
}

// Divide la plantilla "...{{nombre}}...{{email}}..." en sus 3 partes de texto
// para poder resaltar nombre y email con <strong> sin perder el resto del mensaje
function partesMensajeExito(plantilla) {
  const [antes, entre, despues] = plantilla.split(/\{\{nombre\}\}|\{\{email\}\}/)
  return { antes, entre, despues }
}

function ContactoForm() {
  const { t } = useIdioma()
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
    const nuevosErrores = validar(campos, t)
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
      setErrorEnvio(t.contacto.errorEnvio)
    }
  }

  const reiniciar = () => {
    setCampos(ESTADO_INICIAL)
    setErrores({})
    setEnviado(false)
    setErrorEnvio(null)
  }

  if (enviado) {
    const { antes, entre, despues } = partesMensajeExito(t.contacto.exito)
    return (
      <section id="contacto" className={styles.seccion}>
        <div className={styles.contenedor}>
          <div className={styles.panelExito}>
            <p className={styles.mensajeExito}>
              {antes}
              <strong>{campos.nombre}</strong>
              {entre}
              <strong>{campos.email}</strong>
              {despues}
            </p>
            <button onClick={reiniciar} className={styles.botonReiniciar}>
              {t.contacto.btnOtroMensaje}
            </button>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="contacto" className={styles.seccion}>
      <div className={styles.contenedor}>
        <h2 className={styles.titulo}>{t.contacto.titulo}</h2>

        <form onSubmit={manejarSubmit} className={styles.formulario} noValidate>

          <div className={styles.campo}>
            <label htmlFor="nombre" className={styles.etiqueta}>
              {t.contacto.nombre}
            </label>
            <input
              id="nombre"
              name="nombre"
              type="text"
              value={campos.nombre}
              onChange={manejarCambio}
              className={`${styles.input} ${errores.nombre ? styles.inputError : ''}`}
            />
            {errores.nombre && (
              <span className={styles.error}>{errores.nombre}</span>
            )}
          </div>

          <div className={styles.campo}>
            <label htmlFor="email" className={styles.etiqueta}>
              {t.contacto.email}
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
              {t.contacto.motivo}
            </label>
            <select
              id="motivo"
              name="motivo"
              value={campos.motivo}
              onChange={manejarCambio}
              className={`${styles.input} ${errores.motivo ? styles.inputError : ''}`}
            >
              <option value="">{t.contacto.errores.motivoRequerido}</option>
              <option value="trabajo">{t.contacto.motivoOpciones.trabajo}</option>
              <option value="freelance">{t.contacto.motivoOpciones.freelance}</option>
              <option value="consulta">{t.contacto.motivoOpciones.consulta}</option>
              <option value="otro">{t.contacto.motivoOpciones.otro}</option>
            </select>
            {errores.motivo && (
              <span className={styles.error}>{errores.motivo}</span>
            )}
          </div>

          <div className={styles.campo}>
            <label htmlFor="mensaje" className={styles.etiqueta}>
              {t.contacto.mensaje}
            </label>
            <textarea
              id="mensaje"
              name="mensaje"
              value={campos.mensaje}
              onChange={manejarCambio}
              className={`${styles.textarea} ${errores.mensaje ? styles.inputError : ''}`}
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
            {enviando ? t.contacto.btnEnviando : t.contacto.btnEnviar}
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
