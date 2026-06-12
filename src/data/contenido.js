// Fuente de verdad de toda la información personal del portfolio.
// Los componentes NUNCA hardcodean estos datos — siempre los leen de aquí.

export const perfil = {
  nombre: 'Ernesto Carlos Pérez García',
  titulo: 'Ingeniero de Software',
  descripcion:
    'Apasionado por la programación con +7 años de experiencia construyendo productos digitales. Me especializo en desarrollo web full-stack, trabajo en equipo y aprendizaje continuo.',
  email: 'erneskrlos@gmail.com',
  telefono: '+59892738549',
  linkedin: 'https://www.linkedin.com/in/ernesto-carlos-perez-garcias-6176a312a',
  whatsapp: 'https://wa.me/+59892738549',
  foto: '/images/foto-perfil.jpg',
  iniciales: 'EC',
}

export const experiencia = [
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
  herramientas: ['Git', 'GitHub'],
}

export const navLinks = [
  { label: 'Sobre mí', href: '#sobre-mi' },
  { label: 'Experiencia', href: '#experiencia' },
  { label: 'Proyectos', href: '#proyectos' },
  { label: 'Habilidades', href: '#habilidades' },
  { label: 'Contacto', href: '#contacto' },
]
