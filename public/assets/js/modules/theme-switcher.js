/**
 * Theme Switcher Module
 * Maneja el cambio entre modo claro y oscuro
 */

// Función para inicializar el selector de tema
export function initThemeSwitcher() {
  // Crear el botón de cambio de tema si no existe
  if (!document.querySelector('.theme-toggle')) {
    createThemeToggleButton();
  }

  // Verificar si hay preferencia guardada o usar la preferencia del sistema
  const savedTheme = localStorage.getItem('theme');
  const prefersDarkMode = window.matchMedia(
    '(prefers-color-scheme: dark)'
  ).matches;

  // Establecer tema inicial
  if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
  } else if (prefersDarkMode) {
    document.documentElement.setAttribute('data-theme', 'dark');
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
        updateThemeIcon(newTheme);
      }
    });
}

// Crear el botón de cambio de tema
function createThemeToggleButton() {
  const themeToggle = document.createElement('button');
  themeToggle.className = 'theme-toggle';
  themeToggle.setAttribute('aria-label', 'Cambiar tema');
  themeToggle.setAttribute('title', 'Cambiar tema');
  themeToggle.innerHTML = `
    <i class="fa-solid fa-moon"></i>
    <i class="fa-solid fa-sun"></i>
  `;
  document.body.appendChild(themeToggle);
}

// Cambiar entre temas
function toggleTheme() {
  const currentTheme =
    document.documentElement.getAttribute('data-theme') || 'light';
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';

  // Actualizar el tema en el DOM
  document.documentElement.setAttribute('data-theme', newTheme);

  // Guardar preferencia
  localStorage.setItem('theme', newTheme);

  // Actualizar icono
  updateThemeIcon(newTheme);
}

// Actualizar el icono según el tema actual
function updateThemeIcon(theme) {
  const themeToggle = document.querySelector('.theme-toggle');
  if (!themeToggle) return;

  // Esta parte no es necesaria porque ya manejamos la visualización con CSS,
  // pero lo dejamos como referencia en caso de necesitar más lógica
}
