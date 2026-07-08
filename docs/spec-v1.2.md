# Spec v1.2 — Cambios sobre v1.1
**Estado**: ⏳ Pendiente de aprobación del desarrollador
**Versión**: 1.2
**Fecha**: Junio 2026
**Base**: spec-v1.0.md + spec-v1.1.md (todo lo que no aparece aquí permanece igual)

---

## Cambios en esta versión

### Restricciones levantadas de versiones anteriores
- ~~❌ Modo oscuro / dark mode~~ → ✅ ahora se implementa (ver sección 3)
- ~~❌ Animaciones con Framer Motion~~ → ✅ animaciones permitidas con CSS +
  IntersectionObserver (sin librerías externas de animación)

---

## 1. Multilenguaje (ES / EN / PT)

### 1.1 Arquitectura de idiomas

El portfolio soporta 3 idiomas: Español (ES), English (EN), Português (PT).

**Estructura de archivos:**
```
src/
├── locales/
│   ├── es.json     ← español (idioma por defecto)
│   ├── en.json     ← inglés
│   └── pt.json     ← portugués
├── context/
│   └── IdiomaContext.jsx   ← Context + Provider + hook useIdioma
```

Cada archivo JSON contiene TODO el texto visible de la página organizado
por sección. Las claves son idénticas en los tres archivos; solo cambia
el valor traducido.

**Ejemplo de estructura del JSON:**
```json
{
  "nav": {
    "sobreMi": "Sobre mí",
    "experiencia": "Experiencia",
    "proyectos": "Proyectos",
    "habilidades": "Habilidades",
    "contacto": "Contacto"
  },
  "hero": {
    "saludo": "Hola, soy",
    "titulo": "Ingeniero de Software",
    "descripcion": "Desarrollador Full Stack con más de 7 años...",
    "btnProyectos": "Ver mis proyectos",
    "btnContacto": "Contactarme"
  },
  "experiencia": {
    "titulo": "Experiencia Laboral"
  },
  "proyectos": {
    "titulo": "Proyectos Realizados"
  },
  "habilidades": {
    "titulo": "Habilidades",
    "frontend": "Frontend",
    "backend": "Backend",
    "herramientas": "Herramientas",
    "metodologias": "Metodologías"
  },
  "contacto": {
    "titulo": "Contacto",
    "nombre": "Nombre completo",
    "email": "Email",
    "motivo": "Motivo del contacto",
    "motivoOpciones": {
      "trabajo": "Trabajo",
      "freelance": "Proyecto freelance",
      "consulta": "Consulta",
      "otro": "Otro"
    },
    "mensaje": "Mensaje",
    "btnEnviar": "Enviar mensaje",
    "btnEnviando": "Enviando...",
    "btnOtroMensaje": "Enviar otro mensaje",
    "exito": "¡Gracias {{nombre}}! Tu mensaje fue enviado. Te responderé pronto a {{email}}.",
    "errorEnvio": "Hubo un problema al enviar. Escríbeme directamente a erneskrlos@gmail.com",
    "errores": {
      "nombreRequerido": "El nombre es requerido",
      "emailInvalido": "El email no es válido",
      "motivoRequerido": "Selecciona un motivo",
      "mensajeCorto": "El mensaje debe tener al menos 20 caracteres"
    }
  },
  "footer": {
    "copyright": "© 2025 Ernesto Carlos Pérez García"
  }
}
```

**Nota:** Los nombres de empresas, proyectos y tecnologías NO se traducen.
Solo se traduce el texto de la UI (títulos, labels, botones, mensajes).

### 1.2 Comportamiento del selector de idioma

- El selector vive en el **Header**, a la derecha del link de LinkedIn
- Se muestra como tres botones compactos: `ES` | `EN` | `PT`
- El idioma activo tiene un estilo visual destacado (subrayado o color más intenso)
- Al cambiar idioma, toda la UI cambia instantáneamente sin recargar la página
- El idioma seleccionado se guarda en `localStorage` con la clave `idioma`
- Al cargar la página, se restaura el idioma guardado. Si no hay ninguno guardado,
  se usa ES por defecto

### 1.3 Implementación técnica

- `IdiomaContext.jsx` exporta:
  - `IdiomaProvider`: envuelve toda la app en `App.jsx`
  - `useIdioma()`: hook que retorna `{ idioma, cambiarIdioma, t }` donde:
    - `idioma`: string con el código actual ('es', 'en', 'pt')
    - `cambiarIdioma(codigo)`: función para cambiar de idioma
    - `t`: objeto con todas las traducciones del idioma activo (el JSON completo)
- Los componentes consumen `useIdioma()` y usan `t.seccion.clave` para los textos
- NO se usa ninguna librería externa de i18n (implementación propia con Context)

---

## 2. Animaciones de scroll

Las animaciones se implementan con **IntersectionObserver** (API nativa del
navegador) + **transiciones CSS**. No se instala ninguna librería externa.

### 2.1 Hook reutilizable

Crear `src/hooks/useScrollAnimation.js`:
- Recibe un `ref` y un `threshold` (por defecto 0.15)
- Retorna `visible` (boolean): `true` cuando el elemento entra en el viewport
- Usa `IntersectionObserver` internamente
- Se desconecta el observer una vez que el elemento es visible (la animación
  ocurre solo la primera vez)

### 2.2 Animación en Experiencia Laboral

**Efecto:** cada ítem del timeline aparece de abajo hacia arriba de forma suave,
uno por uno con un pequeño delay entre cada uno.

