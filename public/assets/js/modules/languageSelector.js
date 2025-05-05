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

    // Elimina primero la base URL '/portfolio/' si existe
    let cleanPath = currentPath.replace(/^\/portfolio\//, '');

    // Luego elimina el prefijo de idioma 'es/' o 'en/'
    cleanPath = cleanPath.replace(/^(es|en)\//, '');

    // Obtener el idioma destino del enlace (es o en)
    const targetLang = link.getAttribute('href').includes('/es/') ? 'es' : 'en';

    // Construir la URL correcta con la base URL desde site.json
    const baseUrl = '/portfolio/'; // Debe coincidir con site.baseUrl

    // Actualizar href con la ruta correcta
    link.setAttribute('href', `${baseUrl}${targetLang}/${cleanPath}`);
  });
}
