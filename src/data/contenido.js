// Fuente de verdad de toda la información personal del portfolio.
// Los componentes NUNCA hardcodean estos datos — siempre los leen de aquí.

export const perfil = {
  nombre: 'Ernesto Carlos Pérez García',
  titulo: 'Ingeniero de Software',
  descripcion:
    `
    Desarrollador Full Stack con más de 7 años de experiencia en desarrollo de software, especializado en Java
Spring Boot y React.js. Sólida trayectoria en arquitecturas de microservicios, APIs REST, bases de datos
relacionales y entornos cloud (AWS, Azure). Experiencia comprobada en sistemas de integración complejos,
automatización de datos y soporte de infraestructura Linux.
    
    `,
  email: 'erneskrlos@gmail.com',
  telefono: '+59892738549',
  linkedin: 'https://www.linkedin.com/in/ernesto-carlos-perez-garcias-6176a312a',
  whatsapp: 'https://wa.me/+59892738549',
  foto: '/images/foto-perfil.jpg',
  iniciales: 'EC',
}

export const experiencia = [
  {
    empresa: 'Bold MSS',
    periodo: 'Jun 2025 – Mar 2026',
  },
  {
    empresa: 'Squaads',
    periodo: 'Dic 2024 – Sep 2025',
  },
  {
    empresa: 'CodeBerrySolutions',
    periodo: '2023–2024',
  },
  {
    empresa: 'Vallhala Partner S.L',
    periodo: '2022–2023',
  },
  {
    empresa: 'Grupo Electrónico Para el Turismo (GET)',
    periodo: '2018–2022',
  },
  {
    empresa: 'Universidad de las Ciencias Informáticas (UCI)',
    periodo: '2017–2018',
  },
]

// La descripción de cada proyecto vive en src/locales/{es,en,pt}.json
// (bajo proyectos.items.<id>.descripcion) para poder traducirse; acá solo
// queda el dato que NO se traduce: id, título y tecnologías.
export const proyectos = [
  {
    id: 'sitioCorporativo',
    titulo: 'Sitio Web Corporativo',
    tecnologias: ['React', 'Next.js', 'Material UI'],
  },
  {
    id: 'backoffice',
    titulo: 'Sitio Web de Gestión Backoffice',
    tecnologias: ['React', 'Next.js', 'Material UI'],
  },
  {
    id: 'apiMicroservicios',
    titulo: 'API REST con Microservicios',
    tecnologias: ['Java', 'Spring Boot', 'JPA', 'Maven'],
  },
  {
    id: 'plataformaTurismo',
    titulo: 'Plataforma de Gestión para el Turismo',
    tecnologias: ['Vue.js', 'Bootstrap', 'C#', 'ASP.NET Core'],
  },
]

export const habilidades = {
  frontend: ['HTML', 'CSS', 'JavaScript', 'React', 'Next.js', 'Vue.js', 'Material UI', 'Bootstrap'],
  backend: ['Node.js', 'C#', 'ASP.NET', 'ASP.NET Core', 'Java', 'Spring Boot', 'JPA', 'Maven'],
  herramientas: ['Git', 'GitFlow','GitHub', 'Docker', 'AWS', 'Linux', 'Power Automate', 'Power BI', 'Proxmox', 'Web Scraping'],
  metodologias: ['Spec Driven Development ','REST' ,'MVC ', 'Scrum / Agile'],
}

export const navLinks = [
  { label: 'Sobre mí', href: '#sobre-mi' },
  { label: 'Experiencia', href: '#experiencia' },
  { label: 'Proyectos', href: '#proyectos' },
  { label: 'Habilidades', href: '#habilidades' },
  { label: 'Contacto', href: '#contacto' },
]
