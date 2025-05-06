/**
 * Theme Switcher Module
 * Maneja el cambio entre modo claro y oscuro
 */

// Función para inicializar el selector de tema
export function initThemeSwitcher() {
  // Ya no necesitamos crear el botón porque ahora está en el HTML
  // junto al selector de idioma

  // Verificar si hay preferencia guardada o usar la preferencia del sistema
  const savedTheme = localStorage.getItem('theme');
  const prefersDarkMode = window.matchMedia(
    '(prefers-color-scheme: dark)'
  ).matches;

  // Establecer tema inicial
  if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
    syncThemeWithLanguageSelector(savedTheme);
    updateThemeIcon(savedTheme);
  } else if (prefersDarkMode) {
    document.documentElement.setAttribute('data-theme', 'dark');
    syncThemeWithLanguageSelector('dark');
    updateThemeIcon('dark');
  }

  // Escuchar cambios en el botón de tema
  document.addEventListener('click', function (event) {
    if (event.target.closest('.theme-toggle')) {
      toggleTheme();
    }
  });

  // Escuchar cambios en la preferencia del sistema
  window
    .matchMedia('(prefers-color-scheme: dark)')
    .addEventListener('change', function (e) {
      const newTheme = e.matches ? 'dark' : 'light';
      // Solo cambiar si el usuario no ha establecido una preferencia explícita
      if (!localStorage.getItem('theme')) {
        document.documentElement.setAttribute('data-theme', newTheme);
        syncThemeWithLanguageSelector(newTheme);
        updateThemeIcon(newTheme);
      }
    });
}

// Función para sincronizar el tema con el selector de idioma
function syncThemeWithLanguageSelector(theme) {
  const languageSelector = document.querySelector('.language-selector');
  if (languageSelector) {
    languageSelector.setAttribute('data-theme', theme);
  }
}

// Cambiar entre temas
function toggleTheme() {
  const currentTheme =
    document.documentElement.getAttribute('data-theme') || 'light';
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';

  // Actualizar el tema en el DOM
  document.documentElement.setAttribute('data-theme', newTheme);

  // Sincronizar con el selector de idioma
  syncThemeWithLanguageSelector(newTheme);

  // Guardar preferencia
  localStorage.setItem('theme', newTheme);

  // Actualizar icono
  updateThemeIcon(newTheme);
}

// Actualizar el icono según el tema actual
function updateThemeIcon(theme) {
  // Esta parte no es necesaria porque ya manejamos la visualización con CSS,
  // pero lo dejamos como referencia en caso de necesitar más lógica
}
