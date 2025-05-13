/**
 * Configuración del sitio con adaptación automática para desarrollo local
 */

// Determinar si estamos en desarrollo local o producción
const isDevEnvironment = process.env.ELEVENTY_ENV === 'development';

module.exports = {
  // URL base del sitio
  url: "https://felixrivasuxdesigner.github.io",
  
  // Ruta base - vacía para desarrollo local, con /portfolio/ para producción
  baseUrl: isDevEnvironment ? "/" : "/portfolio/",
  
  // Resto de la configuración
  title: "Félix Rivas UX/UI Designer",
  description: "Diseñador UX/UI con más de 12 años de experiencia en interfaces digitales y experiencia de usuario para aplicaciones móviles y web",
  author: "Félix Rivas",
  linkedin: "https://www.linkedin.com/in/rivasfelix/"
};