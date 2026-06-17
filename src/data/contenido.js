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

export const proyectos = [
  {
    titulo: 'Sitio Web Corporativo',
    descripcion:
      'Desarrollo de sitio web corporativo con diseño moderno y responsivo, enfocado en la presentación de servicios y captación de clientes.',
    tecnologias: ['React', 'Next.js', 'Material UI'],
  },
  {
    titulo: 'Sitio Web de Gestión Backoffice',
    descripcion:
      'Plataforma web de administración interna para gestión de usuarios, reportes y configuraciones del sistema.',
    tecnologias: ['React', 'Next.js', 'Material UI'],
  },
  {
    titulo: 'API REST con Microservicios',
    descripcion:
      'Arquitectura de microservicios con API REST para manejo de lógica de negocio distribuida, escalable y mantenible.',
    tecnologias: ['Java', 'Spring Boot', 'JPA', 'Maven'],
  },
  {
    titulo: 'Plataforma de Gestión para el Turismo',
    descripcion:
      'Sistema integral de gestión turística con módulos de reservas, clientes y reportes para el sector hotelero.',
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
