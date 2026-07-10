# Plan v1.2 — Multilenguaje, Animaciones y Modo Oscuro
**Estado**: ✅ Completado
**Basado en**: docs/spec-v1.2.md
**Prerrequisito**: plan-emailjs.md completado

---

## Instrucciones para el agente

- Implementar UNA tarea a la vez, en orden
- Correr `npm test` al finalizar cada tarea
- NO pasar a la siguiente si los tests fallan
- Esperar confirmación del desarrollador entre cada tarea
- Usar variables CSS `var(--color-*)` en TODOS los estilos, nunca colores hardcodeados
- NO instalar librerías de animación ni de i18n

---

## Tarea I — Variables CSS globales (base del modo oscuro)

**Por qué:** Antes de tocar cualquier componente, necesitamos que todos
los colores del proyecto usen variables CSS. Sin esto el modo oscuro
no puede funcionar. Esta tarea convierte los colores hardcodeados en variables.

**Qué hacer:**

Reemplazar el contenido de `src/index.css` agregando las variables CSS
para modo claro y modo oscuro definidas en spec-v1.2.md sección 3.1.

Luego revisar TODOS los archivos `.module.css` del proyecto y reemplazar
cualquier color hardcodeado por su variable correspondiente. Por ejemplo:
- `color: #1a1a2e` → `color: var(--color-text)`
- `background: #ffffff` → `background: var(--color-surface)`
- `background: #f8f9fa` → `background: var(--color-bg)`
- `color: #0070f3` → `color: var(--color-primary)`
- `color: #6c757d` → `color: var(--color-text-secondary)`

**Tests a crear en `tests/estilos/variables.test.js`:**
```
✓ el archivo index.css define --color-bg en :root
✓ el archivo index.css define --color-primary en :root
✓ el archivo index.css define --color-text en :root
✓ el archivo index.css tiene el selector [data-theme="dark"]
✓ en modo oscuro --color-bg es diferente al de modo claro
```

**Verificación visual:**
Abrir en el navegador y confirmar que los colores se ven igual que antes.

**✅ Confirmado**

**Commit:** `refactor: migrar todos los colores a variables CSS`

---

## Tarea II — Contexto de Tema (Modo Oscuro)

**Por qué:** Creamos la lógica del modo oscuro antes que el selector
de idioma porque el tema es más simple y nos permite verificar que las
variables CSS de la Tarea I funcionan correctamente.

**Qué hacer:**

Crear `src/context/TemaContext.jsx`:
- `TemaProvider`: al montar, lee `localStorage.getItem('tema')`.
  Si no existe, detecta `window.matchMedia('(prefers-color-scheme: dark)')`.
  Aplica el tema inicial al elemento `document.html` con `setAttribute('data-theme', tema)`.
- `useTema()`: retorna `{ tema, toggleTema }`
- `toggleTema()`: alterna entre 'light' y 'dark', actualiza `document.html`
  y guarda en localStorage

Envolver `<App />` con `<TemaProvider>` en `src/main.jsx`.

Agregar el botón de tema al `Header`:
- Posición: extremo derecho del Header
- Ícono: 🌙 cuando el tema es 'light' (invita a modo oscuro)
- Ícono: ☀️ cuando el tema es 'dark' (invita a modo claro)
- `aria-label` descriptivo: "Activar modo oscuro" / "Activar modo claro"

**Tests a crear en `tests/context/TemaContext.test.jsx`:**
```
✓ TemaProvider renderiza sus hijos sin errores
✓ el tema inicial por defecto es 'light'
✓ toggleTema cambia de 'light' a 'dark'
✓ toggleTema cambia de 'dark' a 'light'
✓ el tema se guarda en localStorage al cambiar
```

**Tests a agregar en `tests/components/Header.test.jsx`:**
```
✓ el botón de tema está presente en el Header
✓ el botón tiene aria-label descriptivo
```

**Verificación visual:**
- Hacer click en el botón: la página cambia a modo oscuro
- Recargar la página: el modo oscuro persiste
- Verificar que todos los componentes se ven correctamente en modo oscuro

**✅ Confirmado**

**Commit:** `feat: modo oscuro con TemaContext y toggle en Header`

---

## Tarea III — Archivos JSON de traducciones

**Por qué:** Creamos primero los tres JSON completos y los validamos
antes de tocar ningún componente. Si los JSON están mal, los componentes
van a fallar. Separar este paso evita errores difíciles de rastrear.

**Qué hacer:**

Crear `src/locales/es.json`, `src/locales/en.json`, `src/locales/pt.json`
con la estructura exacta definida en spec-v1.2.md sección 1.1.

El JSON en español (es.json) es el que ya existe en la app.
El JSON en inglés (en.json) es la traducción al inglés.
El JSON en portugués (pt.json) es la traducción al portugués.

**Traducciones de referencia:**