**Comportamiento:**
- Los ítems comienzan invisibles y desplazados 30px hacia abajo
- A medida que el usuario hace scroll y cada ítem entra en el viewport,
  aparece con una transición suave (opacity 0→1, translateY 30px→0)
- Duración de la transición: 0.5s con easing `ease-out`
- Delay entre ítems: 100ms (ítem 1: 0ms, ítem 2: 100ms, ítem 3: 200ms, etc.)

**CSS (clases):**
```css
.item {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.5s ease-out, transform 0.5s ease-out;
}
.item.visible {
  opacity: 1;
  transform: translateY(0);
}
```

**Accesibilidad:** respetar `prefers-reduced-motion`. Si el usuario tiene
esta preferencia activa, los elementos son visibles directamente sin animación:
```css
@media (prefers-reduced-motion: reduce) {
  .item {
    opacity: 1;
    transform: none;
    transition: none;
  }
}
```

### 2.3 Animación en Proyectos Realizados

**Efecto:** las tarjetas suben de abajo hacia arriba a velocidad suave cuando
entran en el viewport.

**Comportamiento:**
- Igual que en Experiencia pero aplicado a las tarjetas de proyectos
- Las tarjetas de la misma fila animarán con el mismo delay base
- Duración: 0.6s con easing `ease-out`
- Delay entre tarjetas: 150ms

**CSS (clases):**
```css
.card {
  opacity: 0;
  transform: translateY(40px);
  transition: opacity 0.6s ease-out, transform 0.6s ease-out;
}
.card.visible {
  opacity: 1;
  transform: translateY(0);
}
```

La misma regla `prefers-reduced-motion` aplica aquí también.

---

## 3. Modo Oscuro

### 3.1 Paleta de colores en modo oscuro

Compatible con la paleta existente del modo claro. Se definen como
CSS custom properties en `:root` y se sobreescriben en `[data-theme="dark"]`.

```css
/* Modo claro (ya existente, se formaliza como variables) */
:root {
  --color-bg: #f8f9fa;
  --color-surface: #ffffff;
  --color-primary: #0070f3;
  --color-text: #1a1a2e;
  --color-text-secondary: #6c757d;
  --color-badge-bg: #e8f0fe;
  --color-badge-text: #1a56db;
  --color-border: #e2e8f0;
  --color-header-bg: rgba(248, 249, 250, 0.95);
  --color-shadow: rgba(0, 0, 0, 0.08);
}

/* Modo oscuro */
[data-theme="dark"] {
  --color-bg: #0d1117;
  --color-surface: #161b22;
  --color-primary: #4493f8;       /* azul más claro para mejor contraste */
  --color-text: #e6edf3;
  --color-text-secondary: #8b949e;
  --color-badge-bg: #1c2d4a;
  --color-badge-text: #79b8ff;
  --color-border: #30363d;
  --color-header-bg: rgba(13, 17, 23, 0.95);
  --color-shadow: rgba(0, 0, 0, 0.3);
}
```

### 3.2 Toggle de modo oscuro

- El botón vive en el **Header**, junto al selector de idioma
- Ícono: 🌙 para activar modo oscuro, ☀️ para volver a modo claro
- Al hacer click: alterna el atributo `data-theme="dark"` en el elemento `<html>`
- La preferencia se guarda en `localStorage` con la clave `tema`
- Al cargar la página, se restaura el tema guardado
- Si no hay preferencia guardada, se respeta `prefers-color-scheme` del sistema

### 3.3 Implementación técnica

- Crear `src/context/TemaContext.jsx` con el mismo patrón que `IdiomaContext`
- Exporta `TemaProvider` y `useTema()` → retorna `{ tema, toggleTema }`
- `tema` es `'light'` o `'dark'`
- `toggleTema()` alterna entre los dos y persiste en localStorage
- Todos los componentes usan las variables CSS `var(--color-*)`, no colores hardcodeados

---

## 4. Cambios en el Header

El Header en v1.2 tiene estos elementos (de izquierda a derecha):
1. Nombre "Ernesto Carlos" (logo)
2. Links de navegación
3. Link LinkedIn
4. Selector de idioma: `ES | EN | PT`
5. Botón de tema: `🌙` / `☀️`

---

## 5. Fuera del alcance en v1.2 — NO implementar

- ❌ Detección automática del idioma del navegador (se usa ES por defecto)
- ❌ Traducción de nombres de empresas, proyectos o tecnologías
- ❌ Animaciones en secciones distintas a Experiencia y Proyectos
- ❌ Animaciones de entrada para el Hero (queda estático)
- ❌ Transición animada al cambiar de idioma o tema (el cambio es instantáneo)
- ❌ Librerías externas de animación (Framer Motion, GSAP, AOS, etc.)
- ❌ Librerías externas de i18n (react-i18next, etc.)

---

## 6. Criterios de aceptación para v1.2

1. ✅ El selector de idioma cambia toda la UI al idioma seleccionado
2. ✅ El idioma persiste al recargar la página
3. ✅ Los tres archivos JSON (es, en, pt) tienen exactamente las mismas claves
4. ✅ Los ítems de Experiencia animan de abajo hacia arriba al hacer scroll
5. ✅ Las tarjetas de Proyectos animan de abajo hacia arriba al hacer scroll
6. ✅ Las animaciones respetan `prefers-reduced-motion`
7. ✅ El modo oscuro cambia todos los colores usando las variables CSS definidas
8. ✅ La preferencia de tema persiste al recargar la página
9. ✅ En modo oscuro el contraste de texto es legible en todas las secciones
10. ✅ Todos los tests pasan (`npm test`)
11. ✅ `npm run build` sin errores
