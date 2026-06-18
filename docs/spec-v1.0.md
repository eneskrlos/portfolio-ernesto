# Spec: Portfolio Personal — Ernesto Carlos
**Estado**: ⏳ Pendiente de aprobación del desarrollador
**Versión**: 1.0
**Basado en**: Portfolio HTML anterior (index.html) + mejoras solicitadas

---

## 1. ¿Qué es este proyecto?

Rediseño completo del portfolio personal de Ernesto Carlos, migrando de HTML puro
sin estilos a una aplicación React moderna, con diseño visual profesional, contenido
actualizado y formulario de contacto funcional.

---

## 2. Secciones del portfolio

### 2.1 Header / Navegación
Barra de navegación fija en la parte superior con:
- Nombre "Ernesto Carlos" a la izquierda (actúa como logo)
- Links de navegación a la derecha que hacen scroll suave hacia cada sección:
  - Sobre mí
  - Experiencia
  - Proyectos
  - Habilidades
  - Contacto
- Link externo a LinkedIn (abre en nueva pestaña)
- La barra cambia de opacidad o agrega sombra al hacer scroll (efecto sutil)

---

### 2.2 Hero — Sobre mí
Primera sección visible al cargar la página. Contiene:

**Columna izquierda (texto):**
- Saludo: "Hola, soy"
- Nombre completo: "Ernesto Carlos Pérez García"
- Título: "Ingeniero de Software"
- Descripción corta (extraída y mejorada del modal actual):
  *"Apasionado por la programación con +7 años de experiencia construyendo
  productos digitales. Me especializo en desarrollo web full-stack, trabajo
  en equipo y aprendizaje continuo."*
- Botón primario: "Ver mis proyectos" → scroll a sección Proyectos
- Botón secundario: "Contactarme" → scroll a sección Contacto

**Columna derecha (foto):**
- Foto de perfil circular
- La imagen se carga desde `public/images/foto-perfil.jpg`
- Si la imagen no existe, mostrar un avatar placeholder con las iniciales "EC"

---

### 2.3 Experiencia Laboral
Lista de trabajos en orden cronológico inverso (el más reciente primero).

Cada ítem de experiencia muestra:
- Nombre de la empresa
- Período (ej: 2023–2024)
- Una línea visual tipo "timeline" que conecta los ítems

Datos (vienen de `src/data/contenido.js`):
1. CodeBerrySolutions — 2023–2024
2. Vallhala Partner S.L — 2022–2023
3. Grupo Electrónico Para el Turismo (GET) — 2018–2022
4. Universidad de las Ciencias Informáticas (UCI) — 2017–2018

---

### 2.4 Proyectos Realizados
Grilla de tarjetas (2 columnas en escritorio), una por proyecto.

Cada tarjeta muestra:
- Título del proyecto
- Descripción (párrafo del portfolio anterior)
- Lista de tecnologías usadas como "badges" o etiquetas visuales
- Sin links externos por ahora (pueden agregarse en v2)

Proyectos (vienen de `src/data/contenido.js`):
1. Sitio Web Corporativo
2. Sitio Web de Gestión Backoffice
3. API REST con Microservicios
4. Plataforma de Gestión para el Turismo

---

### 2.5 Habilidades / Stack Tecnológico
Sección que muestra las tecnologías organizadas por categoría.

**Categoría Frontend:**
HTML, CSS, JavaScript, React, Next.js, Vue.js, Material UI, Bootstrap

**Categoría Backend:**
Node.js, C#, ASP.NET, ASP.NET Core, Java, Spring Boot, JPA, Maven

**Categoría Herramientas:**
Git, GitHub

Cada tecnología se muestra como un badge o tarjeta pequeña con el nombre.
No se requieren íconos SVG por ahora (pueden agregarse en v2).

---

### 2.6 Formulario de Contacto
Formulario con validación visual. Por ahora no envía datos a ningún servidor
(EmailJS se conectará en una versión futura).

