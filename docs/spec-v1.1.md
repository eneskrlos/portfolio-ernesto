# Spec v1.1 — Cambios sobre v1.0
**Estado**: ⏳ Pendiente de aprobación del desarrollador
**Versión**: 1.1
**Fecha**: Junio 2026
**Base**: spec-v1.0.md (todo lo que no aparece aquí permanece igual)

---

## Cambios en esta versión

### 1. Sección 2.6 — Formulario de Contacto (reemplaza la de v1.0)

Formulario con validación real y envío de email mediante **EmailJS**.

Campos:
- Nombre completo (texto, requerido)
- Email (email, requerido)
- Motivo del contacto (select): Trabajo / Proyecto freelance / Consulta / Otro
- Mensaje (textarea, mínimo 20 caracteres, requerido)

Comportamiento:
- Validación en el frontend antes de enviar
- Cada campo muestra borde rojo + mensaje de error si está vacío o es inválido
- El botón "Enviar mensaje" se desactiva mientras el envío está en proceso
  para evitar doble envío, mostrando el texto "Enviando..."
- Al enviar con éxito: mostrar panel de éxito:
  "¡Gracias [Nombre]! Tu mensaje fue enviado. Te responderé pronto a [Email]."
- Botón "Enviar otro mensaje" que resetea el formulario
- Si EmailJS falla: mostrar error:
  "Hubo un problema al enviar. Escríbeme directamente a erneskrlos@gmail.com"

Integración con EmailJS:
- Instalar: `npm install @emailjs/browser`
- Las credenciales se leen desde variables de entorno, NUNCA hardcodeadas:
  - `import.meta.env.VITE_EMAILJS_SERVICE_ID`
  - `import.meta.env.VITE_EMAILJS_TEMPLATE_ID`
  - `import.meta.env.VITE_EMAILJS_PUBLIC_KEY`
- Los nombres de las variables del template deben coincidir exactamente:
  `nombre`, `email`, `motivo`, `mensaje`
- Inicializar EmailJS en el componente con `emailjs.init(PUBLIC_KEY)`