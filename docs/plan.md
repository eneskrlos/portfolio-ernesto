# Plan de Implementación: Portfolio Ernesto Carlos
**Estado**: ⏳ Pendiente de aprobación
**Basado en**: docs/spec.md v1.0
**Stack**: React + Vite + CSS Modules + Vitest

---

## Instrucciones para el agente

- Implementar UNA tarea a la vez, en orden numérico
- Correr `npm test` al finalizar cada tarea
- NO pasar a la siguiente si los tests fallan
- Hacer commit después de cada tarea que pase los tests
- Mensajes de commit en español
- Toda información personal se lee de `src/data/contenido.js`, nunca hardcodeada
- Si algo de la spec no está claro, PREGUNTAR antes de asumir

---

## Tarea 0 — Inicializar el proyecto

**Qué hacer:**
```bash
npm create vite@latest . -- --template react
npm install
npm install vitest @testing-library/react @testing-library/jest-dom jsdom --save-dev
```

Configurar Vitest en `vite.config.js`:
```js
test: {
  environment: 'jsdom',
  globals: true,
  setupFiles: './tests/setup.js'
}
```

Crear `tests/setup.js`:
```js
import '@testing-library/jest-dom'
```

Agregar en `package.json`:
```json
"test": "vitest run"
```

Limpiar los archivos de ejemplo que genera Vite:
- Borrar contenido de `src/App.css`
- Borrar contenido de `src/index.css` (mantener solo reset básico)
- Dejar `src/App.jsx` con un `<div>Portfolio</div>` vacío por ahora

Crear carpeta `public/images/` (vacía, el desarrollador pondrá su foto ahí).

**Test de validación:**
```bash
npm test       # 0 tests, debe correr sin errores
npm run dev    # debe abrir sin errores de consola
```

**Commit:** `chore: inicializar proyecto React + Vite + Vitest`

---

## Tarea 1 — Datos del portfolio (la fuente de verdad)

**Qué hacer:**
Crear `src/data/contenido.js` con toda la información personal exportada:

```js
export const perfil = {
  nombre: 'Ernesto Carlos Pérez García',
  titulo: 'Ingeniero de Software',
  descripcion: '...texto del Hero...',
  email: 'erneskrlos@gmail.com',
  telefono: '+59892738549',
  linkedin: 'https://www.linkedin.com/in/ernesto-carlos-perez-garcias-6176a312a',
  whatsapp: 'https://wa.me/+59892738549',
  foto: '/images/foto-perfil.jpg',
  iniciales: 'EC'
}

export const experiencia = [ ...array con los 4 trabajos... ]

export const proyectos = [ ...array con los 4 proyectos... ]

export const habilidades = {
  frontend: [...],
  backend: [...],
  herramientas: [...]
}

export const navLinks = [
  { label: 'Sobre mí', href: '#sobre-mi' },
  { label: 'Experiencia', href: '#experiencia' },
  { label: 'Proyectos', href: '#proyectos' },
  { label: 'Habilidades', href: '#habilidades' },
  { label: 'Contacto', href: '#contacto' },
]
```

**Tests a crear en `tests/data/contenido.test.js`:**
```
✓ perfil tiene todos los campos requeridos (nombre, email, linkedin, foto)
✓ experiencia tiene exactamente 4 ítems
✓ cada ítem de experiencia tiene empresa y periodo
✓ proyectos tiene exactamente 4 ítems
✓ cada proyecto tiene titulo, descripcion y array de tecnologias
✓ habilidades tiene las 3 categorías (frontend, backend, herramientas)
✓ cada categoría de habilidades tiene al menos 1 ítem
✓ navLinks tiene exactamente 5 ítems
```

**Commit:** `feat: archivo de datos del portfolio con tests`

---

## Tarea 2 — Header y navegación

**Qué hacer:**
Crear `src/components/Header/Header.jsx` y `Header.module.css`.

El Header es una barra fija (`position: fixed`) en la parte superior con:
- Nombre "Ernesto Carlos" a la izquierda
- Links de nav en el centro/derecha (vienen de `navLinks` en contenido.js)
- Link de LinkedIn que abre en nueva pestaña
- Al hacer scroll > 50px: agregar clase CSS que añade sombra a la barra
  (usar `useEffect` con `window.addEventListener('scroll', ...)`)
- Todos los links hacen scroll suave a su sección (atributo `href` con `#id`)

CSS global a agregar en `src/index.css`:
```css
html { scroll-behavior: smooth; }
* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: 'Inter', sans-serif; }
```

Agregar Google Fonts (Inter) en el `<head>` de `index.html`.

