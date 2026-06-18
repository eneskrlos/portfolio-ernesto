# Plan de Integración: EmailJS en Formulario de Contacto
**Estado**: ⏳ Pendiente de aprobación
**Versión**: Adición al plan original
**Basado en**: docs/spec-v1.1.md

---

## Contexto

El formulario de contacto ya existe y funciona con validación visual.
Este plan agrega el envío real de emails mediante EmailJS.
Se implementa como una extensión del componente `ContactoForm` existente.

---

## Instrucciones para el agente

- Implementar UNA tarea a la vez, en orden
- Correr `npm test` al finalizar cada tarea
- NO pasar a la siguiente tarea si los tests fallan
- Esperar confirmación del desarrollador entre cada tarea
- NO hardcodear credenciales bajo ninguna circunstancia
- Las credenciales siempre desde `import.meta.env.VITE_EMAILJS_*`

---

## Tarea A — Instalar EmailJS y verificar variables de entorno

**Por qué:** Antes de tocar el componente, necesitamos confirmar que
la librería está disponible y que las variables de entorno están
correctamente configuradas en el proyecto.

**Qué hacer:**

```bash
npm install @emailjs/browser
```

Crear archivo `src/utils/verificarEnv.js`:
```js
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
```

**Tests a crear en `tests/utils/verificarEnv.test.js`:**
```
✓ la función retorna un objeto con la propiedad "configurado"
✓ si todas las variables existen, "configurado" es true
✓ si falta alguna variable, "configurado" es false
```

**Verificación manual adicional:**
Correr `npm run dev` y confirmar en consola que no hay errores.

**⏸ ESPERAR CONFIRMACIÓN antes de continuar con Tarea B**

**Commit:** `feat: instalar emailjs y utilidad de verificación de entorno`

---

## Tarea B — Crear servicio de envío de emails

**Por qué:** Separamos la lógica de envío del componente visual.
Esto hace el código más limpio, más fácil de testear y permite
cambiar el proveedor de email en el futuro sin tocar el formulario.

**Qué hacer:**
Crear `src/utils/enviarEmail.js`:

```js
import emailjs from '@emailjs/browser'

// Inicializar EmailJS con la clave pública
emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY)

/**
 * Envía un email de contacto usando EmailJS
 * @param {Object} datos - { nombre, email, motivo, mensaje }
 * @returns {Promise<{exito: boolean, error: string|null}>}
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
        mensaje: datos.mensaje
      }
    )
    return { exito: true, error: null }
  } catch (error) {
    return { exito: false, error: error.text || 'Error desconocido' }
  }
}
```

**Tests a crear en `tests/utils/enviarEmail.test.js`:**
```
✓ la función existe y es asíncrona
✓ retorna objeto con propiedad "exito" y "error"
✓ si emailjs.send resuelve, retorna { exito: true, error: null }
✓ si emailjs.send rechaza, retorna { exito: false, error: <mensaje> }
```
*(Nota: en los tests se hace mock de emailjs para no hacer llamadas reales)*

**⏸ ESPERAR CONFIRMACIÓN antes de continuar con Tarea C**

**Commit:** `feat: servicio de envío de email con manejo de errores`

---

## Tarea C — Actualizar el componente ContactoForm

**Por qué:** Conectamos el formulario existente con el servicio de envío.
El componente ya tiene validación — solo necesita agregar el estado de
carga y llamar a `enviarEmail` al hacer submit válido.

**Qué hacer:**
Actualizar `src/components/ContactoForm/ContactoForm.jsx`:

Agregar al estado existente:
```js
const [enviando, setEnviando] = useState(false)
const [errorEnvio, setErrorEnvio] = useState(null)
```

Actualizar la función `handleSubmit`:
```js
// 1. Validar campos (lógica existente)
// 2. Si hay errores, mostrarlos y parar
// 3. Si es válido:
setEnviando(true)
setErrorEnvio(null)
const resultado = await enviarEmail({ nombre, email, motivo, mensaje })
setEnviando(false)

if (resultado.exito) {
  setEnviado(true)  // muestra panel de éxito (ya existe)
} else {
  setErrorEnvio('Hubo un problema al enviar. Escríbeme directamente a erneskrlos@gmail.com')
}
```

Actualizar el botón de submit:
```jsx
<button type="submit" disabled={enviando}>
  {enviando ? 'Enviando...' : 'Enviar mensaje'}
</button>
```

Mostrar el error de envío si existe:
```jsx
{errorEnvio && <p className={styles.errorEnvio}>{errorEnvio}</p>}
```

**Tests a actualizar en `tests/components/ContactoForm.test.jsx`:**
```
✓ el botón muestra "Enviando..." mientras se procesa
✓ el botón está desactivado mientras se procesa
✓ si el envío es exitoso, muestra el panel de éxito
✓ si el envío falla, muestra el mensaje de error con el email directo
✓ el mensaje de error contiene "erneskrlos@gmail.com"
```

**⏸ ESPERAR CONFIRMACIÓN antes de continuar con Tarea D**

**Commit:** `feat: conectar formulario con EmailJS, estados de carga y error`

---

## Tarea D — Prueba real y deploy

**Por qué:** Los tests verifican la lógica, pero necesitamos confirmar
que el email llega realmente al correo. Esta tarea hace la prueba
manual completa y sube los cambios a producción.

**Qué hacer:**

1. Correr `npm run dev`
2. Completar el formulario con datos reales de prueba
3. Hacer submit y verificar que llega el email a `erneskrlos@gmail.com`
4. Verificar que el panel de éxito se muestra correctamente
5. Correr `npm test` → todos los tests deben pasar
6. Correr `npm run build` → sin errores
7. Hacer push a GitHub:
```bash
git push
```
Vercel redespliega automáticamente en ~1 minuto.

8. Probar el formulario en `portfolio-ernesto.vercel.app` con datos reales
9. Confirmar que el email llega desde producción también

**⏸ ESPERAR CONFIRMACIÓN del desarrollador de que el email llegó**

**Commit:** `feat: integración EmailJS completa y verificada`

---

## Resumen

| # | Tarea | Tests | Estado |
|---|---|---|---|
| A | Instalar EmailJS + verificar entorno | 3 tests | ⏳ |
| B | Servicio de envío de email | 4 tests | ⏳ |
| C | Actualizar ContactoForm | 5 tests | ⏳ |
| D | Prueba real + deploy | Manual + build | ⏳ |

**Tests nuevos: 12**
