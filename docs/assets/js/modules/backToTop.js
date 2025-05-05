/**
 * Back To Top Module
 * Controla el comportamiento del botón "volver arriba"
 */

export function initBackToTop() {
  const backToTopBtn = document.getElementById('backToTop');

  if (!backToTopBtn) return;

  // Mostrar/ocultar botón según posición de scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      backToTopBtn.classList.add('show');
    } else {
      backToTopBtn.classList.remove('show');
    }
  });

  // Acción de desplazamiento al hacer clic
  const backToTopLink = backToTopBtn.querySelector('a');
  if (backToTopLink) {
    backToTopLink.addEventListener('click', (event) => {
      event.preventDefault();

      // Si hay un ID específico, ir a ese elemento
      const targetId = backToTopLink.getAttribute('href');
      if (targetId && targetId !== '#') {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop,
            behavior: 'smooth',
          });
          return;
        }
      }

      // De lo contrario, ir al inicio de la página
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    });
  }
}
