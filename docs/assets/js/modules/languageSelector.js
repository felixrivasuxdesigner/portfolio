/**
 * Language Selector Module
 * Controla la funcionalidad del selector de idioma
 */

export function initLanguageSelector() {
  const langToggle = document.getElementById('langToggle');
  const langDropdown = document.getElementById('langDropdown');

  if (!langToggle || !langDropdown) return;

  // Mostrar/ocultar el dropdown al hacer clic en el botón
  langToggle.addEventListener('click', (event) => {
    event.preventDefault();
    langDropdown.classList.toggle('active');
  });

  // Cerrar dropdown al hacer clic fuera
  document.addEventListener('click', (event) => {
    if (
      !langToggle.contains(event.target) &&
      !langDropdown.contains(event.target)
    ) {
      langDropdown.classList.remove('active');
    }
  });

  // Adaptar los URLs para mantener la ruta actual al cambiar idioma
  const languageLinks = langDropdown.querySelectorAll('a');
  languageLinks.forEach((link) => {
    // Obtener la URL actual
    const currentPath = window.location.pathname;
    
    // La base URL común para el sitio
    const baseUrl = '/portfolio/';

    // 1. Eliminar la base URL '/portfolio/' si está presente al principio
    let cleanPath = currentPath;
    if (cleanPath.startsWith(baseUrl)) {
      cleanPath = cleanPath.substring(baseUrl.length);
    } else if (cleanPath.startsWith('/')) {
      // Si no tiene baseUrl pero empieza con /, quitar la /
      cleanPath = cleanPath.substring(1);
    }

    // 2. Eliminar el prefijo de idioma 'es/' o 'en/' si está presente al principio
    cleanPath = cleanPath.replace(/^(es|en)\//, '');

    // 3. Obtener el idioma destino del enlace del atributo href original
    // (Por defecto el selector tiene enlaces a /portfolio/es/ y /portfolio/en/)
    const targetLang = link.getAttribute('href').includes('/es/') ? 'es' : 'en';

    // 4. Actualizar href con la ruta completa reconstruida
    // Aseguramos que siempre empiece con la baseUrl correcta
    link.setAttribute('href', `${baseUrl}${targetLang}/${cleanPath}`);
  });
}