| Clave | ES | EN | PT |
|---|---|---|---|
| nav.sobreMi | Sobre mí | About me | Sobre mim |
| nav.experiencia | Experiencia | Experience | Experiência |
| nav.proyectos | Proyectos | Projects | Projetos |
| nav.habilidades | Habilidades | Skills | Habilidades |
| nav.contacto | Contacto | Contact | Contato |
| hero.saludo | Hola, soy | Hi, I'm | Olá, sou |
| hero.titulo | Ingeniero de Software | Software Engineer | Engenheiro de Software |
| hero.btnProyectos | Ver mis proyectos | View my projects | Ver meus projetos |
| hero.btnContacto | Contactarme | Contact me | Entrar em contato |
| experiencia.titulo | Experiencia Laboral | Work Experience | Experiência Profissional |
| proyectos.titulo | Proyectos Realizados | Featured Projects | Projetos Realizados |
| habilidades.titulo | Habilidades | Skills | Habilidades |
| contacto.titulo | Contacto | Contact | Contato |
| contacto.btnEnviar | Enviar mensaje | Send message | Enviar mensagem |
| contacto.btnEnviando | Enviando... | Sending... | Enviando... |

Completar TODAS las claves del JSON para los tres idiomas.

**Tests a crear en `tests/locales/traducciones.test.js`:**
```
✓ es.json tiene todas las claves requeridas
✓ en.json tiene exactamente las mismas claves que es.json
✓ pt.json tiene exactamente las mismas claves que es.json
✓ ningún valor en es.json está vacío
✓ ningún valor en en.json está vacío
✓ ningún valor en pt.json está vacío
✓ los valores de en.json son diferentes a los de es.json
✓ los valores de pt.json son diferentes a los de es.json
```

**✅ Confirmado**

**Commit:** `feat: archivos JSON de traducción para ES, EN y PT`

---

## Tarea IV — Contexto de Idioma

**Por qué:** Igual que con el tema, creamos la lógica del idioma como
un Context antes de conectarlo a los componentes. Así podemos testear
la lógica independientemente de la UI.

**Qué hacer:**

Crear `src/context/IdiomaContext.jsx`:
- Importar los tres JSON: `import es from '../locales/es.json'`
- `IdiomaProvider`: al montar, lee `localStorage.getItem('idioma')`.
  Si no existe o no es válido ('es'|'en'|'pt'), usa 'es' por defecto.
- `useIdioma()`: retorna `{ idioma, cambiarIdioma, t }` donde:
  - `idioma`: 'es' | 'en' | 'pt'
  - `cambiarIdioma(codigo)`: cambia idioma y guarda en localStorage
  - `t`: el objeto JSON completo del idioma activo

Envolver `<App />` con `<IdiomaProvider>` en `src/main.jsx`
(junto a `<TemaProvider>`, que ya está).

**Tests a crear en `tests/context/IdiomaContext.test.jsx`:**
```
✓ IdiomaProvider renderiza sus hijos sin errores
✓ el idioma inicial por defecto es 'es'
✓ cambiarIdioma('en') cambia el idioma a 'en'
✓ cambiarIdioma('pt') cambia el idioma a 'pt'
✓ el idioma se guarda en localStorage al cambiar
✓ t.nav.sobreMi retorna el texto correcto para cada idioma
✓ cambiarIdioma con un código inválido no cambia el idioma
```

**✅ Confirmado**

**Commit:** `feat: IdiomaContext con soporte ES/EN/PT y persistencia`

---

## Tarea V — Conectar traducciones a todos los componentes

**Por qué:** Ahora que el Context existe y los JSON están validados,
conectamos cada componente para que use `useIdioma()` en lugar de
texto hardcodeado.

**Qué hacer:**

En cada componente, reemplazar los textos hardcodeados por `t.seccion.clave`:

**Header:** textos de los links de nav → `t.nav.sobreMi`, etc.

**Hero:**
- Saludo → `t.hero.saludo`
- Título → `t.hero.titulo`
- Descripción → `t.hero.descripcion`
- Botón proyectos → `t.hero.btnProyectos`
- Botón contacto → `t.hero.btnContacto`

**Experiencia:** título de sección → `t.experiencia.titulo`

**Proyectos:** título de sección → `t.proyectos.titulo`

**Habilidades:**
- Título de sección → `t.habilidades.titulo`
- Nombre de cada categoría → `t.habilidades.frontend`, etc.

**ContactoForm:**
- Todos los labels, placeholders, botones y mensajes de error
- Para el mensaje de éxito con el nombre y email dinámicos:
  `t.contacto.exito.replace('{{nombre}}', nombre).replace('{{email}}', email)`

**Footer:** copyright → `t.footer.copyright`

Agregar el **selector de idioma** al Header:
- Tres botones: `ES`, `EN`, `PT`
- El activo tiene clase CSS `activo` (subrayado o color más intenso)
- Al hacer click llama a `cambiarIdioma(codigo)`

**Tests a actualizar:**

