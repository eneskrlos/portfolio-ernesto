import emailjs from '@emailjs/browser'

// Inicializar EmailJS con la clave pública al cargar el módulo
emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY)

/**
 * Envía un email de contacto usando EmailJS.
 * @param {{ nombre: string, email: string, motivo: string, mensaje: string }} datos
 * @returns {Promise<{ exito: boolean, error: string|null }>}
 */
export async function enviarEmail(datos) {
  try {
    await emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      {
        nombre: datos.nombre,
        email: datos.email,
        motivo: datos.motivo,
        mensaje: datos.mensaje,
      }
    )
    return { exito: true, error: null }
  } catch (error) {
    return { exito: false, error: error.text || 'Error desconocido' }
  }
}
