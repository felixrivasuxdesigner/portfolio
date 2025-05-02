/**
 * Navigation Module
 * Controla la navegación responsiva y el desplazamiento suave
 */

export function initNavigation() {
  const navbarToggle = document.querySelector('.navbar-toggle');
  const headerNav = document.getElementById('headerNav');
  const navLinks = document.querySelectorAll('.AnimateScroll a');

  // Toggle para navbar móvil
  if (navbarToggle && headerNav) {
    navbarToggle.addEventListener('click', () => {
      const isCollapsed = headerNav.classList.contains('collapse');

      if (isCollapsed) {
        headerNav.classList.remove('collapse');
        headerNav.classList.add('in');
        navbarToggle.setAttribute('aria-expanded', 'true');
      } else {
        headerNav.classList.add('collapse');
        headerNav.classList.remove('in');
        navbarToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Desplazamiento suave para enlaces de navegación
  if (navLinks.length > 0) {
    navLinks.forEach((link) => {
      link.addEventListener('click', (event) => {
        // Si es un enlace de anclaje
        if (link.getAttribute('href').startsWith('#')) {
          event.preventDefault();

          const targetId = link.getAttribute('href');
          const targetElement = document.querySelector(targetId);

          if (targetElement) {
            // Cerrar menú móvil si está abierto
            if (headerNav && headerNav.classList.contains('in')) {
              headerNav.classList.add('collapse');
              headerNav.classList.remove('in');
              navbarToggle.setAttribute('aria-expanded', 'false');
            }

            // Desplazamiento suave
            window.scrollTo({
              top: targetElement.offsetTop - 70, // Ajustar offset según el header
              behavior: 'smooth',
            });
          }
        }
      });
    });
  }

  // Cambiar estado activo en la navegación durante el scroll
  window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;

    // Obtener todas las secciones
    const sections = document.querySelectorAll('section, div[id]');

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (
        sectionId &&
        scrollPosition >= sectionTop &&
        scrollPosition < sectionTop + sectionHeight
      ) {
        // Remover active de todos los enlaces
        navLinks.forEach((link) => {
          link.parentElement.classList.remove('active');
        });

        // Añadir active al enlace correspondiente
        const activeLink = document.querySelector(
          `.AnimateScroll a[href="#${sectionId}"]`
        );
        if (activeLink) {
          activeLink.parentElement.classList.add('active');
        }
      }
    });
  });
}