**Tests a crear en `tests/components/Header.test.jsx`:**
```
✓ renderiza el nombre "Ernesto Carlos"
✓ renderiza todos los links de navegación (5 links internos)
✓ el link de LinkedIn tiene target="_blank"
✓ el link de LinkedIn tiene rel="noreferrer"
```

**Commit:** `feat: Header con navegación y efecto scroll`

---

## Tarea 3 — Hero (Sobre mí)

**Qué hacer:**
Crear `src/components/Hero/Hero.jsx` y `Hero.module.css`.

Layout de dos columnas:
- Columna izquierda: saludo + nombre + título + descripción + dos botones
- Columna derecha: foto circular

La foto:
- Intentar cargar `perfil.foto` (la ruta de la imagen)
- Si la imagen falla (evento `onError`): mostrar un círculo con las iniciales
  `perfil.iniciales` ("EC") como fallback
- La foto tiene `alt` descriptivo

Los botones:
- "Ver mis proyectos" → `href="#proyectos"`
- "Contactarme" → `href="#contacto"`

La sección tiene `id="sobre-mi"` para que el nav pueda hacer scroll a ella.

**Tests a crear en `tests/components/Hero.test.jsx`:**
```
✓ renderiza el nombre completo de perfil
✓ renderiza el título profesional
✓ el botón "Ver mis proyectos" tiene href="#proyectos"
✓ el botón "Contactarme" tiene href="#contacto"
✓ la imagen tiene atributo alt no vacío
✓ si la imagen falla, se muestran las iniciales "EC"
```

**Commit:** `feat: sección Hero con foto y fallback de iniciales`

---

## Tarea 4 — Sección Experiencia

**Qué hacer:**
Crear `src/components/Experiencia/Experiencia.jsx` y `Experiencia.module.css`.

Renderizar la lista de experiencia desde `contenido.js` como un timeline vertical:
- Línea vertical a la izquierda
- Cada ítem tiene un punto en la línea, el nombre de la empresa y el período
- El ítem más reciente aparece primero (el array ya viene en ese orden)

La sección tiene `id="experiencia"`.

**Tests a crear en `tests/components/Experiencia.test.jsx`:**
```
✓ renderiza exactamente 4 ítems de experiencia
✓ el primer ítem es "CodeBerrySolutions"
✓ cada ítem muestra el nombre de la empresa
✓ cada ítem muestra el período
```

**Commit:** `feat: sección Experiencia con timeline`

---

## Tarea 5 — Sección Proyectos

**Qué hacer:**
Crear `src/components/Proyectos/Proyectos.jsx` y `Proyectos.module.css`.

Grilla de 2 columnas (en escritorio) con una tarjeta por proyecto.
Cada tarjeta muestra:
- Título del proyecto
- Descripción
- Tecnologías como badges (pequeñas etiquetas con fondo de color)

La sección tiene `id="proyectos"`.

**Tests a crear en `tests/components/Proyectos.test.jsx`:**
```
✓ renderiza exactamente 4 tarjetas de proyectos
✓ cada tarjeta tiene un título visible
✓ cada tarjeta muestra al menos una tecnología como badge
✓ el proyecto "API REST con Microservicios" aparece en el listado
```

**Commit:** `feat: sección Proyectos con tarjetas y badges de tecnologías`

---

## Tarea 6 — Sección Habilidades

**Qué hacer:**
Crear `src/components/Habilidades/Habilidades.jsx` y `Habilidades.module.css`.

Tres grupos con título de categoría y badges de tecnologías:
- Frontend
- Backend
- Herramientas

La sección tiene `id="habilidades"`.

**Tests a crear en `tests/components/Habilidades.test.jsx`:**
```
✓ renderiza las 3 categorías (Frontend, Backend, Herramientas)
✓ "React" aparece en la categoría Frontend
✓ "C#" aparece en la categoría Backend
✓ "Git" aparece en la categoría Herramientas
```

**Commit:** `feat: sección Habilidades con categorías`

---

## Tarea 7 — Formulario de Contacto

**Qué hacer:**
Crear `src/components/ContactoForm/ContactoForm.jsx` y `ContactoForm.module.css`.

Estado interno del componente con `useState`:
```js
{ nombre, email, motivo, mensaje, errores, enviado }
```

Campos: nombre, email, motivo (select), mensaje (textarea).

Validación al hacer submit:
- nombre: requerido, no vacío
- email: requerido, formato válido (contiene @ y .)
- motivo: debe tener un valor seleccionado
- mensaje: requerido, mínimo 20 caracteres

