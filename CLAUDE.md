# CLAUDE.md — Portfolio de Ernesto Carlos

## Contexto del proyecto
Migración y rediseño del portfolio personal de Ernesto Carlos, Ingeniero de Software
con +7 años de experiencia. El portfolio anterior era HTML puro sin CSS. Este nuevo
portfolio será construido en React con diseño profesional y moderno.

El objetivo es tener un portfolio que pueda mostrar a clientes potenciales y empleadores.

## Stack decidido (no cambiar sin confirmación)
- **Framework**: React + Vite
- **Estilos**: CSS Modules (un archivo .module.css por componente)
- **Tests**: Vitest + React Testing Library
- **Formulario de contacto**: EmailJS (permite enviar emails sin backend)
- **Sin backend propio**: es un sitio estático
- **Deploy futuro**: Netlify o Vercel (aún no configurado, no es scope de este plan)

## Estructura de carpetas esperada
```
portfolio-ernesto/
├── CLAUDE.md
├── docs/
│   ├── spec.md
│   └── plan.md
├── public/
│   └── images/
│       └── foto-perfil.jpg     ← el desarrollador reemplazará esta imagen
├── src/
│   ├── components/
│   │   ├── Header/
│   │   ├── Hero/               ← sección "Sobre mí"
│   │   ├── Experiencia/
│   │   ├── Proyectos/
│   │   ├── Habilidades/
│   │   ├── ContactoForm/
│   │   └── Footer/
│   ├── data/
│   │   └── contenido.js        ← TODA la información personal va aquí
│   ├── App.jsx
│   └── main.jsx
├── tests/
└── package.json
```

## Regla crítica: separación de datos y UI
- Toda la información personal (nombre, experiencia, proyectos, skills, etc.)
  debe vivir en `src/data/contenido.js`, NO hardcodeada dentro de los componentes.
- Esto permite actualizar el contenido sin tocar el código de los componentes.
- Los componentes solo reciben datos como props y los renderizan.

## Información personal de Ernesto (fuente de verdad)
### Datos básicos
- Nombre: Ernesto Carlos Pérez García
- Título: Ingeniero en Ciencias Informáticas
- Años de experiencia: +7 años
- Email: erneskrlos@gmail.com
- Teléfono: +598 92 738 549
- LinkedIn: https://www.linkedin.com/in/ernesto-carlos-perez-garcias-6176a312a
- WhatsApp: https://wa.me/+59892738549

### Experiencia laboral (en orden cronológico inverso)
1. CodeBerrySolutions (2023–2024)
2. Vallhala Partner S.L (2022–2023)
3. Grupo Electrónico Para el Turismo (GET) (2018–2022)
4. Universidad de las Ciencias Informáticas (UCI) (2017–2018)

### Stack tecnológico completo
Frontend: HTML, CSS, JavaScript, React, Next.js, Vue.js, Material UI, Bootstrap
Backend: Node.js, C#, ASP.NET, ASP.NET Core, Java, Spring Boot, JPA, Maven
Herramientas: Git, GitHub

### Proyectos
1. Sitio Web Corporativo — React, Next.js, Material UI
2. Sitio Web de Gestión Backoffice — React, Next.js, Material UI
3. API REST con Microservicios — Java, Spring Boot, JPA, Maven
4. Plataforma de Gestión para el Turismo — Vue.js, Bootstrap, C#, ASP.NET Core

## Reglas para el agente
## Spec activa
- Versión actual: docs/spec-v1.2.md
- Versión anterior: docs/spec-v1.1.md (referencia histórica, no modificar)

### Lo que SIEMPRE debes hacer
- Leer docs/spec.md antes de implementar cualquier cosa
- Mantener TODA la info personal en src/data/contenido.js
- Correr `npm test` antes de declarar una tarea completa
- Hacer commit después de cada tarea completada
- Comentar el código en español
- Usar CSS Modules para los estilos, nunca estilos inline salvo excepciones mínimas

### Lo que NUNCA debes hacer
- Hardcodear información personal (nombre, email, etc.) dentro de componentes JSX
- Cambiar el stack sin preguntar
- Agregar secciones que no estén en docs/spec.md
- Usar librerías de animación pesadas (no Framer Motion, no GSAP)
- Saltarte la capa de src/data/contenido.js

## Decisiones técnicas tomadas durante la implementación

- `vitest` requiere `passWithNoTests: true` en la config para no fallar cuando no hay archivos de test (relevante al inicializar el proyecto)
- El componente `Hero` usa `onError` en la `<img>` para mostrar un `<div>` con las iniciales "EC" como fallback; el estado `fotoFallo` lo controla con `useState`
- El Header agrega la clase `conSombra` al hacer scroll > 50px via `useEffect` con `window.addEventListener`; el cleanup del listener se hace en el return del efecto
- La validación del formulario (`ContactoForm`) vive en una función `validar()` separada del componente para facilitar su testing y futura integración con EmailJS
- Los tests de componentes usan `fireEvent` de `@testing-library/react` (no `userEvent`) por simplicidad; es suficiente para validar la lógica de UI
- La carpeta `tests/` está en la raíz (no dentro de `src/`) siguiendo la estructura del plan; Vitest la detecta automáticamente con el patrón `**/*.{test,spec}.?(c|m)[jt]s?(x)`
- `dist/` no se commitea (está en `.gitignore` generado por Vite)

## Cómo correr el proyecto
```bash
npm run dev    # servidor de desarrollo
npm test       # correr todos los tests
npm run build  # build para producción (sitio estático)
```

## Cómo sé que una tarea está terminada
1. Implementa exactamente lo que dice la spec
2. `npm test` pasa sin errores
3. Se ve correctamente en Chrome en escritorio
4. Commit realizado con mensaje descriptivo en español
