/**
 * Preloader Module
 * Controla la animación de carga inicial
 */

export function initPreloader() {
  const preloader = document.getElementById('preloader');

  if (!preloader) return;

  // Ocultar el preloader cuando la página esté completamente cargada
  window.addEventListener('load', () => {
    // Añadir un pequeño retraso para asegurar una transición suave
    setTimeout(() => {
      preloader.style.opacity = '0';
      preloader.style.visibility = 'hidden';

      // Remover completamente después de la transición
      setTimeout(() => {
        preloader.style.display = 'none';
      }, 500);
    }, 300);
  });
}