Si hay errores: mostrar mensaje debajo de cada campo inválido, borde rojo.

Si todo es válido: cambiar a estado `enviado = true` y mostrar panel de éxito:
```
"Gracias [nombre], recibimos tu mensaje.
Te contactaremos a [email]."
[botón: Enviar otro mensaje]
```

Al hacer click en "Enviar otro mensaje": resetear todo el formulario.

La sección tiene `id="contacto"`.

**Tests a crear en `tests/components/ContactoForm.test.jsx`:**
```
✓ renderiza los 4 campos del formulario
✓ al hacer submit vacío, muestra errores en todos los campos requeridos
✓ un email sin "@" muestra error de formato
✓ un mensaje de menos de 20 caracteres muestra error
✓ al completar todos los campos válidos y hacer submit, muestra el panel de éxito
✓ el panel de éxito contiene el nombre ingresado
✓ el panel de éxito contiene el email ingresado
✓ el botón "Enviar otro mensaje" resetea el formulario
```

**Commit:** `feat: formulario de contacto con validación y panel de éxito`

---

## Tarea 8 — Footer

**Qué hacer:**
Crear `src/components/Footer/Footer.jsx` y `Footer.module.css`.

Contenido:
- Texto: "© 2025 Ernesto Carlos Pérez García"
- Tres links: Email (mailto), WhatsApp, LinkedIn
- Todos abren en nueva pestaña (`target="_blank"`, `rel="noreferrer"`)

**Tests a crear en `tests/components/Footer.test.jsx`:**
```
✓ renderiza el texto de copyright con el año
✓ el link de email usa "mailto:"
✓ el link de WhatsApp usa "https://wa.me/"
✓ todos los links externos tienen target="_blank"
```

**Commit:** `feat: Footer con links de contacto`

---

## Tarea 9 — Integrar todo en App.jsx y estilos globales

**Qué hacer:**
Actualizar `src/App.jsx` para componer todos los componentes en orden:
```
<Header />
<main>
  <Hero />
  <Experiencia />
  <Proyectos />
  <Habilidades />
  <ContactoForm />
</main>
<Footer />
```

Revisar que:
- El scroll suave funciona desde el Header hacia cada sección
- El layout tiene ancho máximo de 1100px centrado
- El espaciado entre secciones es consistente (80px)
- Los colores y tipografía son consistentes en toda la página

Aplicar responsividad básica en cada componente:
- En mobile (< 768px): las grillas de 2 columnas pasan a 1 columna
- El Hero pasa de 2 columnas a columna única (foto arriba, texto abajo)

**Test de validación (visual):**
Abrir en Chrome y verificar:
- [ ] El Header es fijo y se ve la sombra al hacer scroll
- [ ] El Hero muestra foto (o iniciales EC) + texto + botones
- [ ] Los botones del Hero hacen scroll suave a sus secciones
- [ ] La Experiencia se ve como timeline
- [ ] Los Proyectos se ven en grilla de 2 columnas
- [ ] Las Habilidades están agrupadas por categoría
- [ ] El formulario valida y muestra el panel de éxito
- [ ] El Footer tiene los 3 links

**Correr tests finales:**
```bash
npm test       # todos deben pasar
npm run build  # debe generar dist/ sin errores
```

**Commit:** `feat: integración completa del portfolio`

---

## Tarea 10 — Revisión final

**Qué hacer:**
1. Correr `npm test` → todos los tests deben pasar
2. Correr `npm run build` → carpeta `dist/` generada sin errores
3. Marcar todas las tareas de este plan como ✅
4. Actualizar `CLAUDE.md` con cualquier decisión técnica nueva tomada durante la implementación

**Commit:** `chore: revisión final, build listo para producción`

---

## Resumen

| # | Tarea | Tests | Estado |
|---|---|---|---|
| 0 | Inicializar proyecto | Entorno funciona | ⏳ |
| 1 | Archivo de datos | 8 tests | ⏳ |
| 2 | Header + navegación | 4 tests | ⏳ |
| 3 | Hero / Sobre mí | 6 tests | ⏳ |
| 4 | Experiencia | 4 tests | ⏳ |
| 5 | Proyectos | 4 tests | ⏳ |
| 6 | Habilidades | 4 tests | ⏳ |
| 7 | Formulario de contacto | 8 tests | ⏳ |
| 8 | Footer | 4 tests | ⏳ |
| 9 | Integración + estilos | Revisión visual + build | ⏳ |
| 10 | Revisión final | Build limpio | ⏳ |

**Total de tests automatizados: 42**
