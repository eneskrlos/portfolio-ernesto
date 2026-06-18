// Verifica que las variables de entorno de EmailJS estén definidas
export function verificarConfigEmailJS() {
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

  return {
    configurado: Boolean(serviceId && templateId && publicKey),
    serviceId,
    templateId,
    publicKey
  }
}
