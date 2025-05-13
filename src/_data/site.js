/**
 * Configuración del sitio con adaptación automática para desarrollo local
 */

// Determinamos la URL base para ambos entornos (desarrollo y producción)
// Siempre usamos /portfolio/ para mantener coherencia
const isDevEnvironment = process.env.ELEVENTY_ENV === 'development';

module.exports = {
  // URL base del sitio
  url: "https://felixrivasuxdesigner.github.io",
  
  // Ruta base - siempre con /portfolio/ para mantener coherencia entre entornos
  baseUrl: "/portfolio/",
  
  // Resto de la configuración
  title: "Félix Rivas UX/UI Designer",
  description: "Diseñador UX/UI con más de 12 años de experiencia en interfaces digitales y experiencia de usuario para aplicaciones móviles y web",
  author: "Félix Rivas",
  linkedin: "https://www.linkedin.com/in/rivasfelix/"
};