Campos:
- Nombre completo (texto, requerido)
- Email (email, requerido)
- Motivo del contacto (select): Trabajo / Proyecto freelance / Consulta / Otro
- Mensaje (textarea, mínimo 20 caracteres, requerido)

Comportamiento:
- Validación en el frontend antes de "enviar"
- Cada campo muestra borde rojo + mensaje de error si está vacío o es inválido
- Al hacer submit con todos los campos válidos: mostrar panel de éxito con los
  datos ingresados: "Gracias [Nombre], recibimos tu mensaje. Te contactaremos a [Email]."
- Botón "Enviar otro mensaje" que resetea el formulario y vuelve al estado inicial
- El botón de envío se desactiva si hay campos inválidos

**Nota para v2:** integrar EmailJS para envío real. Las credenciales irán
en variables de entorno (`.env`), nunca en el código.

---

### 2.7 Footer
Pie de página simple con:
- "© 2025 Ernesto Carlos Pérez García"
- Links de contacto rápido:
  - Email: erneskrlos@gmail.com
  - WhatsApp: enlace directo
  - LinkedIn: enlace externo
- Todos los links externos abren en nueva pestaña

---

## 3. Diseño visual

### Paleta de colores
- Color principal: azul profesional (`#0070f3` o similar)
- Fondo: blanco o gris muy claro (`#f8f9fa`)
- Texto principal: gris oscuro (`#1a1a2e`)
- Texto secundario: gris medio (`#6c757d`)
- Badges de tecnología: fondo azul claro con texto azul oscuro

### Tipografía
- Fuente: Google Fonts — `Inter` (sans-serif, legible, profesional)
- Tamaño base: 16px
- Jerarquía clara: h1 > h2 > h3 > párrafo

### Layout
- Ancho máximo del contenido: 1100px centrado
- Padding horizontal en mobile: 20px
- Espaciado consistente entre secciones: 80px

### Responsividad
- El portfolio debe verse correctamente en:
  - Escritorio (≥1024px): layout principal
  - Tablet (768px–1023px): ajustes de columnas
  - Mobile (< 768px): todo en una sola columna

---

## 4. Comportamiento general

- El scroll de los links de navegación es suave (`scroll-behavior: smooth`)
- No hay animaciones complejas, solo transiciones CSS simples en hover
- Las imágenes tienen siempre atributo `alt` descriptivo
- El sitio debe tener título de pestaña: "Ernesto Carlos — Ingeniero de Software"
- Meta descripción: "Portfolio de Ernesto Carlos, Ingeniero de Software con +7 años de experiencia en desarrollo web full-stack."

---

## 5. Fuera del alcance — NO implementar

- ❌ Blog o artículos
- ❌ Modo oscuro / dark mode
- ❌ Animaciones con Framer Motion u otras librerías pesadas
- ❌ Envío real de emails (se conectará EmailJS en v2)
- ❌ Sistema de autenticación o panel de administración
- ❌ Íconos SVG de tecnologías (solo nombres en texto por ahora)
- ❌ Deploy automático (se configurará manualmente después)
- ❌ Sección de preguntas frecuentes (se elimina del nuevo diseño)
- ❌ Modal de "Ver más información" (se elimina, el contenido va en Hero)
- ❌ Links a proyectos en GitHub (aún no están disponibles)

---

## 6. Criterios de aceptación

El portfolio está listo cuando:

1. ✅ Las 7 secciones están implementadas y se ven correctamente
2. ✅ Toda la info personal viene de `src/data/contenido.js`
3. ✅ El formulario valida los campos y muestra el panel de éxito con los datos ingresados
4. ✅ Se ve bien en escritorio, tablet y mobile
5. ✅ El scroll suave funciona desde la navegación
6. ✅ La foto se muestra (o el placeholder con iniciales si no hay foto)
7. ✅ Todos los tests pasan (`npm test`)
8. ✅ `npm run build` genera el sitio estático sin errores
