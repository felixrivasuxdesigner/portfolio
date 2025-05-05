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
    // Obtener la URL actual sin el prefijo de idioma
    const currentPath = window.location.pathname;
    const pathWithoutLang = currentPath.replace(/^\/(es|en)\//, '');

    // Actualizar href con la ruta correcta
    const baseHref = link.getAttribute('href').split('/').slice(0, 2).join('/');
    link.setAttribute('href', `${baseHref}/${pathWithoutLang}`);
  });
}
