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
    // Obtener la URL actual sin el prefijo de idioma y sin la base URL
    const currentPath = window.location.pathname;
    
    // Determinar si estamos en localhost o producción
    const isLocalhost = window.location.hostname === 'localhost' || 
                         window.location.hostname === '127.0.0.1' ||
                         window.location.hostname.includes('192.168.');
    
    // Usar la base URL apropiada según el entorno
    const baseUrl = isLocalhost ? '/' : '/portfolio/';

    // Elimina primero la base URL '/portfolio/' o '/' según corresponda
    let cleanPath = currentPath;
    if (isLocalhost) {
      cleanPath = cleanPath.replace(/^\//, '');
    } else {
      cleanPath = cleanPath.replace(/^\/portfolio\//, '');
    }

    // Luego elimina el prefijo de idioma 'es/' o 'en/'
    cleanPath = cleanPath.replace(/^(es|en)\//, '');

    // Obtener el idioma destino del enlace (es o en)
    const targetLang = link.getAttribute('href').includes('/es/') ? 'es' : 'en';

    // Actualizar href con la ruta correcta
    link.setAttribute('href', `${baseUrl}${targetLang}/${cleanPath}`);
  });
}