En cada test de componente, verificar que el texto viene del idioma activo:
```
Header
  ✓ muestra "Sobre mí" cuando el idioma es 'es'
  ✓ muestra "About me" cuando el idioma es 'en'
  ✓ el selector de idioma tiene 3 botones (ES, EN, PT)
  ✓ el botón del idioma activo tiene clase "activo"

Hero
  ✓ muestra "Hola, soy" en español
  ✓ muestra "Hi, I'm" en inglés

ContactoForm
  ✓ el botón de envío muestra el texto del idioma activo
  ✓ los errores de validación se muestran en el idioma activo
```

**✅ Confirmado**

**Commit:** `feat: multilenguaje conectado a todos los componentes`

---

## Tarea VI — Hook de animación y animación en Experiencia

**Por qué:** Creamos primero el hook reutilizable y lo probamos en
Experiencia. Si funciona bien ahí, aplicarlo en Proyectos es trivial.

**Qué hacer:**

Crear `src/hooks/useScrollAnimation.js`:
```js
import { useEffect, useRef, useState } from 'react'

export function useScrollAnimation(threshold = 0.15) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect() // animación solo una vez
        }
      },
      { threshold }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [threshold])

  return { ref, visible }
}
```

Actualizar `Experiencia.jsx`:
- Cada ítem usa `useScrollAnimation()` individualmente
- Se aplica clase `visible` cuando el observer lo detecta
- Delay CSS calculado por índice: `style={{ transitionDelay: \`${index * 100}ms\` }}`

Actualizar `Experiencia.module.css` con las clases `.item` y `.item.visible`
más la regla `prefers-reduced-motion` definidas en spec-v1.2.md sección 2.2.

**Tests a crear en `tests/hooks/useScrollAnimation.test.js`:**
```
✓ el hook retorna { ref, visible }
✓ visible comienza en false
✓ visible cambia a true cuando el IntersectionObserver dispara
```

**Tests a agregar en `tests/components/Experiencia.test.jsx`:**
```
✓ los ítems tienen clase CSS que indica estado de animación
✓ la cantidad de ítems renderizados no cambia con la animación
```

**✅ Confirmado**

**Commit:** `feat: hook useScrollAnimation y animación en Experiencia`

---

## Tarea VII — Animación en Proyectos

**Por qué:** Aplicamos el mismo patrón que en Experiencia.
Tarea separada para poder aprobar/rechazar independientemente.

**Qué hacer:**

Actualizar `Proyectos.jsx`:
- Cada tarjeta usa `useScrollAnimation()` con threshold 0.1
- Delay entre tarjetas: `${index * 150}ms`

Actualizar `Proyectos.module.css` con las clases `.card` y `.card.visible`
más la regla `prefers-reduced-motion` definidas en spec-v1.2.md sección 2.3.

**Tests a agregar en `tests/components/Proyectos.test.jsx`:**
```
✓ las tarjetas tienen clase CSS que indica estado de animación
✓ la cantidad de tarjetas renderizadas no cambia con la animación
```

**Verificación visual:**
- Hacer scroll lento por la sección Experiencia: los ítems aparecen uno a uno
- Hacer scroll lento por la sección Proyectos: las tarjetas suben suavemente
- Activar `prefers-reduced-motion` en DevTools y verificar que las animaciones
  no ocurren (los elementos son visibles directamente)

**✅ Confirmado**

**Commit:** `feat: animación de scroll en tarjetas de Proyectos`

---

## Tarea VIII — Revisión final y deploy

**Qué hacer:**

1. Correr `npm test` → todos los tests deben pasar
2. Verificación visual completa en modo claro y modo oscuro:
   - [x] Selector de idioma cambia toda la UI en ES, EN y PT
   - [x] El idioma persiste al recargar
   - [x] Modo oscuro aplica los colores correctos en todas las secciones
   - [x] El tema persiste al recargar
   - [x] Los ítems de Experiencia animan al hacer scroll
   - [x] Las tarjetas de Proyectos animan al hacer scroll
   - [x] El Header muestra: logo | nav | LinkedIn | ES/EN/PT | 🌙☀️
3. Correr `npm run build` → sin errores
4. Hacer push a GitHub:
```bash
git push
```
Vercel redeploya automáticamente.
5. Verificar en `portfolio-ernesto.vercel.app` que todo funciona en producción
6. Actualizar `CLAUDE.md` → sección "Spec activa" → versión 1.2

**✅ Confirmado**

**Commit:** `chore: v1.2 completa — multilenguaje, animaciones y modo oscuro`

---

## Resumen

| # | Tarea | Tests | Estado |
|---|---|---|---|
| I | Variables CSS globales | 5 tests | ✅ |
| II | Modo oscuro + TemaContext | 7 tests | ✅ |
| III | JSON de traducciones | 8 tests | ✅ |
| IV | IdiomaContext | 7 tests | ✅ |
| V | Conectar traducciones a componentes | 8 tests | ✅ |
| VI | Hook animación + Experiencia | 5 tests | ✅ |
| VII | Animación Proyectos | 2 tests | ✅ |
| VIII | Revisión final + deploy | Build + visual | ✅ |

**Tests nuevos en v1.2: 42**
**Total acumulado del proyecto: 96 tests**
